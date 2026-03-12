import React, { useState, useEffect } from 'react';

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
    return <div className="loading">Loading...</div>;
  }

  if (!userId || businesses.length === 0) {
    return (
      <div className="connect-prompt">
        <h2>Connect Your Google Business Profile</h2>
        <p>Start managing your reviews with AI-powered responses</p>
        <button className="btn btn-primary" onClick={connectGoogle}>
          Connect Google Account
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">24</div>
          <div className="stat-label">Total Reviews</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">18</div>
          <div className="stat-label">Responses Sent</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">4.6</div>
          <div className="stat-label">Average Rating</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">75%</div>
          <div className="stat-label">Response Rate</div>
        </div>
      </div>

      <div className="card">
        <h2>Connected Businesses</h2>
        {businesses.map(business => (
          <div key={business.id} className="review-item">
            <div className="review-header">
              <span className="review-author">{business.business_name}</span>
            </div>
            <p style={{ color: '#6b7280' }}>
              Connected on {new Date(business.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
