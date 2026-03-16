import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard({ userId }) {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchBusinesses();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const fetchBusinesses = async () => {
    try {
      const res = await fetch(`/api/auth/businesses?user_id=${userId}`);
      const data = await res.json();
      setBusinesses(data);
    } catch (error) {
      console.error('Error fetching businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  const connectGoogle = () => {
    window.location.href = '/api/auth/google';
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <span>Loading your dashboard...</span>
      </div>
    );
  }

  if (!userId) {
    // Not logged in - show landing page
    return (
      <div className="connect-prompt fade-in">
        <img src="/logo.jpg" alt="Feedback Responder" className="connect-logo" />
        <h2>Connect Your Google Business Profile</h2>
        <p>Start managing your reviews with AI-powered responses. Save time and improve customer satisfaction.</p>
        
        <button className="btn btn-primary btn-lg" onClick={connectGoogle}>
          <span>🔐</span>
          Connect Google Account
        </button>
        
        <div className="connect-features">
          <div className="connect-feature">
            <div className="connect-feature-icon">🤖</div>
            <span className="connect-feature-text">AI generates professional responses automatically</span>
          </div>
          <div className="connect-feature">
            <div className="connect-feature-icon">✅</div>
            <span className="connect-feature-text">Review and approve before posting</span>
          </div>
          <div className="connect-feature">
            <div className="connect-feature-icon">📊</div>
            <span className="connect-feature-text">Track sentiment and response metrics</span>
          </div>
        </div>
        
        <div className="connect-footer-links">
          <Link to="/privacy">Privacy Policy</Link>
          <span>•</span>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    );
  }

  if (businesses.length === 0) {
    // Logged in but no businesses connected - show onboarding
    return (
      <div className="connect-prompt fade-in">
        <div className="welcome-badge">✓ Account Created</div>
        <img src="/logo.jpg" alt="Feedback Responder" className="connect-logo" />
        <h2>Connect Your Google Business Profile</h2>
        <p>You're logged in! Now connect your Google Business Profile to start managing reviews with AI-powered responses.</p>
        
        <button className="btn btn-primary btn-lg" onClick={connectGoogle}>
          <span>🔗</span>
          Connect Business Profile
        </button>
        
        <div className="connect-features">
          <div className="connect-feature">
            <div className="connect-feature-icon">🤖</div>
            <span className="connect-feature-text">AI generates professional responses automatically</span>
          </div>
          <div className="connect-feature">
            <div className="connect-feature-icon">✅</div>
            <span className="connect-feature-text">Review and approve before posting</span>
          </div>
          <div className="connect-feature">
            <div className="connect-feature-icon">📊</div>
            <span className="connect-feature-text">Track sentiment and response metrics</span>
          </div>
        </div>
        
        <div className="connect-footer-links">
          <Link to="/privacy">Privacy Policy</Link>
          <span>•</span>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-value">24</div>
          <div className="stat-label">Total Reviews</div>
          <div className="stat-trend up">↑ 12% this month</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✉️</div>
          <div className="stat-value">18</div>
          <div className="stat-label">Responses Sent</div>
          <div className="stat-trend up">↑ 8% this month</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-value">4.6</div>
          <div className="stat-label">Average Rating</div>
          <div className="stat-trend up">↑ 0.2 this month</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-value">75%</div>
          <div className="stat-label">Response Rate</div>
          <div className="stat-trend up">↑ 5% this month</div>
        </div>
      </div>

      {/* Connected Businesses */}
      <div className="card">
        <h2>
          🏢 Connected Businesses
        </h2>
        
        {businesses.map(business => (
          <div key={business.id} className="review-item">
            <div className="review-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="review-author-avatar">
                  {business.business_name?.charAt(0) || 'B'}
                </div>
                <span className="review-author">{business.business_name}</span>
              </div>
              <span style={{ 
                background: 'var(--success-light)', 
                color: 'var(--success)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600
              }}>
                ✓ Connected
              </span>
            </div>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem', marginLeft: 48 }}>
              Connected on {new Date(business.created_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
