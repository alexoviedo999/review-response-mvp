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
            <p style={{ color: 'var(--fg-muted)', margin: 0, fontWeight: 600 }}>Last updated: March 2026</p>
          </div>
        </div>
      </div>

      {/* Highlight Card */}
      <div className="bento-card accent-lime" style={{ marginBottom: 'var(--bento-gap)' }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem' }}>
          🛡️ Your privacy matters. We never sell your data.
        </p>
      </div>

      {/* Content Grid */}
      <div className="bento-grid" style={{ gridTemplateColumns: '1fr' }}>
        <div className="bento-card">
          <h3 style={{ 
            fontSize: '1.1rem', 
            marginBottom: 'var(--space-4)', 
            fontWeight: 700,
            color: 'var(--primary)'
          }}>
            1. Information We Collect
          </h3>
          <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
            We collect information you provide directly to us, including:
          </p>
          <ul style={{ color: 'var(--fg-muted)', lineHeight: 1.8, paddingLeft: 'var(--space-6)' }}>
            <li style={{ marginBottom: '0.5rem' }}>Account information (name, email, business details)</li>
            <li style={{ marginBottom: '0.5rem' }}>Google Business Profile data you connect</li>
            <li style={{ marginBottom: '0.5rem' }}>Reviews and responses you generate through our service</li>
            <li style={{ marginBottom: '0.5rem' }}>Usage data and analytics to improve our service</li>
          </ul>
        </div>

        <div className="bento-card">
          <h3 style={{ 
            fontSize: '1.1rem', 
            marginBottom: 'var(--space-4)', 
            fontWeight: 700,
            color: 'var(--primary)'
          }}>
            2. How We Use Your Information
          </h3>
          <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
            We use the information we collect to:
          </p>
          <ul style={{ color: 'var(--fg-muted)', lineHeight: 1.8, paddingLeft: 'var(--space-6)' }}>
            <li style={{ marginBottom: '0.5rem' }}>Provide, maintain, and improve our service</li>
            <li style={{ marginBottom: '0.5rem' }}>Generate AI-powered responses to your reviews</li>
            <li style={{ marginBottom: '0.5rem' }}>Communicate with you about your account and our services</li>
            <li style={{ marginBottom: '0.5rem' }}>Monitor and analyze trends, usage, and activities</li>
          </ul>
        </div>

        <div className="bento-card">
          <h3 style={{ 
            fontSize: '1.1rem', 
            marginBottom: 'var(--space-4)', 
            fontWeight: 700,
            color: 'var(--primary)'
          }}>
            3. Data Security
          </h3>
          <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8 }}>
            We implement industry-standard security measures to protect your data. However, no method of 
            transmission over the Internet or electronic storage is 100% secure. We use encryption, 
            secure servers, and regular security audits to safeguard your information.
          </p>
        </div>

        <div className="bento-card">
          <h3 style={{ 
            fontSize: '1.1rem', 
            marginBottom: 'var(--space-4)', 
            fontWeight: 700,
            color: 'var(--primary)'
          }}>
            4. Third-Party Services
          </h3>
          <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8 }}>
            We use third-party services (Google, OpenAI) to provide core functionality. These providers 
            have their own privacy policies and we recommend reviewing them. We only share data necessary 
            to provide our service to you.
          </p>
        </div>

        <div className="bento-card">
          <h3 style={{ 
            fontSize: '1.1rem', 
            marginBottom: 'var(--space-4)', 
            fontWeight: 700,
            color: 'var(--primary)'
          }}>
            5. Your Rights
          </h3>
          <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
            You have the right to:
          </p>
          <ul style={{ color: 'var(--fg-muted)', lineHeight: 1.8, paddingLeft: 'var(--space-6)' }}>
            <li style={{ marginBottom: '0.5rem' }}>Access and download your personal data</li>
            <li style={{ marginBottom: '0.5rem' }}>Request deletion of your account and data</li>
            <li style={{ marginBottom: '0.5rem' }}>Opt out of marketing communications</li>
            <li style={{ marginBottom: '0.5rem' }}>Update or correct your information</li>
          </ul>
        </div>

        <div className="bento-card">
          <h3 style={{ 
            fontSize: '1.1rem', 
            marginBottom: 'var(--space-4)', 
            fontWeight: 700,
            color: 'var(--primary)'
          }}>
            6. Contact Us
          </h3>
          <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
            For privacy-related questions or to exercise your rights, contact us at:
          </p>
          <a 
            href="mailto:privacy@feedbackresponder.com" 
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
            privacy@feedbackresponder.com
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="bento-card size-full" style={{ marginTop: 'var(--bento-gap)', textAlign: 'center' }}>
        <Link to="/" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Privacy;
