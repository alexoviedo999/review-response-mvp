const express = require('express');
const router = express.Router();

// Get analytics for a business
router.get('/:business_id', async (req, res) => {
  const { business_id } = req.params;
  const { days = 30 } = req.query;

  try {
    const pool = req.app.locals.pool;
    
    // Get overall stats
    const statsResult = await pool.query(
      `SELECT 
        COUNT(*) as total_reviews,
        COUNT(CASE WHEN resp.status = 'approved' THEN 1 END) as responded,
        AVG(r.rating) as avg_rating
       FROM reviews r
       LEFT JOIN responses resp ON r.id = resp.review_id
       WHERE r.business_id = $1 AND r.created_at > CURRENT_DATE - INTERVAL '${parseInt(days)} days'`,
      [business_id]
    );
    
    // Get response rate by day
    const dailyResult = await pool.query(
      `SELECT 
        DATE(r.created_at) as date,
        COUNT(*) as total,
        COUNT(CASE WHEN resp.status = 'approved' THEN 1 END) as responded,
        AVG(r.rating) as avg_rating
       FROM reviews r
       LEFT JOIN responses resp ON r.id = resp.review_id
       WHERE r.business_id = $1 AND r.created_at > CURRENT_DATE - INTERVAL '${parseInt(days)} days'
       GROUP BY DATE(r.created_at)
       ORDER BY date DESC`,
      [business_id]
    );
    
    // Get sentiment breakdown (simple rating-based)
    const sentimentResult = await pool.query(
      `SELECT 
        CASE 
          WHEN rating >= 4 THEN 'positive'
          WHEN rating = 3 THEN 'neutral'
          ELSE 'negative'
        END as sentiment,
        COUNT(*) as count
       FROM reviews
       WHERE business_id = $1
       GROUP BY sentiment`,
      [business_id]
    );
    
    res.json({
      overall: statsResult.rows[0],
      daily: dailyResult.rows,
      sentiment: sentimentResult.rows
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

module.exports = router;
