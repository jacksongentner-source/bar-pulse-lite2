'use client';

import Link from 'next/link';
import { computeAggregates, getVenue, venues } from "@/lib/data";
import { Stars } from "@/components/Stars";
import { BusyTimesChart } from "@/components/BusyTimesChart";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VenuePage() {
  const params = useParams();
  const [venue, setVenue] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (params?.id) {
      const id = Array.isArray(params.id) ? params.id[0] : params.id;
      const foundVenue = venues.find(v => v.id === id);
      setVenue(foundVenue);
    }
  }, [params?.id]);

  if (!mounted || !venue) {
    return (
      <main className="pb-12">
        <div className="card p-12 text-center">
          <p className="text-2xl mb-2">🏚️</p>
          <p className="text-neutral-400">Loading venue...</p>
        </div>
      </main>
    );
  }

  const agg = computeAggregates(venue.id);

  return (
    <main className="pb-12">
      {/* Back Link */}
      <Link href="/" className="text-brand hover:text-pink-400 transition text-sm mb-6 inline-block">
        ← Back to venues
      </Link>

      {/* Header */}
      <div className="card p-8 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-2">{venue.name}</h2>
            <p className="text-sm text-neutral-400">{venue.type} • {venue.city}, {venue.state}</p>
            {venue.description && (
              <p className="text-sm text-neutral-300 mt-3 max-w-2xl">{venue.description}</p>
            )}
          </div>
          {agg && (
            <div className="text-right">
              <div className="text-sm text-neutral-400">Vibe Score</div>
              <div className="text-4xl font-bold text-brand mb-2">{agg.avg.vibe.toFixed(1)}</div>
              <Stars value={agg.avg.vibe} />
            </div>
          )}
        </div>

        {/* Age Requirement */}
        {venue.minAge && (
          <div className="mt-6 pt-6 border-t border-neutral-700">
            <p className="text-sm text-neutral-300">
              <span className="font-semibold">Age Requirement:</span> {venue.minAge}+
            </p>
          </div>
        )}

        {/* Badges */}
        {agg && agg.badges.length > 0 && (
          <div className="mt-6 flex gap-2 flex-wrap">
            {agg.badges.map(b => <span key={b} className="badge">{b}</span>)}
          </div>
        )}
      </div>

      {/* Busy Times */}
      <div className="card p-6 mb-6">
        <BusyTimesChart venue={venue} />
      </div>

      {/* Stats Grid */}
      {agg && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className="card p-4 bg-neutral-900 border border-neutral-700">
            <div className="text-xs text-neutral-400 mb-2">ID Strictness</div>
            <div className="text-2xl font-bold text-brand">{agg.avg.idStrictness.toFixed(1)}</div>
            <div className="w-full bg-neutral-700 h-1 rounded-full mt-2">
              <div
                className="bg-brand h-full rounded-full transition-all"
                style={{ width: `${(agg.avg.idStrictness / 5) * 100}%` }}
              />
            </div>
          </div>
          <div className="card p-4 bg-neutral-900 border border-neutral-700">
            <div className="text-xs text-neutral-400 mb-2">Crowd Age</div>
            <div className="text-2xl font-bold text-brand">{agg.avg.crowdAge.toFixed(1)}</div>
            <div className="w-full bg-neutral-700 h-1 rounded-full mt-2">
              <div
                className="bg-brand h-full rounded-full transition-all"
                style={{ width: `${(agg.avg.crowdAge / 5) * 100}%` }}
              />
            </div>
          </div>
          <div className="card p-4 bg-neutral-900 border border-neutral-700">
            <div className="text-xs text-neutral-400 mb-2">Music</div>
            <div className="text-2xl font-bold text-brand">{agg.avg.music.toFixed(1)}</div>
            <div className="w-full bg-neutral-700 h-1 rounded-full mt-2">
              <div
                className="bg-brand h-full rounded-full transition-all"
                style={{ width: `${(agg.avg.music / 5) * 100}%` }}
              />
            </div>
          </div>
          <div className="card p-4 bg-neutral-900 border border-neutral-700">
            <div className="text-xs text-neutral-400 mb-2">Dress Code</div>
            <div className="text-2xl font-bold text-brand">{agg.avg.dressCode.toFixed(1)}</div>
            <div className="w-full bg-neutral-700 h-1 rounded-full mt-2">
              <div
                className="bg-brand h-full rounded-full transition-all"
                style={{ width: `${(agg.avg.dressCode / 5) * 100}%` }}
              />
            </div>
          </div>
          <div className="card p-4 bg-neutral-900 border border-neutral-700">
            <div className="text-xs text-neutral-400 mb-2">Ratings</div>
            <div className="text-2xl font-bold text-brand">{agg.count}</div>
          </div>
        </div>
      )}

      {/* Recent Ratings */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">Recent ratings</h3>
        {!agg?.recent.length && <div className="text-sm text-neutral-400">No ratings yet.</div>}
        <ul className="space-y-4">
          {agg?.recent.map((r) => (
            <li key={r.id} className="border-b border-neutral-800 pb-4 last:border-0 last:pb-0">
              <div className="flex gap-2 flex-wrap mb-2">
                <span className="badge text-xs">Vibe {r.scores.vibe.toFixed(1)}</span>
                <span className="badge text-xs">ID {r.scores.idStrictness.toFixed(1)}</span>
                <span className="badge text-xs">Age {r.scores.crowdAge.toFixed(1)}</span>
                <span className="badge text-xs">Music {r.scores.music.toFixed(1)}</span>
                <span className="badge text-xs">Dress {r.scores.dressCode.toFixed(1)}</span>
              </div>
              {r.comment && <p className="text-sm text-neutral-300 italic">"{r.comment}"</p>}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
