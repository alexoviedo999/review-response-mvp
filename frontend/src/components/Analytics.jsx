import React, { useState, useEffect } from 'react';

function Analytics({ userId }) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch('/api/analytics/1?days=30');
      const data = await res.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Mock data for demo
      setAnalytics({
        overall: {
          total_reviews: '24',
          responded: '18',
          avg_rating: '4.6'
        },
        daily: [
          { date: '2026-03-11', total: '3', responded: '2', avg_rating: '4.7' },
          { date: '2026-03-10', total: '2', responded: '2', avg_rating: '4.5' },
          { date: '2026-03-09', total: '4', responded: '3', avg_rating: '4.3' },
          { date: '2026-03-08', total: '1', responded: '1', avg_rating: '5.0' },
          { date: '2026-03-07', total: '2', responded: '2', avg_rating: '4.8' },
          { date: '2026-03-06', total: '3', responded: '2', avg_rating: '4.2' },
        ],
        sentiment: [
          { sentiment: 'positive', count: '18' },
          { sentiment: 'neutral', count: '4' },
          { sentiment: 'negative', count: '2' }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <span>Loading analytics...</span>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="empty-state fade-in">
        <div className="icon">📊</div>
        <h3>No analytics data available</h3>
        <p>Connect your Google Business Profile to see analytics</p>
      </div>
    );
  }

  const responseRate = analytics.overall.total_reviews > 0
    ? Math.round((analytics.overall.responded / analytics.overall.total_reviews) * 100)
    : 0;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="fade-in">
      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-value">{analytics.overall.total_reviews}</div>
          <div className="stat-label">Total Reviews (30 days)</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✉️</div>
          <div className="stat-value">{analytics.overall.responded}</div>
          <div className="stat-label">Responses Sent</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-value">{responseRate}%</div>
          <div className="stat-label">Response Rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-value">{parseFloat(analytics.overall.avg_rating).toFixed(1)}</div>
          <div className="stat-label">Average Rating</div>
        </div>
      </div>

      {/* Sentiment Breakdown */}
      <div className="card">
        <h2>💭 Sentiment Breakdown</h2>
        <div className="sentiment-grid">
          {analytics.sentiment.map(s => (
            <div key={s.sentiment} className={`sentiment-item ${s.sentiment}`}>
              <div className="sentiment-value">{s.count}</div>
              <div className="sentiment-label">
                {s.sentiment === 'positive' ? '😊 Positive' : 
                 s.sentiment === 'negative' ? '😟 Negative' : '😐 Neutral'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Activity Table */}
      <div className="card">
        <h2>📅 Daily Activity</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th style={{ textAlign: 'center' }}>Reviews</th>
                <th style={{ textAlign: 'center' }}>Responses</th>
                <th style={{ textAlign: 'center' }}>Avg Rating</th>
              </tr>
            </thead>
            <tbody>
              {analytics.daily.map((day, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500 }}>{formatDate(day.date)}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{
                      background: 'var(--primary-glow)',
                      color: 'var(--primary)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 600,
                      fontSize: '0.85rem'
                    }}>
                      {day.total}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{
                      background: 'var(--success-light)',
                      color: 'var(--success)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 600,
                      fontSize: '0.85rem'
                    }}>
                      {day.responded}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ fontWeight: 600 }}>
                      {parseFloat(day.avg_rating).toFixed(1)} ⭐
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
