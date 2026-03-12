const { google } = require('googleapis');

// Get authenticated client
function getAuthClient(business) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  
  oauth2Client.setCredentials({
    access_token: business.google_access_token,
    refresh_token: business.google_refresh_token
  });
  
  return oauth2Client;
}

// Fetch reviews from Google Business Profile
async function fetchReviews(business) {
  const auth = getAuthClient(business);
  const mybusiness = google.mybusinessbusinessinformation({ version: 'v1', auth });
  
  try {
    // Note: This is simplified. Real implementation requires:
    // 1. List accounts
    // 2. List locations for account
    // 3. Fetch reviews for each location
    
    // Placeholder for MVP - returns mock data structure
    // Real implementation would be:
    // const response = await mybusiness.accounts.locations.reviews.list({
    //   parent: `accounts/${accountId}/locations/${locationId}`
    // });
    
    console.log('Fetching reviews for business:', business.business_name);
    
    // Return empty array for MVP setup
    return [];
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
}

// Post response to a review
async function postResponse(reviewData, responseText) {
  const auth = getAuthClient(reviewData);
  
  try {
    // Note: Google My Business API requires business verification
    // and has specific requirements for posting responses
    
    console.log('Posting response to review:', reviewData.google_review_id);
    
    // Real implementation:
    // await mybusiness.accounts.locations.reviews.reply({
    //   name: reviewData.google_review_id,
    //   requestBody: { comment: responseText }
    // });
    
    return { success: true };
  } catch (error) {
    console.error('Error posting response:', error);
    throw error;
  }
}

// Get list of locations for authenticated user
async function getLocations(business) {
  const auth = getAuthClient(business);
  const mybusiness = google.mybusinessbusinessinformation({ version: 'v1', auth });
  
  try {
    // List all accounts first
    const accounts = await mybusiness.accounts.list();
    
    // For each account, list locations
    const locations = [];
    for (const account of accounts.data.accounts || []) {
      const locs = await mybusiness.accounts.locations.list({
        parent: account.name
      });
      locations.push(...(locs.data.locations || []));
    }
    
    return locations;
  } catch (error) {
    console.error('Error getting locations:', error);
    throw error;
  }
}

module.exports = { fetchReviews, postResponse, getLocations };
