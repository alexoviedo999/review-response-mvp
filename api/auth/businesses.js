const { getPool } = require('../lib/db');

module.exports = async (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { user_id } = req.query;
  
  if (!user_id) {
    return res.status(400).json({ error: 'user_id required' });
  }

  try {
    const pool = getPool();
    const result = await pool.query(
      'SELECT id, user_id, business_name, google_location_id, created_at FROM businesses WHERE user_id = $1',
      [user_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching businesses:', error);
    res.status(500).json({ 
      error: 'Failed to fetch businesses', 
      details: error.message,
      hasDb: !!process.env.DATABASE_URL
    });
  }
};
