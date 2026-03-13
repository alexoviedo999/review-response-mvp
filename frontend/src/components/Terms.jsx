import React from 'react';
import { Link } from 'react-router-dom';

function Terms() {
  return (
    <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card">
        <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>📄 Terms of Service</h2>
        <p style={{ color: 'var(--gray-500)', marginBottom: '32px' }}>
          Last updated: March 2026
        </p>

        <div className="legal-content">
          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--gray-800)' }}>
              1. Acceptance of Terms
            </h3>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8 }}>
              By accessing or using Review Response AI ("Service"), you agree to be bound by these Terms of 
              Service and all applicable laws and regulations. If you do not agree with any of these terms, 
              you are prohibited from using or accessing this Service.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--gray-800)' }}>
              2. Description of Service
            </h3>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8 }}>
              Review Response AI provides an AI-powered platform for generating and managing responses to 
              customer reviews. The Service includes automated response generation, approval workflows, 
              analytics, and integrations with third-party platforms like Google Business Profile.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--gray-800)' }}>
              3. User Accounts
            </h3>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: '16px' }}>
              You are responsible for:
            </p>
            <ul style={{ color: 'var(--gray-600)', lineHeight: 1.8, paddingLeft: '24px', marginBottom: '16px' }}>
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Ensuring your use complies with applicable laws</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--gray-800)' }}>
              4. Acceptable Use
            </h3>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: '16px' }}>
              You agree not to:
            </p>
            <ul style={{ color: 'var(--gray-600)', lineHeight: 1.8, paddingLeft: '24px', marginBottom: '16px' }}>
              <li>Use the Service for any unlawful purpose</li>
              <li>Generate spam, malicious, or deceptive content</li>
              <li>Attempt to reverse engineer or extract our AI models</li>
              <li>Interfere with or disrupt the Service</li>
              <li>Share your account access with unauthorized users</li>
              <li>Use automated systems to access the Service without permission</li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--gray-800)' }}>
              5. AI-Generated Content
            </h3>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8 }}>
              Our Service generates suggested responses using artificial intelligence. You are responsible 
              for reviewing, editing, and approving all content before publishing. We do not guarantee the 
              accuracy, appropriateness, or effectiveness of AI-generated responses. You assume full 
              responsibility for content you publish through the Service.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--gray-800)' }}>
              6. Subscription & Payments
            </h3>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: '16px' }}>
              Paid subscriptions are billed in advance on a monthly or annual basis. You may cancel at any 
              time, and your subscription will remain active until the end of the current billing period. 
              Refunds are provided at our discretion. Prices are subject to change with 30 days notice.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--gray-800)' }}>
              7. Intellectual Property
            </h3>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8 }}>
              The Service and its original content, features, and functionality are owned by Review Response AI 
              and are protected by international copyright, trademark, and other intellectual property laws. 
              You retain ownership of content you provide, including reviews and custom responses.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--gray-800)' }}>
              8. Limitation of Liability
            </h3>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8 }}>
              To the maximum extent permitted by law, Review Response AI shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages, including without limitation, loss of 
              profits, data, or business opportunities, regardless of the cause of action.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--gray-800)' }}>
              9. Termination
            </h3>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8 }}>
              We may terminate or suspend your account and access to the Service immediately, without prior 
              notice, for any reason, including breach of these Terms. Upon termination, your right to use 
              the Service ceases immediately.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--gray-800)' }}>
              10. Changes to Terms
            </h3>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8 }}>
              We reserve the right to modify these Terms at any time. We will notify users of material 
              changes via email or through the Service. Continued use after changes constitutes acceptance 
              of the new Terms.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--gray-800)' }}>
              11. Contact Us
            </h3>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8 }}>
              If you have questions about these Terms, please contact us at{' '}
              <a href="mailto:legal@reviewresponse.ai" style={{ color: 'var(--primary)' }}>
                legal@reviewresponse.ai
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

export default Terms;
