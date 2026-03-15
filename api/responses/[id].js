const { query } = require('../lib/db');

module.exports = async (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Response ID required' });
  }

  // PUT - Update response (edit)
  if (req.method === 'PUT') {
    const { edited_text } = req.body;

    try {
      const result = await query(
        `UPDATE responses SET edited_text = $1 WHERE id = $2 RETURNING *`,
        [edited_text, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Response not found' });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating response:', error);
      res.status(500).json({ error: 'Failed to update response' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
