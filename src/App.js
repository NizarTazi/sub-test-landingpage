import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProtectedPublicRoute from './components/Auth/ProtectedPublicRoute';
import RestrictedAccess from './components/Auth/RestrictedAccess';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={
            <ProtectedPublicRoute>
              <LandingPage />
            </ProtectedPublicRoute>
          } />
          <Route path="/restricted" element={<RestrictedAccess />} />
          <Route path="*" element={<RestrictedAccess />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;