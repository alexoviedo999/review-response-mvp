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
    return <div className="loading">Loading analytics...</div>;
  }

  if (!analytics) {
    return <div className="empty-state">No analytics data available</div>;
  }

  const responseRate = analytics.overall.total_reviews > 0
    ? Math.round((analytics.overall.responded / analytics.overall.total_reviews) * 100)
    : 0;

  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{analytics.overall.total_reviews}</div>
          <div className="stat-label">Total Reviews (30 days)</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{analytics.overall.responded}</div>
          <div className="stat-label">Responses Sent</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{responseRate}%</div>
          <div className="stat-label">Response Rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{parseFloat(analytics.overall.avg_rating).toFixed(1)} ⭐</div>
          <div className="stat-label">Average Rating</div>
        </div>
      </div>

      <div className="card">
        <h2>Sentiment Breakdown</h2>
        <div style={{ display: 'flex', gap: '20px', marginTop: '15px' }}>
          {analytics.sentiment.map(s => (
            <div key={s.sentiment} style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: 'bold',
                color: s.sentiment === 'positive' ? '#10B981' : 
                       s.sentiment === 'negative' ? '#EF4444' : '#6B7280'
              }}>
                {s.count}
              </div>
              <div style={{ color: '#6B7280', textTransform: 'capitalize' }}>
                {s.sentiment}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2>Daily Activity</h2>
        <table style={{ width: '100%', marginTop: '15px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ textAlign: 'left', padding: '8px' }}>Date</th>
              <th style={{ textAlign: 'center', padding: '8px' }}>Reviews</th>
              <th style={{ textAlign: 'center', padding: '8px' }}>Responses</th>
              <th style={{ textAlign: 'center', padding: '8px' }}>Avg Rating</th>
            </tr>
          </thead>
          <tbody>
            {analytics.daily.map((day, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '10px 8px' }}>{day.date}</td>
                <td style={{ textAlign: 'center', padding: '10px 8px' }}>{day.total}</td>
                <td style={{ textAlign: 'center', padding: '10px 8px' }}>{day.responded}</td>
                <td style={{ textAlign: 'center', padding: '10px 8px' }}>{day.avg_rating} ⭐</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Analytics;
