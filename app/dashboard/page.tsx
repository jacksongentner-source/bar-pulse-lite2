'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { listVenues } from "@/lib/data";
import { VenueCard } from "@/components/VenueCard";

export default function DashboardPage() {
  const router = useRouter();
  const { isSignedIn, currentUser, getCheckInsByUser } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isSignedIn) {
      router.push('/auth');
    }
  }, [isSignedIn, mounted, router]);

  if (!mounted || !isSignedIn || !currentUser) {
    return null;
  }

  const venues = listVenues();
  const userCheckIns = getCheckInsByUser(currentUser.id);
  const recentCheckIns = userCheckIns.slice(0, 5);
  const checkInCount = userCheckIns.length;
  const favoriteVenues = venues.slice(0, 3);

  return (
    <main className="pb-12">
      {/* User Stats Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-2">Welcome back, {currentUser.name}! 👋</h2>
        <p className="text-neutral-400 mb-6">Keep crushing it with check-ins</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Stats Cards */}
          <div className="card p-6 text-center hover:border-brand transition">
            <p className="text-4xl font-bold text-brand mb-2">{checkInCount}</p>
            <p className="text-neutral-400">Total Check-ins</p>
          </div>
          <div className="card p-6 text-center hover:border-pink-500 transition">
            <p className="text-4xl font-bold text-pink-500 mb-2">8</p>
            <p className="text-neutral-400">Friends Following</p>
          </div>
          <div className="card p-6 text-center hover:border-purple-500 transition">
            <p className="text-4xl font-bold text-purple-500 mb-2">🔥</p>
            <p className="text-neutral-400">On A Roll!</p>
          </div>
        </div>
      </section>

      {/* Recent Check-ins Section */}
      {recentCheckIns.length > 0 && (
        <section className="mb-12">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span>📍 Your Recent Check-ins</span>
            <span className="text-xs bg-brand/20 text-brand px-3 py-1 rounded-full font-mono">{checkInCount}</span>
          </h3>
          <div className="space-y-3">
            {recentCheckIns.map((checkIn) => (
              <div key={checkIn.id} className="card p-4 border-l-4 border-brand hover:shadow-lg hover:shadow-brand/20 transition">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{checkIn.emoji || '📍'}</span>
                      <div>
                        <h4 className="font-semibold text-brand">{checkIn.venueName}</h4>
                        <p className="text-xs text-neutral-500">{checkIn.venueType}</p>
                      </div>
                    </div>
                    {checkIn.caption && (
                      <p className="text-sm text-neutral-300 italic">"{checkIn.caption}"</p>
                    )}
                  </div>
                  <div className="text-right text-xs text-neutral-500">
                    {new Date(checkIn.timestamp).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Your Favorites */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Your Favorites</h3>
          <a href="/" className="text-sm text-brand hover:text-pink-400 transition">
            View all →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteVenues.map(v => <VenueCard key={v.id} v={v as any} />)}
        </div>
      </section>
    </main>
  );
}

  return (
    <main className="pb-12">
      {/* User Stats Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-2">Welcome back, {currentUser.name}! 👋</h2>
        <p className="text-neutral-400 mb-6">Here's what your friends are up to</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Stats Cards */}
          <div className="card p-6 text-center">
            <p className="text-4xl font-bold text-brand mb-2">12</p>
            <p className="text-neutral-400">Venues Visited</p>
          </div>
          <div className="card p-6 text-center">
            <p className="text-4xl font-bold text-pink-500 mb-2">8</p>
            <p className="text-neutral-400">Friends Following</p>
          </div>
          <div className="card p-6 text-center">
            <p className="text-4xl font-bold text-purple-500 mb-2">4</p>
            <p className="text-neutral-400">Check-ins This Week</p>
          </div>
        </div>
      </section>

      </section>
    </main>
  );
}
