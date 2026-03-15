const { getPool } = require('../lib/db');
const { generateResponse } = require('../lib/openai');

module.exports = async (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { review_id } = req.query;

  if (!review_id) {
    return res.status(400).json({ error: 'review_id required' });
  }

  try {
    const pool = getPool();

    // Get review details
    const reviewResult = await pool.query(
      `SELECT r.*, b.business_name FROM reviews r
       JOIN businesses b ON r.business_id = b.id
       WHERE r.id = $1`,
      [review_id]
    );

    if (reviewResult.rows.length === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }

    const review = reviewResult.rows[0];

    // Generate AI response
    const generatedText = await generateResponse(review);

    // Store response
    const responseResult = await pool.query(
      `INSERT INTO responses (review_id, generated_text, status)
       VALUES ($1, $2, 'pending')
       ON CONFLICT (review_id) DO UPDATE SET
       generated_text = $2, status = 'pending', generated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [review_id, generatedText]
    );

    res.json(responseResult.rows[0]);
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ error: 'Failed to generate response', details: error.message });
  }
};
