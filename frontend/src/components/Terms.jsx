import React from 'react';
import { Link } from 'react-router-dom';

function Terms() {
  return (
    <div className="fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Header Card */}
      <div className="bento-card size-full" style={{ marginBottom: 'var(--bento-gap)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
          <div style={{ 
            background: 'var(--primary)', 
            color: 'white',
            padding: 'var(--space-3)', 
            borderRadius: 'var(--radius-sm)',
            fontSize: '1.5rem'
          }}>📄</div>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>Terms of Service</h1>
            <p style={{ color: 'var(--fg-muted)', margin: 0, fontWeight: 600 }}>Last updated: March 2026</p>
          </div>
        </div>
      </div>

      {/* Warning Card */}
      <div className="bento-card accent-primary" style={{ marginBottom: 'var(--bento-gap)' }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem' }}>
          ⚖️ By using Feedback Responder, you agree to these terms.
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
            1. Acceptance of Terms
          </h3>
          <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8 }}>
            By accessing or using Feedback Responder ("Service"), you agree to be bound by these Terms of 
            Service and all applicable laws and regulations. If you do not agree with any of these terms, 
            you are prohibited from using or accessing this Service.
          </p>
        </div>

        <div className="bento-card">
          <h3 style={{ 
            fontSize: '1.1rem', 
            marginBottom: 'var(--space-4)', 
            fontWeight: 700,
            color: 'var(--primary)'
          }}>
            2. Description of Service
          </h3>
          <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8 }}>
            Feedback Responder provides an AI-powered platform for generating and managing responses to
            customer reviews on Google Business Profiles and other review platforms. Our service includes 
            AI-generated response suggestions, approval workflows, and analytics.
          </p>
        </div>

        <div className="bento-card">
          <h3 style={{ 
            fontSize: '1.1rem', 
            marginBottom: 'var(--space-4)', 
            fontWeight: 700,
            color: 'var(--primary)'
          }}>
            3. User Accounts
          </h3>
          <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
            You are responsible for:
          </p>
          <ul style={{ color: 'var(--fg-muted)', lineHeight: 1.8, paddingLeft: 'var(--space-6)' }}>
            <li style={{ marginBottom: '0.5rem' }}>Maintaining the confidentiality of your account credentials</li>
            <li style={{ marginBottom: '0.5rem' }}>All activities that occur under your account</li>
            <li style={{ marginBottom: '0.5rem' }}>Ensuring your use complies with applicable laws</li>
            <li style={{ marginBottom: '0.5rem' }}>Notifying us immediately of any unauthorized use</li>
          </ul>
        </div>

        <div className="bento-card">
          <h3 style={{ 
            fontSize: '1.1rem', 
            marginBottom: 'var(--space-4)', 
            fontWeight: 700,
            color: 'var(--primary)'
          }}>
            4. Acceptable Use
          </h3>
          <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
            You agree not to use our service to:
          </p>
          <ul style={{ color: 'var(--fg-muted)', lineHeight: 1.8, paddingLeft: 'var(--space-6)' }}>
            <li style={{ marginBottom: '0.5rem' }}>Generate spam, fake, or misleading content</li>
            <li style={{ marginBottom: '0.5rem' }}>Violate any applicable laws or regulations</li>
            <li style={{ marginBottom: '0.5rem' }}>Infringe on intellectual property rights</li>
            <li style={{ marginBottom: '0.5rem' }}>Attempt to reverse engineer or disrupt our service</li>
          </ul>
        </div>

        <div className="bento-card">
          <h3 style={{ 
            fontSize: '1.1rem', 
            marginBottom: 'var(--space-4)', 
            fontWeight: 700,
            color: 'var(--primary)'
          }}>
            5. AI-Generated Content
          </h3>
          <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8 }}>
            Our service generates AI-suggested responses based on review content. You are responsible for 
            reviewing and approving all responses before they are posted. We are not liable for the content 
            of AI-generated responses once approved and posted by you.
          </p>
        </div>

        <div className="bento-card">
          <h3 style={{ 
            fontSize: '1.1rem', 
            marginBottom: 'var(--space-4)', 
            fontWeight: 700,
            color: 'var(--primary)'
          }}>
            6. Payment Terms
          </h3>
          <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8 }}>
            Subscription fees are billed monthly or annually in advance. You may cancel at any time, and 
            your subscription will remain active until the end of the current billing period. No refunds 
            are provided for partial billing periods.
          </p>
        </div>

        <div className="bento-card">
          <h3 style={{ 
            fontSize: '1.1rem', 
            marginBottom: 'var(--space-4)', 
            fontWeight: 700,
            color: 'var(--primary)'
          }}>
            7. Limitation of Liability
          </h3>
          <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8 }}>
            To the maximum extent permitted by law, Feedback Responder shall not be liable for any 
            indirect, incidental, special, consequential, or punitive damages, including loss of profits, 
            data, or business opportunities, even if advised of the possibility of such damages.
          </p>
        </div>

        <div className="bento-card">
          <h3 style={{ 
            fontSize: '1.1rem', 
            marginBottom: 'var(--space-4)', 
            fontWeight: 700,
            color: 'var(--primary)'
          }}>
            8. Contact Us
          </h3>
          <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
            For questions about these terms, contact us at:
          </p>
          <a 
            href="mailto:legal@feedbackresponder.com" 
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
            legal@feedbackresponder.com
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

export default Terms;
