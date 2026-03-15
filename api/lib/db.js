const { Pool } = require('pg');

// Singleton pool for serverless
let pool;
let connectionFailedTime = 0;
const RETRY_INTERVAL_MS = 60000; // Retry connection every 60 seconds after failure

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      // Quick connection timeout for serverless
      connectionTimeoutMillis: 2000,
      query_timeout: 5000
    });
    
    pool.on('error', (err) => {
      console.error('Pool error:', err.message);
    });
  }
  return pool;
}

// Check if database is configured
function isDatabaseConfigured() {
  return !!process.env.DATABASE_URL;
}

// Check if we should try the real DB (not in cooldown after failure)
function shouldTryRealDB() {
  if (!isDatabaseConfigured()) return false;
  if (connectionFailedTime === 0) return true;
  return Date.now() - connectionFailedTime > RETRY_INTERVAL_MS;
}

// Mock data for testing without database
const mockData = {
  businesses: [
    { id: 1, user_id: 1, business_name: 'Demo Coffee Shop', google_account_id: 'test-123' }
  ],
  reviews: [
    { id: 1, business_id: 1, author_name: 'Sarah M.', rating: 5, text: 'Best coffee in town! The baristas are so friendly.', created_at: new Date() },
    { id: 2, business_id: 1, author_name: 'John D.', rating: 4, text: 'Great atmosphere and good coffee. A bit pricey but worth it.', created_at: new Date() },
    { id: 3, business_id: 1, author_name: 'Emily R.', rating: 5, text: 'My new favorite spot! The lavender latte is amazing.', created_at: new Date() },
    { id: 4, business_id: 1, author_name: 'Mike T.', rating: 3, text: 'Coffee was okay, but the wait time was pretty long.', created_at: new Date() },
  ],
  responses: [
    { id: 1, review_id: 1, generated_text: 'Thank you so much for the wonderful review, Sarah! We\'re thrilled to be your favorite coffee spot.', status: 'pending', generated_at: new Date() },
    { id: 2, review_id: 2, generated_text: 'Thanks for the feedback, John! We appreciate you noting our atmosphere.', status: 'pending', generated_at: new Date() },
    { id: 3, review_id: 3, generated_text: 'Emily, you made our day! The lavender latte is a team favorite too.', status: 'approved', generated_at: new Date() },
  ]
};

// Mock query handler
async function mockQuery(sql, params) {
  const sqlLower = sql.toLowerCase();
  
  // Queue: get pending responses with reviews
  if (sqlLower.includes('from reviews r') && sqlLower.includes('join responses resp')) {
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
  
  // Get review by ID with business name
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
    const newResponse = { id: newId, review_id: params?.[0], generated_text: params?.[1], status: 'pending', generated_at: new Date() };
    mockData.responses.push(newResponse);
    return { rows: [newResponse] };
  }
  
  // Update response (edit)
  if (sqlLower.includes('update responses set edited_text')) {
    const responseId = params?.[1];
    const response = mockData.responses.find(r => r.id === parseInt(responseId));
    if (!response) return { rows: [] };
    response.edited_text = params?.[0];
    return { rows: [{ id: responseId, ...response }] };
  }
  
  // Update status (approve/reject)
  if (sqlLower.includes('update responses set status')) {
    const responseId = params?.[1] || params?.[0];
    const response = mockData.responses.find(r => r.id === parseInt(responseId));
    if (!response) return { rows: [] };
    if (sqlLower.includes('approved')) response.status = 'approved';
    if (sqlLower.includes('rejected')) response.status = 'rejected';
    return { rows: [{ id: responseId, ...response }] };
  }
  
  // Get response with review/business details
  if (sqlLower.includes('select r.*, resp.*') || sqlLower.includes('from responses resp')) {
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
  // If no DATABASE_URL, use mock immediately
  if (!isDatabaseConfigured()) {
    return mockQuery(sql, params);
  }
  
  // If in cooldown after failure, use mock
  if (!shouldTryRealDB()) {
    return mockQuery(sql, params);
  }
  
  // Try live database
  try {
    const pool = getPool();
    const result = await pool.query(sql, params);
    // Reset failure time on success
    connectionFailedTime = 0;
    return result;
  } catch (error) {
    // On connection error, record failure time and use mock
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT' || error.code === 'ECONNRESET') {
      console.log('Database unreachable, switching to mock mode:', error.message);
      connectionFailedTime = Date.now();
      return mockQuery(sql, params);
    }
    throw error;
  }
}

// Get current mode (for health checks)
function getCurrentMode() {
  if (!isDatabaseConfigured()) return 'mock';
  if (!shouldTryRealDB()) return 'mock';
  return 'live';
}

// Force mock mode (for testing)
function enableMockMode() {
  connectionFailedTime = Date.now();
}

module.exports = { getPool, query, isDatabaseConfigured, getCurrentMode, mockData, enableMockMode };
