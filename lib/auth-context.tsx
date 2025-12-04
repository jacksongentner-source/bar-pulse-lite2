'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}

interface CheckIn {
  id: string;
  userId: string;
  venueId: string;
  venueName: string;
  venueType: string;
  timestamp: string;
  caption?: string;
  emoji?: string;
}

interface AuthContextType {
  user: User | null;
  currentUser: User | null;
  isSignedIn: boolean;
  checkIns: CheckIn[];
  signUp: (name: string, email: string, username: string, password: string) => Promise<string | null>;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => void;
  addCheckIn: (venueId: string, venueName: string, venueType: string, caption?: string, emoji?: string) => void;
  getCheckInsByUser: (userId: string) => CheckIn[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);

  // Load user and check-ins from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedCheckIns = localStorage.getItem('checkIns');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsSignedIn(true);
      } catch (e) {
        console.error('Failed to parse stored user', e);
      }
    }
    
    if (storedCheckIns) {
      try {
        setCheckIns(JSON.parse(storedCheckIns));
      } catch (e) {
        console.error('Failed to parse check-ins', e);
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

  const addCheckIn = (venueId: string, venueName: string, venueType: string, caption?: string, emoji?: string) => {
    if (!user) return;
    
    const newCheckIn: CheckIn = {
      id: Date.now().toString(),
      userId: user.id,
      venueId,
      venueName,
      venueType,
      timestamp: new Date().toISOString(),
      caption,
      emoji,
    };

    const updatedCheckIns = [newCheckIn, ...checkIns];
    setCheckIns(updatedCheckIns);
    localStorage.setItem('checkIns', JSON.stringify(updatedCheckIns));
  };

  const getCheckInsByUser = (userId: string) => {
    return checkIns.filter(ci => ci.userId === userId).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  };

  return (
    <AuthContext.Provider value={{ user, currentUser: user, isSignedIn, checkIns, signUp, signIn, signOut, addCheckIn, getCheckInsByUser }}>
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
