import React from 'react';
import { Link } from 'react-router-dom';

function Privacy() {
  return (
    <div className="fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Header Card */}
      <div className="bento-card size-full" style={{ marginBottom: 'var(--bento-gap)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
          <div style={{
            background: 'var(--lime)',
            padding: 'var(--space-3)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '1.5rem'
          }}>🔒</div>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>Privacy Policy</h1>
            <p style={{ color: 'var(--fg-muted)', margin: 0, fontWeight: 600 }}>Last Updated: March 18, 2026</p>
          </div>
        </div>
      </div>

      {/* Highlight Card */}
      <div className="bento-card accent-lime" style={{ marginBottom: 'var(--bento-gap)' }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem' }}>
          🛡️ Your privacy matters. We never sell your data. This policy complies with Google's API User Data Policy.
        </p>
      </div>

      {/* Introduction */}
      <div className="bento-card" style={{ marginBottom: 'var(--bento-gap)' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)', fontWeight: 700, color: 'var(--primary)' }}>
          1. Introduction
        </h2>
        <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8 }}>
          <strong>Feedback Responder</strong> (also known as "Review Response") ("we," "our," or "us") provides a
          software-as-a-service platform that helps businesses manage and respond to customer reviews from Google
          Business Profile. This Privacy Policy explains how we collect, use, store, share, and protect your
          information when you use our service.
        </p>
        <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginTop: 'var(--space-3)' }}>
          This policy specifically addresses how we handle data obtained through Google's APIs and OAuth authentication
          in compliance with <strong>Google's API User Data Policy</strong>.
        </p>
      </div>

      {/* Google User Data We Collect */}
      <div className="bento-card" style={{ marginBottom: 'var(--bento-gap)' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)', fontWeight: 700, color: 'var(--primary)' }}>
          2. Google User Data We Collect
        </h2>
        <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
          When you connect your Google Business Profile to our service, we collect the following Google user data:
        </p>

        <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-3)', fontWeight: 700, color: 'var(--fg)' }}>
          2.1 Google Account Information
        </h3>
        <ul style={{ color: 'var(--fg-muted)', lineHeight: 1.8, paddingLeft: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>Name and email address</strong> — From your Google account via OAuth authentication</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Google account identifier</strong> — Used to manage your connection</li>
        </ul>

        <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-3)', fontWeight: 700, color: 'var(--fg)' }}>
          2.2 Google Business Profile Data
        </h3>
        <ul style={{ color: 'var(--fg-muted)', lineHeight: 1.8, paddingLeft: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>Business name and location information</strong> — From your connected Google Business Profile(s)</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Customer reviews</strong> — Review text, star ratings, reviewer names (as displayed publicly), and review dates</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Review metadata</strong> — Review IDs and response status</li>
        </ul>

        <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-3)', fontWeight: 700, color: 'var(--fg)' }}>
          2.3 OAuth Credentials
        </h3>
        <ul style={{ color: 'var(--fg-muted)', lineHeight: 1.8, paddingLeft: 'var(--space-6)' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>Access tokens and refresh tokens</strong> — Used to maintain your connection to Google Business Profile API (stored encrypted)</li>
        </ul>
      </div>

      {/* How We Use Google User Data */}
      <div className="bento-card" style={{ marginBottom: 'var(--bento-gap)' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)', fontWeight: 700, color: 'var(--primary)' }}>
          3. How We Use Google User Data
        </h2>
        <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
          We use the Google user data we collect <strong>solely to provide and improve our application's functionality</strong>.
        </p>

        <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-3)', fontWeight: 700, color: 'var(--fg)' }}>
          3.1 Core Service Functions
        </h3>
        <ul style={{ color: 'var(--fg-muted)', lineHeight: 1.8, paddingLeft: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>Display reviews</strong> — Show your Google Business Profile reviews in our dashboard</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Generate AI response suggestions</strong> — Use OpenAI's API to create draft responses (you review and approve before posting)</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Post approved responses</strong> — Submit your approved responses to your Google Business Profile</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Track analytics</strong> — Monitor response rates, times, and sentiment for your business</li>
        </ul>

        <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-3)', fontWeight: 700, color: 'var(--fg)' }}>
          3.2 What We Do NOT Do With Your Data
        </h3>
        <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: 'var(--space-3)' }}>
          We do <strong>NOT</strong> use Google user data for:
        </p>
        <ul style={{ color: 'var(--fg-muted)', lineHeight: 1.8, paddingLeft: 'var(--space-6)' }}>
          <li style={{ marginBottom: '0.5rem' }}>❌ <strong>Targeted advertising</strong> — We do not serve ads or use your data for advertising purposes</li>
          <li style={{ marginBottom: '0.5rem' }}>❌ <strong>Selling to third parties</strong> — We never sell Google user data to data brokers or information resellers</li>
          <li style={{ marginBottom: '0.5rem' }}>❌ <strong>Credit-worthiness or lending</strong> — We do not use data for credit assessments</li>
          <li style={{ marginBottom: '0.5rem' }}>❌ <strong>Creating databases for resale</strong> — We do not build databases to sell to others</li>
          <li style={{ marginBottom: '0.5rem' }}>❌ <strong>Training AI models</strong> — We do not use your Google user data to train AI models</li>
        </ul>
      </div>

      {/* How We Share Data */}
      <div className="bento-card" style={{ marginBottom: 'var(--bento-gap)' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)', fontWeight: 700, color: 'var(--primary)' }}>
          4. How We Share, Transfer, and Disclose Data
        </h2>
        <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
          We share Google user data only as necessary to provide our service:
        </p>

        <div style={{ background: 'var(--bg-alt)', padding: 'var(--space-4)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-3)' }}>
          <h4 style={{ fontWeight: 700, marginBottom: 'var(--space-2)', color: 'var(--fg)' }}>OpenAI (Data Processor)</h4>
          <p style={{ color: 'var(--fg-muted)', lineHeight: 1.7, margin: 0, fontSize: '0.9rem' }}>
            <strong>What is shared:</strong> Review text (the content of customer reviews)<br/>
            <strong>Purpose:</strong> To generate AI-assisted response suggestions<br/>
            <strong>Basis:</strong> You initiate this by clicking "Generate Response" — OpenAI processes this data under their API terms
          </p>
        </div>

        <div style={{ background: 'var(--bg-alt)', padding: 'var(--space-4)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-3)' }}>
          <h4 style={{ fontWeight: 700, marginBottom: 'var(--space-2)', color: 'var(--fg)' }}>Google (Data Source)</h4>
          <p style={{ color: 'var(--fg-muted)', lineHeight: 1.7, margin: 0, fontSize: '0.9rem' }}>
            <strong>What is shared:</strong> Your approved response text<br/>
            <strong>Purpose:</strong> To post responses to your Google Business Profile<br/>
            <strong>Basis:</strong> You explicitly approve each response before posting
          </p>
        </div>

        <div style={{ background: 'var(--bg-alt)', padding: 'var(--space-4)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-3)' }}>
          <h4 style={{ fontWeight: 700, marginBottom: 'var(--space-2)', color: 'var(--fg)' }}>Hosting Provider (Infrastructure)</h4>
          <p style={{ color: 'var(--fg-muted)', lineHeight: 1.7, margin: 0, fontSize: '0.9rem' }}>
            <strong>What is shared:</strong> Encrypted data stored in our database<br/>
            <strong>Purpose:</strong> Secure database and application hosting<br/>
            <strong>Safeguards:</strong> Data is encrypted at rest and in transit
          </p>
        </div>

        <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginTop: 'var(--space-3)' }}>
          We do <strong>NOT</strong> transfer or disclose Google user data to data brokers, advertising networks,
          credit reporting agencies, or any third party for purposes other than providing our service.
        </p>
      </div>

      {/* Data Protection */}
      <div className="bento-card" style={{ marginBottom: 'var(--bento-gap)' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)', fontWeight: 700, color: 'var(--primary)' }}>
          5. Data Protection and Security
        </h2>
        <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
          We implement robust security measures to protect Google user data:
        </p>

        <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-3)', fontWeight: 700, color: 'var(--fg)' }}>
          5.1 Encryption
        </h3>
        <ul style={{ color: 'var(--fg-muted)', lineHeight: 1.8, paddingLeft: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>In transit:</strong> All data transmitted uses TLS 1.2+ encryption (HTTPS)</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>At rest:</strong> Database storage encrypted using AES-256</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>OAuth tokens:</strong> Access tokens and refresh tokens are stored encrypted</li>
        </ul>

        <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-3)', fontWeight: 700, color: 'var(--fg)' }}>
          5.2 Access Controls
        </h3>
        <ul style={{ color: 'var(--fg-muted)', lineHeight: 1.8, paddingLeft: 'var(--space-6)' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>OAuth 2.0 authentication</strong> — Secure authentication via Google</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Minimal access</strong> — We request only the OAuth scopes necessary for our service</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Session management</strong> — Secure session handling with automatic expiration</li>
        </ul>
      </div>

      {/* Data Retention */}
      <div className="bento-card" style={{ marginBottom: 'var(--bento-gap)' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)', fontWeight: 700, color: 'var(--primary)' }}>
          6. Data Retention and Deletion
        </h2>

        <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-3)', fontWeight: 700, color: 'var(--fg)' }}>
          6.1 Retention Periods
        </h3>
        <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: 'var(--space-3)' }}>
          We retain your Google user data <strong>only for as long as necessary to provide our service</strong>:
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-alt)' }}>
                <th style={{ padding: 'var(--space-3)', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>Data Type</th>
                <th style={{ padding: 'var(--space-3)', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>Retention Period</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: 'var(--space-3)', borderBottom: '1px solid var(--border)', color: 'var(--fg-muted)' }}>Account information</td>
                <td style={{ padding: 'var(--space-3)', borderBottom: '1px solid var(--border)', color: 'var(--fg-muted)' }}>Until account deletion + 30 days</td>
              </tr>
              <tr>
                <td style={{ padding: 'var(--space-3)', borderBottom: '1px solid var(--border)', color: 'var(--fg-muted)' }}>OAuth tokens</td>
                <td style={{ padding: 'var(--space-3)', borderBottom: '1px solid var(--border)', color: 'var(--fg-muted)' }}>Until you revoke access or delete account</td>
              </tr>
              <tr>
                <td style={{ padding: 'var(--space-3)', borderBottom: '1px solid var(--border)', color: 'var(--fg-muted)' }}>Review data</td>
                <td style={{ padding: 'var(--space-3)', borderBottom: '1px solid var(--border)', color: 'var(--fg-muted)' }}>Until account deletion</td>
              </tr>
              <tr>
                <td style={{ padding: 'var(--space-3)', borderBottom: '1px solid var(--border)', color: 'var(--fg-muted)' }}>Generated responses</td>
                <td style={{ padding: 'var(--space-3)', borderBottom: '1px solid var(--border)', color: 'var(--fg-muted)' }}>Until account deletion or you delete them</td>
              </tr>
              <tr>
                <td style={{ padding: 'var(--space-3)', color: 'var(--fg-muted)' }}>Usage logs</td>
                <td style={{ padding: 'var(--space-3)', color: 'var(--fg-muted)' }}>90 days</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-3)', marginTop: 'var(--space-4)', fontWeight: 700, color: 'var(--fg)' }}>
          6.2 Data Deletion
        </h3>
        <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: 'var(--space-3)' }}>
          <strong>You may request deletion of your data at any time:</strong>
        </p>
        <ul style={{ color: 'var(--fg-muted)', lineHeight: 1.8, paddingLeft: 'var(--space-6)' }}>
          <li style={{ marginBottom: '0.5rem' }}>Delete your account from the app settings</li>
          <li style={{ marginBottom: '0.5rem' }}>Revoke our Google access at <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>myaccount.google.com/permissions</a></li>
          <li style={{ marginBottom: '0.5rem' }}>Email us at support@reviewresponse.app</li>
        </ul>
      </div>

      {/* Your Rights */}
      <div className="bento-card" style={{ marginBottom: 'var(--bento-gap)' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)', fontWeight: 700, color: 'var(--primary)' }}>
          7. Your Rights and Choices
        </h2>
        <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
          You have the following rights regarding your data:
        </p>
        <ul style={{ color: 'var(--fg-muted)', lineHeight: 1.8, paddingLeft: 'var(--space-6)' }}>
          <li style={{ marginBottom: '0.5rem' }}>✓ <strong>Access and Portability</strong> — View and export all data we hold about you</li>
          <li style={{ marginBottom: '0.5rem' }}>✓ <strong>Correction</strong> — Update or correct your account information</li>
          <li style={{ marginBottom: '0.5rem' }}>✓ <strong>Deletion</strong> — Delete your account and associated data</li>
          <li style={{ marginBottom: '0.5rem' }}>✓ <strong>Revocation of Google Access</strong> — Revoke at any time through your Google account</li>
        </ul>
        <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginTop: 'var(--space-3)' }}>
          Contact us at <strong>support@reviewresponse.app</strong> with your request. We will respond within 30 days.
        </p>
      </div>

      {/* Third-Party Services */}
      <div className="bento-card" style={{ marginBottom: 'var(--bento-gap)' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)', fontWeight: 700, color: 'var(--primary)' }}>
          8. Third-Party Services
        </h2>
        <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: 'var(--space-3)' }}>
          Our service integrates with the following third-party services:
        </p>
        <ul style={{ color: 'var(--fg-muted)', lineHeight: 1.8, paddingLeft: 'var(--space-6)' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>Google Business Profile API</strong> — Access and respond to reviews (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>Privacy Policy</a>)</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>OpenAI API</strong> — Generate AI response suggestions (<a href="https://openai.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>Privacy Policy</a>)</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Vercel</strong> — Application hosting (<a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>Privacy Policy</a>)</li>
        </ul>
      </div>

      {/* Google Compliance */}
      <div className="bento-card accent-lime" style={{ marginBottom: 'var(--bento-gap)' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)', fontWeight: 700, color: 'var(--fg)' }}>
          9. Compliance with Google API User Data Policy
        </h2>
        <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: 'var(--space-3)' }}>
          This application complies with Google's API User Data Policy, including:
        </p>
        <ul style={{ color: 'var(--fg-muted)', lineHeight: 1.8, paddingLeft: 'var(--space-6)' }}>
          <li style={{ marginBottom: '0.5rem' }}>✓ Limited use of data to providing or improving our application's functionality</li>
          <li style={{ marginBottom: '0.5rem' }}>✓ No sale of Google user data to third parties</li>
          <li style={{ marginBottom: '0.5rem' }}>✓ No use of Google user data for advertising purposes</li>
          <li style={{ marginBottom: '0.5rem' }}>✓ Proper disclosure of data access, use, storage, and sharing practices</li>
          <li style={{ marginBottom: '0.5rem' }}>✓ Secure handling of Google user data</li>
        </ul>
      </div>

      {/* Contact */}
      <div className="bento-card" style={{ marginBottom: 'var(--bento-gap)' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)', fontWeight: 700, color: 'var(--primary)' }}>
          10. Contact Us
        </h2>
        <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
          For questions about this Privacy Policy, to exercise your rights, or to report a privacy concern:
        </p>
        <a
          href="mailto:support@reviewresponse.app"
          style={{
            color: 'var(--primary)',
            fontWeight: 700,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            padding: 'var(--space-2) var(--space-4)',
            background: 'var(--bg-alt)',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          support@reviewresponse.app
        </a>
      </div>

      {/* Footer */}
      <div className="bento-card size-full" style={{ textAlign: 'center' }}>
        <Link to="/" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Privacy;