import React, { useState } from 'react';
import { Routes, Route, Link, useSearchParams, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ApprovalQueue from './components/ApprovalQueue';
import Analytics from './components/Analytics';

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
            <span>⭐</span>
            Review Response AI
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
        </Routes>
      </main>
    </div>
  );
}

export default App;
