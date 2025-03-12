// src/store/authStore.js
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isAuthorized: false,
  isVerifying: true,
  token: localStorage.getItem('tc_token') || null,
  userData: JSON.parse(localStorage.getItem('tc_user') || 'null'),
  
  setAuth: (token, userData) => {
    
    // Store the complete userData object without filtering
    // This preserves all fields for inspection
    
    // Store in localStorage for persistence
    localStorage.setItem('tc_token', token);
    localStorage.setItem('tc_user', JSON.stringify(userData));
    
    set({
      isAuthorized: true,
      token,
      userData: userData, // Store the complete object
    });
  },
  
  setIsVerifying: (isVerifying) => set({ isVerifying }),
  
  reset: () => {
    localStorage.removeItem('tc_token');
    localStorage.removeItem('tc_user');
    
    set({
      isAuthorized: false,
      token: null,
      userData: null,
    });
  },
}));