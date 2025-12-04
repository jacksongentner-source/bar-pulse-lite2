'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { FriendsActivityFeed } from "@/components/FriendsActivityFeed";

export default function FriendsPage() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isSignedIn) {
      router.push('/auth');
    }
  }, [isSignedIn, mounted, router]);

  if (!mounted || !isSignedIn) {
    return null;
  }

  return (
    <main>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Friends</h2>
        <p className="text-sm text-neutral-400">See where your friends are going and what they're loving</p>
      </section>
      <FriendsActivityFeed />
    </main>
  );
}
