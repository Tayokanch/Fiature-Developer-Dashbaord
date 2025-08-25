import React, { createContext, useContext, useState, useEffect } from 'react';
import { isTokenValid } from '../utils/jwtUtils';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For development: use hardcoded token, fallback to localStorage
    const hardcodedToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOnsidmFsaWQiOnRydWUsInVzZXJJZCI6ImI1NjgzMmNlLWI3MGQtNDAyZS04ODRiLTlmYzVmYjk3MjFiMSJ9LCJpYXQiOjE3NTYxMjg3MTIsImV4cCI6MTc1NjEyOTYxMn0.-g2z54XDMlEFDjRS69sDgoz1_k5WvfX8mnidVG13EX0';
    const storedToken = localStorage.getItem('authToken');
    const tokenToUse = hardcodedToken || storedToken;

    if (tokenToUse) {
      console.log('Found token:', tokenToUse);
      
      // Check if token is valid
      if (isTokenValid(tokenToUse)) {
        console.log('Token is valid, setting it...');
        setToken(tokenToUse);
      } else {
        console.log('Token is invalid or expired');
        // Clear invalid token
        localStorage.removeItem('authToken');
        setToken(null);
      }
    } else {
      console.log('No token found');
    }
    
    setLoading(false);
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('authToken', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    setUser,
    setToken, // Add setToken to the context
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
