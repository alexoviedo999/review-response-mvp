const { google } = require('googleapis');
const { getPool } = require('../lib/db');

module.exports = async (req, res) => {
  const { code } = req.query;
  
  if (!code) {
    return res.status(400).json({ error: 'No authorization code provided' });
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI || `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/api/auth/callback`
    );

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get user info
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const { data: userInfo } = await oauth2.userinfo.get();

    const pool = getPool();

    // Create or update user
    const userResult = await pool.query(
      'INSERT INTO users (email) VALUES ($1) ON CONFLICT (email) DO UPDATE SET email = $1 RETURNING *',
      [userInfo.email]
    );
    const user = userResult.rows[0];

    // Redirect to dashboard with user ID
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:5173';
    res.redirect(`${baseUrl}/?user_id=${user.id}`);
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.status(500).json({ error: 'Authentication failed', details: error.message });
  }
};
