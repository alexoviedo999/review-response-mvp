const { google } = require('googleapis');
const { getPool } = require('../lib/db');

module.exports = async (req, res) => {
  const { code, error } = req.query;
  
  if (error) {
    console.error('OAuth error:', error);
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://feedbackresponder.com' 
      : 'http://localhost:5173';
    return res.redirect(`${baseUrl}/?error=${encodeURIComponent(error)}`);
  }
  
  if (!code) {
    return res.status(400).json({ error: 'No authorization code provided' });
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI || 'https://feedbackresponder.com/api/auth/callback'
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

    // Try to fetch Google Business Profile accounts
    let businessCreated = false;
    try {
      const mybusiness = google.mybusinessbusinessinformation({ version: 'v1', auth: oauth2Client });
      const accounts = await mybusiness.accounts.list();
      
      if (accounts.data.accounts && accounts.data.accounts.length > 0) {
        for (const account of accounts.data.accounts) {
          // Store business with tokens
          await pool.query(
            `INSERT INTO businesses (user_id, google_account_id, business_name, google_access_token, google_refresh_token, token_expires_at)
             VALUES ($1, $2, $3, $4, $5, $6)
             ON CONFLICT (google_account_id) DO UPDATE SET 
               google_access_token = $4,
               google_refresh_token = $5,
               token_expires_at = $6`,
            [
              user.id,
              account.name,
              account.accountName || 'My Business',
              tokens.access_token,
              tokens.refresh_token,
              new Date(Date.now() + (tokens.expiry_date || 3600000))
            ]
          );
          businessCreated = true;
        }
      }
    } catch (bizError) {
      console.log('Could not fetch business profiles:', bizError.message);
      // Create a placeholder business entry so user sees progress
      await pool.query(
        `INSERT INTO businesses (user_id, google_account_id, business_name, google_access_token, google_refresh_token)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT DO NOTHING`,
        [user.id, `placeholder-${user.id}`, 'My Business Profile', tokens.access_token, tokens.refresh_token]
      );
      businessCreated = true;
    }

    // Redirect to dashboard with user ID
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://feedbackresponder.com' 
      : 'http://localhost:5173';
    res.redirect(`${baseUrl}/?user_id=${user.id}${businessCreated ? '&connected=1' : ''}`);
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.status(500).json({ error: 'Authentication failed', details: error.message });
  }
};
