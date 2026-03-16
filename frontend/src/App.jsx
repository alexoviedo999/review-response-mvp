import React, { useState } from 'react';
import { Routes, Route, Link, useSearchParams, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ApprovalQueue from './components/ApprovalQueue';
import Analytics from './components/Analytics';
import Privacy from './components/Privacy';
import Terms from './components/Terms';

function App() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userId = searchParams.get('user_id');

  const navLinks = [
    { path: '/', label: 'Dashboard' },
    { path: '/queue', label: 'Approval Queue' },
    { path: '/analytics', label: 'Analytics' }
  ];

  return (
    <div className="app">
      <header>
        <div className="header-content">
          <h1>
            Feedback Responder
          </h1>
          
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
          
          <nav className={mobileMenuOpen ? 'open' : ''}>
            {navLinks.map(link => (
              <Link 
                key={link.path}
                to={link.path}
                className={location.pathname === link.path ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Dashboard userId={userId} />} />
          <Route path="/queue" element={<ApprovalQueue userId={userId} />} />
          <Route path="/analytics" element={<Analytics userId={userId} />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <span>© 2026 Feedback Responder</span>
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
