import React from 'react';
import { Link } from 'react-router-dom';

function Terms() {
  return (
    <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card">
        <h2 style={{ fontSize: '2rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem', textTransform: 'uppercase' }}>
          <span style={{ background: 'var(--yellow)', padding: '0.25rem 0.5rem', border: '3px solid var(--border)' }}>📄</span> Terms of Service
        </h2>
        <p style={{ color: 'var(--fg-muted)', marginBottom: 'var(--space-8)', paddingBottom: 'var(--space-6)', borderBottom: '4px solid var(--border)', fontWeight: 600 }}>
          Last updated: March 2026
        </p>

        {/* Warning box */}
        <div style={{
          background: 'var(--primary)',
          color: 'white',
          border: '4px solid var(--border)',
          padding: 'var(--space-5)',
          marginBottom: 'var(--space-8)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <p style={{ margin: 0, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.9rem' }}>
            ⚖️ By using Review Response AI, you agree to these terms.
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
              1. Acceptance of Terms
            </h3>
            <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginTop: 'var(--space-4)' }}>
              By accessing or using Review Response AI ("Service"), you agree to be bound by these Terms of 
              Service and all applicable laws and regulations. If you do not agree with any of these terms, 
              you are prohibited from using or accessing this Service.
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
              2. Description of Service
            </h3>
            <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginTop: 'var(--space-4)' }}>
              Review Response AI provides an AI-powered platform for generating and managing responses to 
              customer reviews. The Service includes automated response generation, approval workflows, 
              analytics, and integrations with third-party platforms like Google Business Profile.
            </p>
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
              3. User Accounts
            </h3>
            <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
              You are responsible for:
            </p>
            <ul style={{ color: 'var(--fg-muted)', lineHeight: 1.8, paddingLeft: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
              <li style={{ marginBottom: '0.5rem' }}>Maintaining the confidentiality of your account credentials</li>
              <li style={{ marginBottom: '0.5rem' }}>All activities that occur under your account</li>
              <li style={{ marginBottom: '0.5rem' }}>Ensuring your use complies with applicable laws</li>
              <li style={{ marginBottom: '0.5rem' }}>Notifying us immediately of any unauthorized use</li>
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
              4. Acceptable Use
            </h3>
            <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
              You agree not to:
            </p>
            <ul style={{ color: 'var(--fg-muted)', lineHeight: 1.8, paddingLeft: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
              <li style={{ marginBottom: '0.5rem' }}>Use the Service for any unlawful purpose</li>
              <li style={{ marginBottom: '0.5rem' }}>Generate spam, malicious, or deceptive content</li>
              <li style={{ marginBottom: '0.5rem' }}>Attempt to reverse engineer or extract our AI models</li>
              <li style={{ marginBottom: '0.5rem' }}>Interfere with or disrupt the Service</li>
              <li style={{ marginBottom: '0.5rem' }}>Share your account access with unauthorized users</li>
            </ul>
          </section>

          <section style={{ marginBottom: 'var(--space-10)' }}>
            <h3 style={{ 
              fontSize: '1.1rem', 
              marginBottom: 'var(--space-4)', 
              color: 'var(--fg)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              background: 'var(--primary)',
              color: 'white',
              padding: 'var(--space-2) var(--space-4)',
              border: '3px solid var(--border)',
              display: 'inline-block',
              boxShadow: 'var(--shadow-sm)'
            }}>
              5. AI-Generated Content
            </h3>
            <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginTop: 'var(--space-4)' }}>
              Our Service generates suggested responses using artificial intelligence. You are responsible 
              for reviewing, editing, and approving all content before publishing. We do not guarantee the 
              accuracy, appropriateness, or effectiveness of AI-generated responses. You assume full 
              responsibility for content you publish through the Service.
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
              6. Subscription & Payments
            </h3>
            <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginTop: 'var(--space-4)' }}>
              Paid subscriptions are billed in advance on a monthly or annual basis. You may cancel at any 
              time, and your subscription will remain active until the end of the current billing period. 
              Refunds are provided at our discretion. Prices are subject to change with 30 days notice.
            </p>
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
              7. Contact Us
            </h3>
            <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginTop: 'var(--space-4)' }}>
              Questions? Reach out at{' '}
              <a href="mailto:legal@reviewresponse.ai" style={{ color: 'var(--primary)', fontWeight: 700, background: 'var(--yellow)', padding: '0.125rem 0.375rem', border: '2px solid var(--border)' }}>
                legal@reviewresponse.ai
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

export default Terms;
