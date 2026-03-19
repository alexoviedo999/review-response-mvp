const { google } = require('googleapis');
const express = require('express');
const router = express.Router();
const { generateState, generateCodeVerifier, generateCodeChallenge } = require('../utils/crypto');

const SCOPES = [
  'https://www.googleapis.com/auth/business.manage',
  'https://www.googleapis.com/auth/userinfo.email'
];

// Initialize OAuth2 client
function getOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
}

// Start Google OAuth flow with PKCE
router.get('/google', (req, res) => {
  const oauth2Client = getOAuthClient();

  // Generate state and PKCE for secure OAuth flow
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);

  // Store state and code verifier in session
  req.session.oauthState = state;
  req.session.codeVerifier = codeVerifier;

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
    state: state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256'
  });
  res.redirect(url);
});

// OAuth callback
router.get('/callback', async (req, res) => {
  const { code, state: returnedState } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No authorization code provided' });
  }

  // Verify state parameter to prevent CSRF attacks
  const expectedState = req.session.oauthState;
  if (!expectedState || returnedState !== expectedState) {
    return res.status(400).json({ error: 'Invalid state parameter - possible CSRF attack' });
  }

  // Clear OAuth state from session after verification
  delete req.session.oauthState;

  try {
    const oauth2Client = getOAuthClient();

    // Use PKCE code verifier
    oauth2Client.setCredentials({
      code_verifier: req.session.codeVerifier
    });

    const { tokens } = await oauth2Client.getToken(code);

    // Clear code verifier after use
    delete req.session.codeVerifier;

    oauth2Client.setCredentials(tokens);

    // Get user info
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const { data: userInfo } = await oauth2.userinfo.get();

    const pool = req.app.locals.pool;

    // Create or update user
    let userResult = await pool.query(
      'INSERT INTO users (email) VALUES ($1) ON CONFLICT (email) DO UPDATE SET email = $1 RETURNING *',
      [userInfo.email]
    );
    const user = userResult.rows[0];

    // Store tokens securely in session - NOT in URL
    req.session.userId = user.id;
    req.session.tokens = tokens;

    // Redirect to dashboard without exposing tokens in URL
    res.redirect('/dashboard');
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.status(500).json({ error: 'Authentication failed', details: error.message });
  }
});

// Get connected businesses
router.get('/businesses', async (req, res) => {
  const { user_id } = req.query;
  if (!user_id) {
    return res.status(400).json({ error: 'user_id required' });
  }

  try {
    const pool = req.app.locals.pool;
    const result = await pool.query(
      'SELECT * FROM businesses WHERE user_id = $1',
      [user_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching businesses:', error);
    res.status(500).json({ error: 'Failed to fetch businesses' });
  }
});

module.exports = router;
