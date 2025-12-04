'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { listVenues } from "@/lib/data";
import { VenueCard } from "@/components/VenueCard";

export default function DashboardPage() {
  const router = useRouter();
  const { isSignedIn, currentUser } = useAuth();
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
  const favoriteVenues = venues.slice(0, 3);
  const recentVenues = venues.slice(3, 6);

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

      {/* Quick Actions */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="card p-6 hover:border-brand hover:shadow-lg hover:shadow-brand/20 transition text-center">
            <p className="text-3xl mb-2">📍</p>
            <p className="font-semibold">Check In</p>
            <p className="text-xs text-neutral-400 mt-1">Share where you are</p>
          </button>
          <button className="card p-6 hover:border-brand hover:shadow-lg hover:shadow-brand/20 transition text-center">
            <p className="text-3xl mb-2">❤️</p>
            <p className="font-semibold">My Favorites</p>
            <p className="text-xs text-neutral-400 mt-1">View saved venues</p>
          </button>
          <button className="card p-6 hover:border-brand hover:shadow-lg hover:shadow-brand/20 transition text-center">
            <p className="text-3xl mb-2">👥</p>
            <p className="font-semibold">Invite Friends</p>
            <p className="text-xs text-neutral-400 mt-1">Share the vibe</p>
          </button>
        </div>
      </section>

      {/* Favorite Venues */}
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

      {/* Recent Activity */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-6">Recently Visited</h3>
        <div className="space-y-4">
          {recentVenues.map((venue: any) => (
            <div key={venue.id} className="card p-4 flex items-center justify-between hover:border-brand transition group">
              <div className="flex-1">
                <h4 className="font-semibold group-hover:text-brand transition">{venue.name}</h4>
                <p className="text-sm text-neutral-400">{venue.type}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-brand">⭐ 4.5</p>
                <p className="text-xs text-neutral-500">2 days ago</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommendations */}
      <section>
        <h3 className="text-xl font-semibold mb-6">Recommended For You</h3>
        <div className="card p-6">
          <div className="flex items-start gap-4">
            <span className="text-4xl">✨</span>
            <div>
              <h4 className="font-semibold mb-2">Based on your taste</h4>
              <p className="text-sm text-neutral-400 mb-4">We found 3 new venues that match your vibe. Check them out!</p>
              <button className="px-4 py-2 bg-brand hover:bg-pink-600 text-white rounded-lg font-medium transition">
                Explore Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
