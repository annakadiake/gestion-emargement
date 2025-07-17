import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }

  return context;
}