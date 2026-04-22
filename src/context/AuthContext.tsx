'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('simba_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password?: string) => {
    // Mock robust login: In a real app, this would call an API
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email.includes('error')) {
          reject(new Error('Invalid credentials'));
          return;
        }
        const nameFromEmail = email.split('@')[0];
        const capitalizedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
        const mockUser = { 
          name: capitalizedName, 
          email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${nameFromEmail}`
        };
        setUser(mockUser);
        localStorage.setItem('simba_user', JSON.stringify(mockUser));
        resolve();
      }, 1000);
    });
  };

  const googleLogin = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const mockUser = { 
          name: 'Google User', 
          email: 'google@example.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=google'
        };
        setUser(mockUser);
        localStorage.setItem('simba_user', JSON.stringify(mockUser));
        resolve();
      }, 1500);
    });
  };

  const forgotPassword = async (email: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(`Password reset link sent to ${email}`);
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('simba_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      googleLogin, 
      logout, 
      forgotPassword, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
