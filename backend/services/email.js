const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// Send notification about new review
async function sendNotification(data) {
  try {
    const result = await resend.emails.send({
      from: 'ReviewBot <notifications@yourdomain.com>',
      to: data.user_email,
      subject: `New ${data.rating}-star review for ${data.business_name}`,
      html: `
        <h2>New Review Alert</h2>
        <p><strong>Business:</strong> ${data.business_name}</p>
        <p><strong>Rating:</strong> ${'⭐'.repeat(data.rating)}</p>
        <p><strong>Author:</strong> ${data.author_name}</p>
        <p><strong>Review:</strong></p>
        <blockquote>${data.review_text || '(No text)'}</blockquote>
        <p><a href="${process.env.BASE_URL}/dashboard">View in Dashboard</a></p>
      `
    });
    
    return result;
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
}

// Send weekly digest
async function sendWeeklyDigest(user_email, stats) {
  try {
    const result = await resend.emails.send({
      from: 'ReviewBot <digest@yourdomain.com>',
      to: user_email,
      subject: `Weekly Review Summary for ${stats.business_name}`,
      html: `
        <h2>Weekly Review Digest</h2>
        <p><strong>Business:</strong> ${stats.business_name}</p>
        <h3>Stats for the Week</h3>
        <ul>
          <li>New Reviews: ${stats.new_reviews}</li>
          <li>Responses Generated: ${stats.responses_generated}</li>
          <li>Responses Approved: ${stats.responses_approved}</li>
          <li>Average Rating: ${stats.avg_rating.toFixed(1)} ⭐</li>
        </ul>
        <p><a href="${process.env.BASE_URL}/dashboard">View Dashboard</a></p>
      `
    });
    
    return result;
  } catch (error) {
    console.error('Digest send error:', error);
    throw error;
  }
}

module.exports = { sendNotification, sendWeeklyDigest };
