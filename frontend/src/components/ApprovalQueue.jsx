import React, { useState, useEffect } from 'react';

function ApprovalQueue({ userId }) {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    try {
      const res = await fetch('/api/responses/queue/1');
      const data = await res.json();
      setQueue(data);
    } catch (error) {
      console.error('Error fetching queue:', error);
      // Show mock data for demo
      setQueue([
        {
          id: 1,
          review_id: 1,
          author_name: 'John D.',
          rating: 5,
          text: 'Amazing service! The team was incredibly helpful and professional. Highly recommend!',
          generated_text: 'Thank you so much for your wonderful review, John! We\'re thrilled to hear that our team provided you with excellent service. Your recommendation means the world to us, and we look forward to serving you again soon!',
          status: 'pending'
        },
        {
          id: 2,
          review_id: 2,
          author_name: 'Sarah M.',
          rating: 4,
          text: 'Great experience overall. Would have been 5 stars if the wait time was shorter.',
          generated_text: 'Hi Sarah! Thank you for your feedback and the 4-star review. We\'re glad you had a great experience overall, and we appreciate your patience. We\'re actively working on reducing wait times and hope to earn that 5th star from you next time!',
          status: 'pending'
        },
        {
          id: 3,
          review_id: 3,
          author_name: 'Mike R.',
          rating: 2,
          text: 'Product was not as described. Disappointed with the quality.',
          generated_text: 'Dear Mike, we sincerely apologize that the product didn\'t meet your expectations. This isn\'t the experience we want for our customers. Please reach out to our support team directly so we can make this right with a replacement or full refund. Your satisfaction is our priority.',
          status: 'pending'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditText(item.edited_text || item.generated_text);
  };

  const handleSaveEdit = async (id) => {
    try {
      await fetch(`/api/responses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ edited_text: editText })
      });
      setQueue(queue.map(item => 
        item.id === id ? { ...item, edited_text: editText } : item
      ));
      setEditingId(null);
    } catch (error) {
      console.error('Error saving edit:', error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await fetch(`/api/responses/approve/${id}`, { method: 'POST' });
      setQueue(queue.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error approving:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await fetch(`/api/responses/reject/${id}`, { method: 'POST' });
      setQueue(queue.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error rejecting:', error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ 
          color: i <= rating ? '#fbbf24' : '#cbd5e0',
          fontSize: '1rem'
        }}>
          ★
        </span>
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="bento-card size-full fade-in" style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
        <div className="loading-spinner"></div>
        <p style={{ marginTop: 'var(--space-4)', color: 'var(--fg-muted)' }}>Loading approval queue...</p>
      </div>
    );
  }

  if (queue.length === 0) {
    return (
      <div className="empty-state fade-in">
        <div className="icon">🎉</div>
        <h3>All caught up!</h3>
        <p>No pending reviews to respond to. Great job!</p>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Header Card */}
      <div className="bento-card size-full" style={{ marginBottom: 'var(--bento-gap)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>
            📋 Approval Queue
          </h2>
          <div style={{
            background: 'var(--bg)',
            padding: 'var(--space-2) var(--space-4)',
            borderRadius: 'var(--radius-full)',
            fontWeight: 700,
            fontSize: '0.875rem',
            color: 'var(--primary)',
            boxShadow: 'inset 2px 2px 4px #b8bec7, inset -2px -2px 4px #ffffff'
          }}>
            {queue.length} pending
          </div>
        </div>
      </div>

      {/* Queue Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bento-gap)' }}>
        {queue.map(item => {
          const isPositive = item.rating >= 4;
          const isNegative = item.rating <= 2;
          
          return (
            <div key={item.id} className="bento-card size-full">
              {/* Review Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'linear-gradient(145deg, #7a8df5, #5f6fd8)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    boxShadow: '3px 3px 6px #b8bec7, -3px -3px 6px #ffffff'
                  }}>
                    {item.author_name?.charAt(0) || '?'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>
                      {item.author_name}
                    </div>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {renderStars(item.rating)}
                    </div>
                  </div>
                </div>
                <div style={{
                  background: isPositive 
                    ? 'linear-gradient(145deg, #a8e6b8, #7ed992)' 
                    : isNegative 
                      ? 'linear-gradient(145deg, #f5a9a9, #e88787)'
                      : 'linear-gradient(145deg, #fbbf24, #f59e0b)',
                  color: 'white',
                  padding: 'var(--space-2) var(--space-4)',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {item.rating} star{item.rating !== 1 ? 's' : ''}
                </div>
              </div>

              {/* Review Text */}
              <p style={{ 
                color: 'var(--fg-muted)', 
                lineHeight: 1.7, 
                marginBottom: 'var(--space-4)',
                fontStyle: 'italic',
                paddingLeft: 'var(--space-4)',
                borderLeft: '3px solid var(--primary)'
              }}>
                "{item.text}"
              </p>

              {/* AI Response */}
              <div style={{
                background: 'var(--bg)',
                borderRadius: 'var(--radius)',
                padding: 'var(--space-5)',
                boxShadow: 'inset 4px 4px 8px #b8bec7, inset -4px -4px 8px #ffffff'
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  marginBottom: 'var(--space-3)',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  color: 'var(--primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  background: 'var(--bg)',
                  padding: 'var(--space-1) var(--space-3)',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: '3px 3px 6px #b8bec7, -3px -3px 6px #ffffff'
                }}>
                  <span>🤖</span>
                  AI Generated Response
                </div>

                {editingId === item.id ? (
                  <div>
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      style={{
                        width: '100%',
                        minHeight: '100px',
                        padding: 'var(--space-4)',
                        background: 'var(--bg)',
                        border: 'none',
                        borderRadius: 'var(--radius-sm)',
                        fontFamily: 'inherit',
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        color: 'var(--fg)',
                        resize: 'vertical',
                        boxShadow: 'inset 4px 4px 8px #b8bec7, inset -4px -4px 8px #ffffff'
                      }}
                    />
                    <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
                      <button className="btn btn-primary" onClick={() => handleSaveEdit(item.id)}>
                        💾 Save Changes
                      </button>
                      <button className="btn" onClick={() => setEditingId(null)} style={{ 
                        background: 'var(--bg)', 
                        boxShadow: '4px 4px 8px #b8bec7, -4px -4px 8px #ffffff' 
                      }}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p style={{ color: 'var(--fg)', lineHeight: 1.7, margin: 0 }}>
                      {item.edited_text || item.generated_text}
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
                      <button 
                        onClick={() => handleApprove(item.id)}
                        style={{
                          padding: 'var(--space-3) var(--space-5)',
                          background: 'linear-gradient(145deg, #7ed992, #5ac779)',
                          color: 'white',
                          border: 'none',
                          borderRadius: 'var(--radius-sm)',
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          boxShadow: '4px 4px 8px #b8bec7, -4px -4px 8px #ffffff',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                      >
                        ✓ Approve & Send
                      </button>
                      <button 
                        onClick={() => handleEdit(item)}
                        style={{
                          padding: 'var(--space-3) var(--space-5)',
                          background: 'var(--bg)',
                          color: 'var(--fg)',
                          border: 'none',
                          borderRadius: 'var(--radius-sm)',
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          boxShadow: '4px 4px 8px #b8bec7, -4px -4px 8px #ffffff',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        onClick={() => handleReject(item.id)}
                        style={{
                          padding: 'var(--space-3) var(--space-5)',
                          background: 'linear-gradient(145deg, #f5a9a9, #e88787)',
                          color: 'white',
                          border: 'none',
                          borderRadius: 'var(--radius-sm)',
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          boxShadow: '4px 4px 8px #b8bec7, -4px -4px 8px #ffffff',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                      >
                        ✕ Reject
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ApprovalQueue;
