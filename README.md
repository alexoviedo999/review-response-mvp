# Review Response AI

AI-powered review response service for local businesses. Automatically generates professional responses to Google Business Profile reviews.

## Features

- 🔗 **Google Business Profile Integration** - Connect and monitor reviews
- 🤖 **AI Response Generation** - GPT-4o-mini powered responses
- ✅ **Approval Queue** - Review and edit before posting
- 📊 **Analytics Dashboard** - Track response rates and sentiment
- 📧 **Email Notifications** - Get alerts for new reviews

## Tech Stack

- **Backend:** Node.js, Express
- **Frontend:** React, Vite
- **Database:** PostgreSQL
- **APIs:** Google Business Profile, OpenAI, Resend

## Setup

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Google Cloud Console project with Business Profile API enabled
- OpenAI API key
- Resend API key (optional, for email)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/review-response-mvp.git
cd review-response-mvp
```

2. Install dependencies:
```bash
npm install
cd frontend && npm install && cd ..
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your credentials
```

4. Create database tables:
```bash
psql $DATABASE_URL < backend/db/schema.sql
```

5. Run development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `GET /api/auth/google` - Start Google OAuth flow
- `GET /api/auth/callback` - OAuth callback
- `GET /api/auth/businesses` - Get connected businesses

### Reviews
- `GET /api/reviews/:business_id` - Get reviews for business
- `GET /api/reviews/:business_id?force_refresh=true` - Force refresh from Google

### Responses
- `GET /api/responses/queue/:business_id` - Get approval queue
- `POST /api/responses/generate/:review_id` - Generate AI response
- `PUT /api/responses/:response_id` - Edit generated response
- `POST /api/responses/approve/:response_id` - Approve and post
- `POST /api/responses/reject/:response_id` - Reject response

### Analytics
- `GET /api/analytics/:business_id` - Get business analytics

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection string
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `OPENAI_API_KEY` - OpenAI API key

Optional:
- `RESEND_API_KEY` - For email notifications
- `VERCEL_TOKEN` - For Vercel deployment

## License

MIT
