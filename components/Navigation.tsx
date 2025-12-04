'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useEffect, useState } from 'react';

export function Navigation() {
  const router = useRouter();
  const { isSignedIn, signOut } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    signOut();
    router.push('/auth');
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav className="flex items-center gap-4 text-xl font-bold">
      {isSignedIn ? (
        <>
          <a href="/dashboard" className="text-white hover:text-brand transition glow-text">My Profile</a>
          <div className="w-2 h-2 bg-black rounded-full shadow-lg"></div>
          <a href="/friends" className="text-white hover:text-brand transition glow-text">Friends</a>
          <div className="w-2 h-2 bg-black rounded-full shadow-lg"></div>
          <a href="/map" className="text-neutral-500 pointer-events-none" title="Map coming soon">Map</a>
          <div className="w-2 h-2 bg-black rounded-full shadow-lg"></div>
          <button 
            onClick={handleLogout}
            className="text-white hover:text-pink-400 transition glow-text"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <a href="/" className="text-white hover:text-brand transition glow-text">Explore</a>
          <div className="w-2 h-2 bg-black rounded-full shadow-lg"></div>
          <a href="/auth" className="text-white hover:text-brand transition glow-text">Sign In</a>
        </>
      )}
    </nav>
  );
}
