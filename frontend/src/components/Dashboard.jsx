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
      {/* Bento Grid Dashboard */}
      <div className="bento-grid">
        {/* Stats Row */}
        <div className="bento-card size-sm accent-primary">
          <div className="bento-stat">
            <div className="bento-stat-icon">📝</div>
            <div>
              <div className="bento-stat-value">24</div>
              <div className="bento-stat-label">Total Reviews</div>
            </div>
            <div className="bento-stat-trend up">↑ 12% this month</div>
          </div>
        </div>
        
        <div className="bento-card size-sm">
          <div className="bento-stat">
            <div className="bento-stat-icon">✉️</div>
            <div>
              <div className="bento-stat-value">18</div>
              <div className="bento-stat-label">Responses Sent</div>
            </div>
            <div className="bento-stat-trend up">↑ 8% this month</div>
          </div>
        </div>
        
        <div className="bento-card size-sm accent-cyan">
          <div className="bento-stat">
            <div className="bento-stat-icon">⭐</div>
            <div>
              <div className="bento-stat-value">4.6</div>
              <div className="bento-stat-label">Avg Rating</div>
            </div>
            <div className="bento-stat-trend up">↑ 0.2 this month</div>
          </div>
        </div>
        
        <div className="bento-card size-sm">
          <div className="bento-stat">
            <div className="bento-stat-icon">🎯</div>
            <div>
              <div className="bento-stat-value">75%</div>
              <div className="bento-stat-label">Response Rate</div>
            </div>
            <div className="bento-stat-trend up">↑ 5% this month</div>
          </div>
        </div>
        
        {/* Business Card */}
        <div className="bento-card size-md">
          <div className="bento-business">
            <div className="bento-business-avatar">
              {businesses[0]?.business_name?.charAt(0) || 'B'}
            </div>
            <div className="bento-business-info">
              <div className="bento-business-name">
                {businesses[0]?.business_name || 'My Business'}
              </div>
              <div className="bento-business-meta">
                Connected on {businesses[0]?.created_at 
                  ? new Date(businesses[0].created_at).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })
                  : 'Recently'}
              </div>
            </div>
            <span className="bento-badge success">
              ✓ Connected
            </span>
          </div>
          <div className="bento-actions">
            <button className="bento-btn bento-btn-secondary">
              ⚙️ Settings
            </button>
            <button className="bento-btn bento-btn-secondary">
              🔄 Sync Reviews
            </button>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bento-card size-md">
          <h3 style={{ marginBottom: 'var(--space-4)', fontSize: '1rem', fontWeight: 700 }}>
            Quick Actions
          </h3>
          <div className="bento-quick-actions">
            <div className="bento-quick-action">
              <span className="bento-quick-action-icon">🤖</span>
              <span className="bento-quick-action-text">Generate All</span>
            </div>
            <div className="bento-quick-action">
              <span className="bento-quick-action-icon">📋</span>
              <span className="bento-quick-action-text">View Queue</span>
            </div>
            <div className="bento-quick-action">
              <span className="bento-quick-action-icon">📊</span>
              <span className="bento-quick-action-text">Analytics</span>
            </div>
            <div className="bento-quick-action">
              <span className="bento-quick-action-icon">📤</span>
              <span className="bento-quick-action-text">Export</span>
            </div>
          </div>
        </div>
        
        {/* Recent Reviews */}
        <div className="bento-card size-lg">
          <h3 style={{ marginBottom: 'var(--space-4)', fontSize: '1rem', fontWeight: 700 }}>
            Recent Reviews
          </h3>
          <div className="bento-reviews">
            <div className="bento-review-item">
              <div className="bento-review-header">
                <span className="bento-review-author">Sarah M.</span>
                <div className="bento-review-rating">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="bento-review-text">"Best coffee in town! The baristas are so friendly."</p>
            </div>
            <div className="bento-review-item">
              <div className="bento-review-header">
                <span className="bento-review-author">John D.</span>
                <div className="bento-review-rating">⭐⭐⭐⭐</div>
              </div>
              <p className="bento-review-text">"Great atmosphere and good coffee. A bit pricey but worth it."</p>
            </div>
            <div className="bento-review-item">
              <div className="bento-review-header">
                <span className="bento-review-author">Emily R.</span>
                <div className="bento-review-rating">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="bento-review-text">"The lavender latte is amazing!"</p>
            </div>
          </div>
        </div>
        
        {/* Chart Card */}
        <div className="bento-card size-lg">
          <div className="bento-chart">
            <div className="bento-chart-header">
              <div className="bento-chart-title">Reviews This Week</div>
            </div>
            <div className="bento-chart-body">
              <div className="bento-chart-bar" style={{ height: '60%' }}>
                <span className="bento-chart-bar-label">Mon</span>
              </div>
              <div className="bento-chart-bar" style={{ height: '80%' }}>
                <span className="bento-chart-bar-label">Tue</span>
              </div>
              <div className="bento-chart-bar" style={{ height: '45%' }}>
                <span className="bento-chart-bar-label">Wed</span>
              </div>
              <div className="bento-chart-bar" style={{ height: '90%' }}>
                <span className="bento-chart-bar-label">Thu</span>
              </div>
              <div className="bento-chart-bar" style={{ height: '70%' }}>
                <span className="bento-chart-bar-label">Fri</span>
              </div>
              <div className="bento-chart-bar" style={{ height: '55%' }}>
                <span className="bento-chart-bar-label">Sat</span>
              </div>
              <div className="bento-chart-bar" style={{ height: '40%' }}>
                <span className="bento-chart-bar-label">Sun</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
