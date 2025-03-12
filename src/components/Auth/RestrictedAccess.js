// src/components/Auth/RestrictedAccess.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const RestrictedAccess = () => {
  return (
    <div className="restricted-access" style={{
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
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '3rem',
        maxWidth: '500px',
        boxShadow: '0 6px 24px rgba(0, 0, 0, 0.08)'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: 'rgba(255, 182, 6, 0.15)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          fontSize: '30px',
          color: 'rgba(255, 182, 6, 1)'
        }}>
          <FontAwesomeIcon icon={faLock} />
        </div>
        
        <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Accès Restreint</h2>
        <p style={{ color: '#4a5568', marginBottom: '2rem', fontSize: '1.1rem' }}>
          Cette page est accessible uniquement via votre plateforme Tutorax. Veuillez retourner à votre 
          compte et suivre le lien approprié.
        </p>
        
        <a 
          href="https://app.tutorax.com/" 
          style={{
            display: 'inline-block',
            padding: '1rem 2rem',
            backgroundColor: 'rgba(255, 182, 6, 1)',
            color: 'white',
            fontWeight: '600',
            borderRadius: '6px',
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(255, 182, 6, 0.25)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 182, 6, 0.35)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 182, 6, 0.25)';
          }}
        >
          Connexion TutorCruncher
        </a>
      </div>
    </div>
  );
};

export default RestrictedAccess;