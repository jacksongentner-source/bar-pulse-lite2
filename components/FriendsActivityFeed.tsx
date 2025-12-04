'use client';

import { useAuth } from '@/lib/auth-context';

export function FriendsActivityFeed() {
  const { checkIns, currentUser } = useAuth();

  // Get all check-ins except from current user
  const friendCheckIns = checkIns.filter(ci => ci.userId !== currentUser?.id).slice(0, 10);

  if (friendCheckIns.length === 0) {
    return (
      <div className="card p-12 text-center">
        <p className="text-2xl mb-2">📭</p>
        <p className="text-neutral-400 mb-2">No friend check-ins yet</p>
        <p className="text-sm text-neutral-500">Invite your friends and they'll appear here!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {friendCheckIns.map((checkIn) => (
        <div key={checkIn.id} className="card p-6 border-l-4 border-brand hover:shadow-lg hover:shadow-brand/20 transition">
          {/* User Info */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                {checkIn.userInfo?.name?.[0]}
              </div>
              <div>
                <h3 className="font-semibold text-white">{checkIn.userInfo?.name}</h3>
                <p className="text-xs text-neutral-500">@{checkIn.userInfo?.username}</p>
              </div>
            </div>
            <span className="text-xs text-neutral-500">
              {new Date(checkIn.timestamp).toLocaleDateString()}
            </span>
          </div>

          {/* Photo */}
          {checkIn.photoData && (
            <div className="mb-4 rounded-lg overflow-hidden border border-neutral-700">
              <img
                src={checkIn.photoData}
                alt="Check-in photo"
                className="w-full h-64 object-cover hover:scale-105 transition duration-300"
              />
            </div>
          )}

          {/* Venue Info */}
          <div className="mb-4 p-3 bg-neutral-900 rounded-lg border border-neutral-700">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{checkIn.emoji || '📍'}</span>
              <div>
                <h4 className="font-semibold text-brand">{checkIn.venueName}</h4>
                <p className="text-xs text-neutral-500">{checkIn.venueType}</p>
              </div>
            </div>
          </div>

          {/* Caption */}
          {checkIn.caption && (
            <p className="text-neutral-200 mb-4 italic">"{checkIn.caption}"</p>
          )}

          {/* Engagement Buttons */}
          <div className="flex items-center gap-4 text-neutral-400 text-sm">
            <button className="hover:text-pink-500 transition flex items-center gap-1">
              <span>❤️</span>
              <span>Like</span>
            </button>
            <button className="hover:text-brand transition flex items-center gap-1">
              <span>💬</span>
              <span>Comment</span>
            </button>
            <button className="hover:text-brand transition flex items-center gap-1">
              <span>📍</span>
              <span>Save Location</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
