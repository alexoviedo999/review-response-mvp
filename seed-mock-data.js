const { Pool } = require('pg');

async function seedDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('🌱 Seeding database with mock data...');

    // Create test user
    const userResult = await pool.query(
      `INSERT INTO users (email) VALUES ($1) 
       ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
       RETURNING id`,
      ['demo@reviewresponse.ai']
    );
    const userId = userResult.rows[0].id;
    console.log(`✅ Created user: demo@reviewresponse.ai (id: ${userId})`);

    // Create test business
    const bizResult = await pool.query(
      `INSERT INTO businesses (user_id, google_account_id, business_name, google_access_token, google_refresh_token)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT DO NOTHING
       RETURNING id`,
      [userId, 'test-account-123', 'Demo Coffee Shop', 'mock-access-token', 'mock-refresh-token']
    );
    
    let businessId;
    if (bizResult.rows.length === 0) {
      const existingBiz = await pool.query(
        `SELECT id FROM businesses WHERE user_id = $1`,
        [userId]
      );
      businessId = existingBiz.rows[0].id;
      console.log(`📌 Using existing business (id: ${businessId})`);
    } else {
      businessId = bizResult.rows[0].id;
      console.log(`✅ Created business: Demo Coffee Shop (id: ${businessId})`);
    }

    // Create sample reviews
    const sampleReviews = [
      { author: 'Sarah M.', rating: 5, text: 'Best coffee in town! The baristas are so friendly and the pastries are fresh.' },
      { author: 'John D.', rating: 4, text: 'Great atmosphere and good coffee. A bit pricey but worth it.' },
      { author: 'Emily R.', rating: 5, text: 'My new favorite spot! The lavender latte is amazing.' },
      { author: 'Mike T.', rating: 3, text: 'Coffee was okay, but the wait time was pretty long during rush hour.' },
      { author: 'Lisa K.', rating: 2, text: 'Ordered online and my drink was wrong. Had to wait again to get it fixed.' },
      { author: 'David W.', rating: 5, text: 'Love this place! Great for working remotely with fast WiFi.' },
    ];

    let reviewCount = 0;
    for (const review of sampleReviews) {
      try {
        await pool.query(
          `INSERT INTO reviews (business_id, google_review_id, author_name, rating, text, created_at)
           VALUES ($1, $2, $3, $4, $5, NOW() - INTERVAL '${Math.floor(Math.random() * 30)} days')
           ON CONFLICT (google_review_id) DO NOTHING`,
          [businessId, `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, review.author, review.rating, review.text]
        );
        reviewCount++;
      } catch (e) {
        // Skip duplicates
      }
    }
    console.log(`✅ Created ${reviewCount} sample reviews`);

    // Create sample responses for some reviews
    const reviewsWithResponses = await pool.query(
      `SELECT id FROM reviews WHERE business_id = $1 LIMIT 3`,
      [businessId]
    );

    const sampleResponses = [
      { text: 'Thank you so much for the wonderful review, Sarah! We\'re thrilled to be your favorite coffee spot. See you soon! ☕' },
      { text: 'Thanks for the feedback, John! We appreciate you noting our atmosphere. We\'ll keep working on providing great value.' },
      { text: 'Emily, you made our day! The lavender latte is a team favorite too. Thanks for the 5 stars! 💜' },
    ];

    let responseCount = 0;
    for (let i = 0; i < Math.min(reviewsWithResponses.rows.length, sampleResponses.length); i++) {
      const reviewId = reviewsWithResponses.rows[i].id;
      try {
        await pool.query(
          `INSERT INTO responses (review_id, generated_text, status, generated_at)
           VALUES ($1, $2, $3, NOW())
           ON CONFLICT DO NOTHING`,
          [reviewId, sampleResponses[i].text, i === 0 ? 'pending' : (i === 1 ? 'approved' : 'posted')]
        );
        responseCount++;
      } catch (e) {
        // Skip duplicates
      }
    }
    console.log(`✅ Created ${responseCount} sample responses`);

    // Create sample analytics
    for (let i = 0; i < 7; i++) {
      await pool.query(
        `INSERT INTO analytics (business_id, date, total_reviews, responded_reviews, avg_rating)
         VALUES ($1, CURRENT_DATE - INTERVAL '${i} days', 
                 ${Math.floor(Math.random() * 5) + 10}, 
                 ${Math.floor(Math.random() * 3) + 5}, 
                 ${(Math.random() * 1 + 4).toFixed(2)})
         ON CONFLICT (business_id, date) DO NOTHING`,
        [businessId]
      );
    }
    console.log(`✅ Created sample analytics for 7 days`);

    // Summary
    const summary = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM users) as users,
        (SELECT COUNT(*) FROM businesses) as businesses,
        (SELECT COUNT(*) FROM reviews) as reviews,
        (SELECT COUNT(*) FROM responses) as responses
    `);
    
    console.log('\n📊 Database Summary:');
    console.log(`   Users: ${summary.rows[0].users}`);
    console.log(`   Businesses: ${summary.rows[0].businesses}`);
    console.log(`   Reviews: ${summary.rows[0].reviews}`);
    console.log(`   Responses: ${summary.rows[0].responses}`);
    console.log('\n✅ Seeding complete!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seedDatabase();
