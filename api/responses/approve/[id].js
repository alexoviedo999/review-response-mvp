const { query } = require('../../lib/db');

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

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Response ID required' });
  }

  try {
    // Get response details
    const result = await query(
      `SELECT r.*, resp.*, b.business_name
       FROM responses resp
       JOIN reviews r ON resp.review_id = r.id
       JOIN businesses b ON r.business_id = b.id
       WHERE resp.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Response not found' });
    }

    const data = result.rows[0];
    const textToPost = data.edited_text || data.generated_text;

    // Update status
    await query(
      `UPDATE responses SET status = 'approved', approved_at = CURRENT_TIMESTAMP WHERE id = $1`,
      [id]
    );

    res.json({ success: true, message: 'Response approved', text: textToPost });
  } catch (error) {
    console.error('Error approving response:', error);
    res.status(500).json({ error: 'Failed to approve response', details: error.message });
  }
};
