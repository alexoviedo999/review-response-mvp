const express = require('express');
const router = express.Router();
const { generateResponse } = require('../services/openai');
const { postResponse } = require('../services/google');
const { sendNotification } = require('../services/email');

// Get approval queue (pending responses)
router.get('/queue/:business_id', async (req, res) => {
  const { business_id } = req.params;

  try {
    const pool = req.app.locals.pool;
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
});

// Generate AI response for a review
router.post('/generate/:review_id', async (req, res) => {
  const { review_id } = req.params;

  try {
    const pool = req.app.locals.pool;
    
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
});

// Update generated response (edit before approval)
router.put('/:response_id', async (req, res) => {
  const { response_id } = req.params;
  const { edited_text } = req.body;

  try {
    const pool = req.app.locals.pool;
    const result = await pool.query(
      `UPDATE responses SET edited_text = $1 WHERE id = $2 RETURNING *`,
      [edited_text, response_id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating response:', error);
    res.status(500).json({ error: 'Failed to update response' });
  }
});

// Approve and post response
router.post('/approve/:response_id', async (req, res) => {
  const { response_id } = req.params;

  try {
    const pool = req.app.locals.pool;
    
    // Get response and review details
    const result = await pool.query(
      `SELECT r.*, resp.*, b.google_access_token, b.google_refresh_token
       FROM responses resp
       JOIN reviews r ON resp.review_id = r.id
       JOIN businesses b ON r.business_id = b.id
       WHERE resp.id = $1`,
      [response_id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Response not found' });
    }
    
    const data = result.rows[0];
    const textToPost = data.edited_text || data.generated_text;
    
    // Post to Google (commented for MVP - requires business verification)
    // await postResponse(data, textToPost);
    
    // Update status
    await pool.query(
      `UPDATE responses SET status = 'approved', approved_at = CURRENT_TIMESTAMP WHERE id = $1`,
      [response_id]
    );
    
    // Send notification (optional)
    // await sendNotification(data);
    
    res.json({ success: true, message: 'Response approved', text: textToPost });
  } catch (error) {
    console.error('Error approving response:', error);
    res.status(500).json({ error: 'Failed to approve response', details: error.message });
  }
});

// Reject response
router.post('/reject/:response_id', async (req, res) => {
  const { response_id } = req.params;

  try {
    const pool = req.app.locals.pool;
    await pool.query(
      `UPDATE responses SET status = 'rejected' WHERE id = $1`,
      [response_id]
    );
    res.json({ success: true });
  } catch (error) {
    console.error('Error rejecting response:', error);
    res.status(500).json({ error: 'Failed to reject response' });
  }
});

module.exports = router;
