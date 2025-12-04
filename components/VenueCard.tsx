'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Stars } from "./Stars";
import { CheckInModal } from "./CheckInModal";

type Venue = {
  id: string;
  name: string;
  type: string;
  city: string;
  state: string;
  avg: { vibe: number };
  badges: string[];
};

export function VenueCard({ v }: { v: Venue }) {
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [justCheckedIn, setJustCheckedIn] = useState(false);

  const handleCheckInSuccess = () => {
    setJustCheckedIn(true);
    setTimeout(() => setJustCheckedIn(false), 3000);
  };

  return (
    <>
      <CheckInModal
        venueId={v.id}
        venueName={v.name}
        venueType={v.type}
        isOpen={showCheckInModal}
        onClose={() => setShowCheckInModal(false)}
        onSuccess={handleCheckInSuccess}
      />

      <div className={`card block transition group relative ${justCheckedIn ? 'ring-2 ring-brand shadow-lg shadow-brand/50' : 'hover:ring-1 hover:ring-brand'}`}>
        {justCheckedIn && (
          <div className="absolute inset-0 bg-gradient-to-r from-brand/20 to-pink-500/20 rounded-lg animate-pulse pointer-events-none" />
        )}

        <Link href={`/venue/${v.id}`} className="block mb-4 group/link">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-lg font-semibold group-hover/link:text-brand transition">{v.name}</div>
              <div className="text-xs text-neutral-400">{v.type} • {v.city}, {v.state}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-neutral-400">Vibe</div>
              <div className="text-xl font-bold">{v.avg.vibe.toFixed(1)}</div>
              <Stars value={v.avg.vibe} />
            </div>
          </div>
          <div className="mt-3 flex gap-2 flex-wrap">
            {v.badges.map((b) => (
              <span key={b} className="badge">{b}</span>
            ))}
          </div>
        </Link>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowCheckInModal(true);
          }}
          className="w-full px-3 py-2 bg-gradient-to-r from-brand to-pink-500 hover:from-pink-500 hover:to-brand rounded-lg text-white font-semibold text-sm transition transform hover:scale-105 shadow-lg shadow-brand/30 flex items-center justify-center gap-2"
        >
          <span>📍</span>
          <span>Check In</span>
        </button>
      </div>
    </>
  );
}
