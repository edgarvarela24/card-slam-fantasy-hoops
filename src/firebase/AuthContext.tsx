import React, { useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import {
  getCurrentUser,
  onAuthChange,
  signIn as authSignIn,
  signUp as authSignUp,
  logout as authLogout,
  resetPassword as authResetPassword,
} from './auth';
import { AuthContext } from './authHooks';
import type { AuthContextType } from './authHooks';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange(authUser => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    signIn: authSignIn,
    signUp: authSignUp,
    logout: authLogout,
    resetPassword: authResetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
