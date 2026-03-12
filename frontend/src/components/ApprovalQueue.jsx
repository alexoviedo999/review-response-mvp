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
      // Mock business_id for MVP
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
    return '⭐'.repeat(rating);
  };

  if (loading) {
    return <div className="loading">Loading queue...</div>;
  }

  if (queue.length === 0) {
    return (
      <div className="empty-state">
        <h3>All caught up! 🎉</h3>
        <p>No pending reviews to respond to</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Approval Queue ({queue.length} pending)</h2>
      
      {queue.map(item => (
        <div key={item.id} className="review-item">
          <div className="review-header">
            <span className="review-author">{item.author_name}</span>
            <span className="review-rating">{renderStars(item.rating)}</span>
          </div>
          
          <p className="review-text">"{item.text}"</p>
          
          <div className="response-box">
            <strong>AI Response:</strong>
            {editingId === item.id ? (
              <div>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <div className="response-actions">
                  <button className="btn btn-primary" onClick={() => handleSaveEdit(item.id)}>
                    Save
                  </button>
                  <button className="btn" onClick={() => setEditingId(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p style={{ marginTop: '8px' }}>
                  {item.edited_text || item.generated_text}
                </p>
                <div className="response-actions">
                  <button className="btn btn-success" onClick={() => handleApprove(item.id)}>
                    ✓ Approve
                  </button>
                  <button className="btn" onClick={() => handleEdit(item)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleReject(item.id)}>
                    ✕ Reject
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ApprovalQueue;
