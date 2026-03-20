const crypto = require('crypto');

/**
 * Generate a random state parameter for OAuth CSRF protection
 */
function generateState() {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Generate PKCE code verifier (43-128 characters)
 */
function generateCodeVerifier() {
  return crypto.randomBytes(32).toString('base64url');
}

/**
 * Generate PKCE code challenge from verifier using S256 method
 */
function generateCodeChallenge(verifier) {
  return crypto
    .createHash('sha256')
    .update(verifier)
    .digest('base64url');
}

module.exports = {
  generateState,
  generateCodeVerifier,
  generateCodeChallenge
};
