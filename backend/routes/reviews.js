const express = require('express');
const router = express.Router();
const { fetchReviews } = require('../services/google');

// Get reviews for a business
router.get('/:business_id', async (req, res) => {
  const { business_id } = req.params;
  const { force_refresh } = req.query;

  try {
    const pool = req.app.locals.pool;
    
    // Get cached reviews or fetch fresh
    if (force_refresh === 'true') {
      const business = await pool.query(
        'SELECT * FROM businesses WHERE id = $1',
        [business_id]
      );
      
      if (business.rows.length === 0) {
        return res.status(404).json({ error: 'Business not found' });
      }
      
      const reviews = await fetchReviews(business.rows[0]);
      
      // Cache reviews
      for (const review of reviews) {
        await pool.query(
          `INSERT INTO reviews (business_id, google_review_id, author_name, rating, text, created_at)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT (google_review_id) DO UPDATE SET
           author_name = $3, rating = $4, text = $5, fetched_at = CURRENT_TIMESTAMP`,
          [business_id, review.reviewId, review.authorName, review.starRating === 'FIVE' ? 5 : 
           review.starRating === 'FOUR' ? 4 : review.starRating === 'THREE' ? 3 : 
           review.starRating === 'TWO' ? 2 : 1, review.comment, review.createTime]
        );
      }
    }
    
    const result = await pool.query(
      `SELECT r.*, 
        CASE WHEN resp.id IS NOT NULL THEN true ELSE false END as has_response,
        resp.status as response_status
       FROM reviews r
       LEFT JOIN responses resp ON r.id = resp.review_id
       WHERE r.business_id = $1
       ORDER BY r.created_at DESC`,
      [business_id]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews', details: error.message });
  }
});

module.exports = router;
