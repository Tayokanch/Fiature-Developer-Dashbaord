import { jwtDecode } from 'jwt-decode';

export const isTokenValid = (token) => {
  if (!token) return false;
  
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) {
      return true; 
    }
    
    const currentTime = Date.now() / 1000;
    const bufferTime = 60; 
    const isValid = decoded.exp - currentTime > bufferTime;
    return isValid; 
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};