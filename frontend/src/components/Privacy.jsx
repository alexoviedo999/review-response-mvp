import React from 'react';
import { Link } from 'react-router-dom';

function Privacy() {
  return (
    <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card">
        <h2 style={{ fontSize: '2rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem', textTransform: 'uppercase' }}>
          <span style={{ background: 'var(--lime)', padding: '0.25rem 0.5rem', border: '3px solid var(--border)' }}>🔒</span> Privacy Policy
        </h2>
        <p style={{ color: 'var(--fg-muted)', marginBottom: 'var(--space-8)', paddingBottom: 'var(--space-6)', borderBottom: '4px solid var(--border)', fontWeight: 600 }}>
          Last updated: March 2026
        </p>

        {/* Highlight box */}
        <div style={{
          background: 'var(--lime)',
          border: '4px solid var(--border)',
          padding: 'var(--space-5)',
          marginBottom: 'var(--space-8)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <p style={{ color: 'var(--fg)', margin: 0, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.9rem' }}>
            🛡️ Your privacy matters. We never sell your data.
          </p>
        </div>

        <div className="legal-content">
          <section style={{ marginBottom: 'var(--space-10)' }}>
            <h3 style={{ 
              fontSize: '1.1rem', 
              marginBottom: 'var(--space-4)', 
              color: 'var(--fg)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              background: 'var(--cyan)',
              padding: 'var(--space-2) var(--space-4)',
              border: '3px solid var(--border)',
              display: 'inline-block',
              boxShadow: 'var(--shadow-sm)'
            }}>
              1. Information We Collect
            </h3>
            <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
              We collect information you provide directly to us, including:
            </p>
            <ul style={{ color: 'var(--fg-muted)', lineHeight: 1.8, paddingLeft: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
              <li style={{ marginBottom: '0.5rem' }}>Account information (name, email, business details)</li>
              <li style={{ marginBottom: '0.5rem' }}>Google Business Profile data you connect</li>
              <li style={{ marginBottom: '0.5rem' }}>Reviews and responses you generate through our service</li>
              <li style={{ marginBottom: '0.5rem' }}>Communications you send to us</li>
            </ul>
          </section>

          <section style={{ marginBottom: 'var(--space-10)' }}>
            <h3 style={{ 
              fontSize: '1.1rem', 
              marginBottom: 'var(--space-4)', 
              color: 'var(--fg)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              background: 'var(--yellow)',
              padding: 'var(--space-2) var(--space-4)',
              border: '3px solid var(--border)',
              display: 'inline-block',
              boxShadow: 'var(--shadow-sm)'
            }}>
              2. How We Use Your Information
            </h3>
            <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
              We use the information we collect to:
            </p>
            <ul style={{ color: 'var(--fg-muted)', lineHeight: 1.8, paddingLeft: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
              <li style={{ marginBottom: '0.5rem' }}>Provide, maintain, and improve our services</li>
              <li style={{ marginBottom: '0.5rem' }}>Generate AI-powered responses to reviews</li>
              <li style={{ marginBottom: '0.5rem' }}>Send you technical notices and support messages</li>
              <li style={{ marginBottom: '0.5rem' }}>Respond to your comments and questions</li>
              <li style={{ marginBottom: '0.5rem' }}>Analyze usage patterns to improve user experience</li>
            </ul>
          </section>

          <section style={{ marginBottom: 'var(--space-10)' }}>
            <h3 style={{ 
              fontSize: '1.1rem', 
              marginBottom: 'var(--space-4)', 
              color: 'var(--fg)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              background: 'var(--purple)',
              color: 'white',
              padding: 'var(--space-2) var(--space-4)',
              border: '3px solid var(--border)',
              display: 'inline-block',
              boxShadow: 'var(--shadow-sm)'
            }}>
              3. Information Sharing
            </h3>
            <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
              We do not sell your personal information. We may share your information only in the following circumstances:
            </p>
            <ul style={{ color: 'var(--fg-muted)', lineHeight: 1.8, paddingLeft: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
              <li style={{ marginBottom: '0.5rem' }}>With your consent</li>
              <li style={{ marginBottom: '0.5rem' }}>With service providers who assist our operations</li>
              <li style={{ marginBottom: '0.5rem' }}>To comply with legal obligations</li>
              <li style={{ marginBottom: '0.5rem' }}>To protect our rights and the safety of users</li>
            </ul>
          </section>

          <section style={{ marginBottom: 'var(--space-10)' }}>
            <h3 style={{ 
              fontSize: '1.1rem', 
              marginBottom: 'var(--space-4)', 
              color: 'var(--fg)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              background: 'var(--cyan)',
              padding: 'var(--space-2) var(--space-4)',
              border: '3px solid var(--border)',
              display: 'inline-block',
              boxShadow: 'var(--shadow-sm)'
            }}>
              4. Data Security
            </h3>
            <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginTop: 'var(--space-4)' }}>
              We implement industry-standard security measures including encryption at rest and in transit, 
              regular security audits, and access controls to protect your data. However, no method of 
              transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section style={{ marginBottom: 'var(--space-10)' }}>
            <h3 style={{ 
              fontSize: '1.1rem', 
              marginBottom: 'var(--space-4)', 
              color: 'var(--fg)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              background: 'var(--yellow)',
              padding: 'var(--space-2) var(--space-4)',
              border: '3px solid var(--border)',
              display: 'inline-block',
              boxShadow: 'var(--shadow-sm)'
            }}>
              5. Your Rights
            </h3>
            <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
              You have the right to:
            </p>
            <ul style={{ color: 'var(--fg-muted)', lineHeight: 1.8, paddingLeft: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
              <li style={{ marginBottom: '0.5rem' }}>Access and download your personal data</li>
              <li style={{ marginBottom: '0.5rem' }}>Request correction of inaccurate data</li>
              <li style={{ marginBottom: '0.5rem' }}>Request deletion of your data</li>
              <li style={{ marginBottom: '0.5rem' }}>Opt out of marketing communications</li>
              <li style={{ marginBottom: '0.5rem' }}>Revoke access to connected third-party services</li>
            </ul>
          </section>

          <section style={{ marginBottom: 'var(--space-10)' }}>
            <h3 style={{ 
              fontSize: '1.1rem', 
              marginBottom: 'var(--space-4)', 
              color: 'var(--fg)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              background: 'var(--lime)',
              padding: 'var(--space-2) var(--space-4)',
              border: '3px solid var(--border)',
              display: 'inline-block',
              boxShadow: 'var(--shadow-sm)'
            }}>
              6. Contact Us
            </h3>
            <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginTop: 'var(--space-4)' }}>
              Questions? Reach out at{' '}
              <a href="mailto:privacy@reviewresponse.ai" style={{ color: 'var(--primary)', fontWeight: 700, background: 'var(--yellow)', padding: '0.125rem 0.375rem', border: '2px solid var(--border)' }}>
                privacy@reviewresponse.ai
              </a>
            </p>
          </section>
        </div>

        <div style={{ marginTop: 'var(--space-10)', paddingTop: 'var(--space-6)', borderTop: '4px solid var(--border)' }}>
          <Link to="/" className="btn btn-outline">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
