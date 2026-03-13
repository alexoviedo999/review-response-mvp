import React from 'react';
import { Link } from 'react-router-dom';

function Privacy() {
  return (
    <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card">
        <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>🔒 Privacy Policy</h2>
        <p style={{ color: 'var(--gray-500)', marginBottom: '32px' }}>
          Last updated: March 2026
        </p>

        <div className="legal-content">
          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--gray-800)' }}>
              1. Information We Collect
            </h3>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: '16px' }}>
              We collect information you provide directly to us, including:
            </p>
            <ul style={{ color: 'var(--gray-600)', lineHeight: 1.8, paddingLeft: '24px', marginBottom: '16px' }}>
              <li>Account information (name, email, business details)</li>
              <li>Google Business Profile data you connect</li>
              <li>Reviews and responses you generate through our service</li>
              <li>Communications you send to us</li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--gray-800)' }}>
              2. How We Use Your Information
            </h3>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: '16px' }}>
              We use the information we collect to:
            </p>
            <ul style={{ color: 'var(--gray-600)', lineHeight: 1.8, paddingLeft: '24px', marginBottom: '16px' }}>
              <li>Provide, maintain, and improve our services</li>
              <li>Generate AI-powered responses to reviews</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Analyze usage patterns to improve user experience</li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--gray-800)' }}>
              3. Information Sharing
            </h3>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: '16px' }}>
              We do not sell your personal information. We may share your information only in the following circumstances:
            </p>
            <ul style={{ color: 'var(--gray-600)', lineHeight: 1.8, paddingLeft: '24px', marginBottom: '16px' }}>
              <li>With your consent</li>
              <li>With service providers who assist our operations</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and the safety of users</li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--gray-800)' }}>
              4. Data Security
            </h3>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8 }}>
              We implement industry-standard security measures including encryption at rest and in transit, 
              regular security audits, and access controls to protect your data. However, no method of 
              transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--gray-800)' }}>
              5. Your Rights
            </h3>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: '16px' }}>
              You have the right to:
            </p>
            <ul style={{ color: 'var(--gray-600)', lineHeight: 1.8, paddingLeft: '24px', marginBottom: '16px' }}>
              <li>Access and download your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
              <li>Revoke access to connected third-party services</li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--gray-800)' }}>
              6. Cookies
            </h3>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8 }}>
              We use essential cookies to operate our service and analytics cookies to understand how users 
              interact with our platform. You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--gray-800)' }}>
              7. Changes to This Policy
            </h3>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8 }}>
              We may update this privacy policy from time to time. We will notify you of any changes by 
              posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--gray-800)' }}>
              8. Contact Us
            </h3>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8 }}>
              If you have questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@reviewresponse.ai" style={{ color: 'var(--primary)' }}>
                privacy@reviewresponse.ai
              </a>
            </p>
          </section>
        </div>

        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--gray-200)' }}>
          <Link to="/" className="btn btn-outline">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
