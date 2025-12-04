'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  currentUser: User | null;
  isSignedIn: boolean;
  signUp: (name: string, email: string, username: string, password: string) => Promise<string | null>;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsSignedIn(true);
      } catch (e) {
        console.error('Failed to parse stored user', e);
      }
    }
    setIsHydrated(true);
  }, []);

  const signUp = async (name: string, email: string, username: string, password: string): Promise<string | null> => {
    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.some((u: any) => u.email === email || u.username === username)) {
      return 'Email or username already exists';
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      username,
    };

    // Store password (in real app, use proper hashing)
    users.push({ ...newUser, password });
    localStorage.setItem('users', JSON.stringify(users));

    // Sign in the new user
    const userData: User = { id: newUser.id, name: newUser.name, email: newUser.email, username: newUser.username };
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setUser(userData);
    setIsSignedIn(true);

    return null; // No error
  };

  const signIn = async (email: string, password: string): Promise<string | null> => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);

    if (!foundUser) {
      return 'Invalid email or password';
    }

    const userData: User = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      username: foundUser.username,
    };

    localStorage.setItem('currentUser', JSON.stringify(userData));
    setUser(userData);
    setIsSignedIn(true);

    return null; // No error
  };

  const signOut = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setIsSignedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, currentUser: user, isSignedIn, signUp, signIn, signOut }}>
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
