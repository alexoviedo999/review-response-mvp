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
          color: i <= rating ? '#fbbf24' : 'var(--gray-300)',
          fontSize: '1rem'
        }}>
          ★
        </span>
      );
    }
    return stars;
  };

  const getRatingBadge = (rating) => {
    if (rating >= 4) return { bg: 'var(--success-light)', color: 'var(--success)' };
    if (rating >= 3) return { bg: 'var(--warning-light)', color: 'var(--warning)' };
    return { bg: 'var(--danger-light)', color: 'var(--danger)' };
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <span>Loading approval queue...</span>
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
    <div className="card fade-in">
      <h2>
        📋 Approval Queue
        <span className="badge">{queue.length} pending</span>
      </h2>
      
      {queue.map(item => {
        const ratingBadge = getRatingBadge(item.rating);
        
        return (
          <div key={item.id} className="review-item">
            <div className="review-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="review-author-avatar">
                  {item.author_name?.charAt(0) || '?'}
                </div>
                <div>
                  <span className="review-author">{item.author_name}</span>
                  <div className="review-rating" style={{ marginTop: 4 }}>
                    {renderStars(item.rating)}
                  </div>
                </div>
              </div>
              <span style={{ 
                background: ratingBadge.bg, 
                color: ratingBadge.color,
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600
              }}>
                {item.rating} star{item.rating !== 1 ? 's' : ''}
              </span>
            </div>
            
            <p className="review-text">"{item.text}"</p>
            
            <div className="response-box">
              <div className="response-box-header">
                <span>🤖</span>
                AI Generated Response
              </div>
              
              {editingId === item.id ? (
                <div>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    placeholder="Edit the response..."
                  />
                  <div className="response-actions">
                    <button className="btn btn-primary" onClick={() => handleSaveEdit(item.id)}>
                      💾 Save Changes
                    </button>
                    <button className="btn btn-outline" onClick={() => setEditingId(null)}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>{item.edited_text || item.generated_text}</p>
                  <div className="response-actions">
                    <button className="btn btn-success" onClick={() => handleApprove(item.id)}>
                      ✓ Approve & Send
                    </button>
                    <button className="btn btn-outline" onClick={() => handleEdit(item)}>
                      ✏️ Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleReject(item.id)}>
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
  );
}

export default ApprovalQueue;
