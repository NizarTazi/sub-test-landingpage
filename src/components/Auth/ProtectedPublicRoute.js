// src/components/Auth/ProtectedPublicRoute.js
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import LoadingState from '../UI/LoadingState';
import RestrictedAccess from './RestrictedAccess';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://evzxlyclzesodzorchku.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ProtectedPublicRoute = ({ children }) => {
  const [searchParams] = useSearchParams();
  const {
    isAuthorized,
    isVerifying,
    token: storedToken,
    setAuth,
    setIsVerifying,
    reset,
  } = useAuthStore();

  useEffect(() => {
    const verifyAccess = async () => {
      // Get token from URL or localStorage
      const token = searchParams.get("token") || storedToken;
      
      if (!token) {
        setIsVerifying(false);
        reset();
        return;
      }

      // Verify the token using your existing Supabase function
      try {
        const { data, error } = await supabase.functions.invoke("decrypt-sso", {
          body: { token },
        });

        if (error) throw error;
        
        if (data.isValid && data.userData) {
          // Store the token and user data
          setAuth(token, data.userData);
        } else {
          reset();
        }
      } catch (error) {
        console.error("SSO verification failed:", error);
        reset();
      } finally {
        setIsVerifying(false);
      }
    };

    verifyAccess();
  }, [searchParams, storedToken, setAuth, setIsVerifying, reset]);

  if (isVerifying) {
    return <LoadingState text="Vérification de l'accès..." />;
  }

  if (!isAuthorized) {
    return <RestrictedAccess />;
  }

  return children;
};

export default ProtectedPublicRoute;