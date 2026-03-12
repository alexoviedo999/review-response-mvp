-- Review Response MVP Database Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Connected Google Business Profiles
CREATE TABLE IF NOT EXISTS businesses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  google_account_id VARCHAR(255) NOT NULL,
  business_name VARCHAR(255) NOT NULL,
  google_access_token TEXT,
  google_refresh_token TEXT,
  token_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cached reviews from Google
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  business_id INTEGER REFERENCES businesses(id),
  google_review_id VARCHAR(255) UNIQUE NOT NULL,
  author_name VARCHAR(255),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  text TEXT,
  created_at TIMESTAMP,
  fetched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Generated AI responses
CREATE TABLE IF NOT EXISTS responses (
  id SERIAL PRIMARY KEY,
  review_id INTEGER REFERENCES reviews(id),
  generated_text TEXT NOT NULL,
  edited_text TEXT,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'posted')),
  generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  approved_at TIMESTAMP,
  posted_at TIMESTAMP
);

-- Analytics tracking
CREATE TABLE IF NOT EXISTS analytics (
  id SERIAL PRIMARY KEY,
  business_id INTEGER REFERENCES businesses(id),
  date DATE NOT NULL,
  total_reviews INTEGER DEFAULT 0,
  responded_reviews INTEGER DEFAULT 0,
  avg_rating DECIMAL(3,2),
  UNIQUE(business_id, date)
);

-- Indexes for performance
CREATE INDEX idx_reviews_business ON reviews(business_id);
CREATE INDEX idx_responses_status ON responses(status);
CREATE INDEX idx_analytics_business_date ON analytics(business_id, date);
