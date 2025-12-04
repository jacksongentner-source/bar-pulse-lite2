'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';

interface CheckInModalProps {
  venueId: string;
  venueName: string;
  venueType: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CheckInModal({ venueId, venueName, venueType, isOpen, onClose, onSuccess }: CheckInModalProps) {
  const { addCheckIn } = useAuth();
  const [caption, setCaption] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🎉');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const emojis = ['🎉', '🍻', '🔥', '🌙', '⭐', '💜', '🎶', '✨', '🎊', '🥂'];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setShowAnimation(true);

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 500));

    addCheckIn(venueId, venueName, venueType, caption, selectedEmoji);

    // Show celebration animation
    setTimeout(() => {
      setIsSubmitting(false);
      setCaption('');
      setSelectedEmoji('🎉');
      onClose();
      onSuccess?.();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      {/* Celebration particles */}
      {showAnimation && (
        <>
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="fixed w-3 h-3 bg-brand rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float 2s ease-out forwards`,
              }}
            />
          ))}
        </>
      )}

      <style>{`
        @keyframes float {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) scale(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      <div className="card p-8 max-w-md w-full mx-4 border-2 border-brand shadow-xl shadow-brand/50 animate-in"
        style={{
          animation: showAnimation ? 'none' : 'slideIn 0.3s ease-out',
        }}
      >
        {!showAnimation ? (
          <>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Check In to {venueName}</h3>
              <p className="text-neutral-400 text-sm">{venueType}</p>
            </div>

            {/* Emoji Selector */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-neutral-300 mb-3">Choose your vibe:</p>
              <div className="grid grid-cols-5 gap-2">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setSelectedEmoji(emoji)}
                    className={`text-2xl p-3 rounded-lg transition transform hover:scale-110 ${
                      selectedEmoji === emoji
                        ? 'bg-brand/50 border-2 border-brand scale-110'
                        : 'bg-neutral-900 border-2 border-neutral-700 hover:border-brand'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Caption Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-neutral-300 mb-2">
                What's the vibe? (optional)
              </label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="The energy here is insane... 🔥"
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition resize-none h-20"
              />
              <p className="text-xs text-neutral-500 mt-1">{caption.length}/150 characters</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white hover:border-neutral-600 transition font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 bg-brand hover:bg-pink-600 rounded-lg text-white font-semibold transition disabled:opacity-50 shadow-lg shadow-brand/50"
              >
                {isSubmitting ? 'Checking in...' : `Check In ${selectedEmoji}`}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 animate-bounce">{selectedEmoji}</div>
            <h4 className="text-xl font-bold text-brand mb-2">Checked In!</h4>
            <p className="text-neutral-400">You're now at {venueName}</p>
          </div>
        )}
      </div>
    </div>
  );
}
