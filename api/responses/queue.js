const { getPool } = require('../lib/db');

module.exports = async (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { business_id } = req.query;

  if (!business_id) {
    return res.status(400).json({ error: 'business_id required' });
  }

  try {
    const pool = getPool();
    const result = await pool.query(
      `SELECT r.*, resp.id as response_id, resp.generated_text, resp.edited_text, resp.status
       FROM reviews r
       JOIN responses resp ON r.id = resp.review_id
       WHERE r.business_id = $1 AND resp.status = 'pending'
       ORDER BY r.created_at DESC`,
      [business_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching queue:', error);
    res.status(500).json({ error: 'Failed to fetch queue' });
  }
};
