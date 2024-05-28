import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TokenGeneration from './components/TokenGeneration';
import TokenVerification from './components/TokenVerification';
import styles from './App.module.css';

const App = () => {
  return (
    <Router>
      <div className={styles.app}>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link to="/">Token Generation</Link>
            </li>
            <li>
              <Link to="/verify">Token Verification</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/verify" element={<TokenVerification />} />
          <Route path="/" element={<TokenGeneration />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
