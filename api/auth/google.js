const { google } = require('googleapis');
const crypto = require('crypto');

const SCOPES = [
  'https://www.googleapis.com/auth/business.manage',
  'https://www.googleapis.com/auth/userinfo.email'
];

// Generate random state for CSRF protection
function generateState() {
  return crypto.randomBytes(32).toString('hex');
}

// Generate PKCE code verifier
function generateCodeVerifier() {
  return crypto.randomBytes(32).toString('base64url');
}

// Generate PKCE code challenge
function generateCodeChallenge(verifier) {
  return crypto.createHash('sha256').update(verifier).digest('base64url');
}

module.exports = (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI || `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/api/auth/callback`
  );

  // Generate state and PKCE for secure OAuth flow
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);

  // Set cookies for state and code verifier (secure, httpOnly)
  const isProduction = process.env.NODE_ENV === 'production';
  const cookieOptions = `; Path=/; HttpOnly; SameSite=Strict${isProduction ? '; Secure' : ''}; Max-Age=600`;

  res.setHeader('Set-Cookie', [
    `oauth_state=${state}${cookieOptions}`,
    `code_verifier=${codeVerifier}${cookieOptions}`
  ]);

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
    state: state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256'
  });

  res.redirect(url);
};
