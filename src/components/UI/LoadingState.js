// src/components/UI/LoadingState.js
import React from 'react';

const LoadingState = ({ text, className = '' }) => {
  return (
    <div className={`loading-state ${className}`} style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      textAlign: 'center',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div className="spinner" style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(255, 182, 6, 0.2)',
          borderTop: '3px solid rgba(255, 182, 6, 1)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '1.5rem'
        }}></div>
        
        <p style={{
          fontSize: '1.2rem',
          color: '#4a5568',
          marginBottom: '0.5rem'
        }}>
          {text || 'Chargement...'}
        </p>
      </div>
      
      <style jsx="true">{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingState;