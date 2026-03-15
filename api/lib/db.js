const { Pool } = require('pg');

// Singleton pool for serverless
let pool;

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });
  }
  return pool;
}

// Check if database is configured
function isDatabaseConfigured() {
  return !!process.env.DATABASE_URL;
}

// Mock data for testing without database
const mockData = {
  businesses: [
    { id: 1, user_id: 1, business_name: 'Demo Coffee Shop', google_account_id: 'test-123' }
  ],
  reviews: [
    { id: 1, business_id: 1, author_name: 'Sarah M.', rating: 5, text: 'Best coffee in town!', created_at: new Date() },
    { id: 2, business_id: 1, author_name: 'John D.', rating: 4, text: 'Great atmosphere and good coffee.', created_at: new Date() },
    { id: 3, business_id: 1, author_name: 'Emily R.', rating: 5, text: 'The lavender latte is amazing!', created_at: new Date() },
    { id: 4, business_id: 1, author_name: 'Mike T.', rating: 3, text: 'Coffee was okay, but wait time was long.', created_at: new Date() },
  ],
  responses: [
    { id: 1, review_id: 1, generated_text: 'Thank you so much for the wonderful review! See you soon!', status: 'pending', generated_at: new Date() },
    { id: 2, review_id: 2, generated_text: 'Thanks for the feedback! We appreciate you noting our atmosphere.', status: 'pending', generated_at: new Date() },
    { id: 3, review_id: 3, generated_text: 'Emily, you made our day! The lavender latte is a team favorite too.', status: 'approved', generated_at: new Date() },
  ]
};

// Mock query handler
async function mockQuery(sql, params) {
  const sqlLower = sql.toLowerCase();
  
  // Queue: get pending responses with reviews
  if (sqlLower.includes('from reviews r') && sqlLower.includes('join responses resp')) {
    const businessId = params?.[0];
    const pendingResponses = mockData.responses
      .filter(r => r.status === 'pending')
      .map(r => {
        const review = mockData.reviews.find(rev => rev.id === r.review_id);
        return {
          ...review,
          response_id: r.id,
          generated_text: r.generated_text,
          edited_text: r.edited_text,
          status: r.status
        };
      });
    return { rows: pendingResponses };
  }
  
  // Get review by ID
  if (sqlLower.includes('from reviews r') && sqlLower.includes('join businesses b')) {
    const reviewId = params?.[0];
    const review = mockData.reviews.find(r => r.id === parseInt(reviewId));
    if (!review) return { rows: [] };
    const biz = mockData.businesses.find(b => b.id === review.business_id);
    return { rows: [{ ...review, business_name: biz?.business_name || 'Demo Business' }] };
  }
  
  // Insert response
  if (sqlLower.includes('insert into responses')) {
    const newId = mockData.responses.length + 1;
    return { rows: [{ id: newId, review_id: params?.[0], generated_text: params?.[1], status: 'pending' }] };
  }
  
  // Update response
  if (sqlLower.includes('update responses')) {
    const responseId = params?.[1] || params?.[0];
    const response = mockData.responses.find(r => r.id === parseInt(responseId));
    if (!response) return { rows: [] };
    return { rows: [{ id: responseId, ...response }] };
  }
  
  // Get response with review/business details
  if (sqlLower.includes('select r.*, resp.*') || sqlLower.includes('select r.*, resp.*, b.*')) {
    const responseId = params?.[0];
    const response = mockData.responses.find(r => r.id === parseInt(responseId));
    if (!response) return { rows: [] };
    const review = mockData.reviews.find(r => r.id === response.review_id);
    const biz = mockData.businesses.find(b => b.id === review?.business_id);
    return { rows: [{ ...response, ...review, business_name: biz?.business_name || 'Demo Business' }] };
  }
  
  // Health check
  if (sqlLower.includes('select 1')) {
    return { rows: [{ test: 1 }] };
  }
  
  return { rows: [] };
}

// Unified query function that handles mock mode
async function query(sql, params) {
  if (!isDatabaseConfigured()) {
    return mockQuery(sql, params);
  }
  
  const pool = getPool();
  return pool.query(sql, params);
}

module.exports = { getPool, query, isDatabaseConfigured, mockData };
