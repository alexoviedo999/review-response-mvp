import React from 'react';
import { Routes, Route, Link, useSearchParams } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ApprovalQueue from './components/ApprovalQueue';
import Analytics from './components/Analytics';

function App() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('user_id');

  return (
    <div className="app">
      <header>
        <h1>⭐ Review Response AI</h1>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/queue">Approval Queue</Link>
          <Link to="/analytics">Analytics</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Dashboard userId={userId} />} />
        <Route path="/queue" element={<ApprovalQueue userId={userId} />} />
        <Route path="/analytics" element={<Analytics userId={userId} />} />
      </Routes>
    </div>
  );
}

export default App;
