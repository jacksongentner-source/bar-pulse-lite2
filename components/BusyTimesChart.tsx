'use client';

import { Venue } from '@/lib/data';
import { useState, useRef } from 'react';

export function BusyTimesChart({ venue }: { venue: Venue }) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  if (!venue.busyTimes || venue.busyTimes.length === 0) {
    return null;
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const busyData = venue.busyTimes.reduce((acc, bt) => {
    acc[bt.day] = bt;
    return acc;
  }, {} as Record<string, typeof venue.busyTimes[0]>);

  // Fill in missing days with default "dead" times
  const fillMissingDays = () => {
    days.forEach(day => {
      if (!busyData[day]) {
        busyData[day] = {
          day,
          startTime: '8:00PM',
          endTime: '10:00PM',
          crowdLevel: 'dead'
        };
      }
    });
    return busyData;
  };
  
  const completeBusyData = fillMissingDays();

  const getCrowdColor = (level: string) => {
    switch (level) {
      case 'dead':
        return { bg: 'bg-gray-600', glow: 'shadow-gray-600/50', text: 'text-gray-400', bar: 'bg-gradient-to-t from-gray-600 to-gray-500' };
      case 'slow':
        return { bg: 'bg-blue-500', glow: 'shadow-blue-500/50', text: 'text-blue-400', bar: 'bg-gradient-to-t from-blue-500 to-cyan-400' };
      case 'moderate':
        return { bg: 'bg-yellow-500', glow: 'shadow-yellow-500/50', text: 'text-yellow-400', bar: 'bg-gradient-to-t from-yellow-500 to-orange-400' };
      case 'busy':
        return { bg: 'bg-orange-500', glow: 'shadow-orange-500/50', text: 'text-orange-400', bar: 'bg-gradient-to-t from-orange-500 to-red-400' };
      case 'packed':
        return { bg: 'bg-red-500', glow: 'shadow-red-500/50', text: 'text-red-400', bar: 'bg-gradient-to-t from-red-500 via-pink-500 to-rose-400' };
      default:
        return { bg: 'bg-gray-600', glow: 'shadow-gray-600/50', text: 'text-gray-400', bar: 'bg-gradient-to-t from-gray-600 to-gray-500' };
    }
  };

  const getCrowdHeight = (level: string) => {
    switch (level) {
      case 'dead':
        return 'h-12';
      case 'slow':
        return 'h-20';
      case 'moderate':
        return 'h-28';
      case 'busy':
        return 'h-36';
      case 'packed':
        return 'h-44';
      default:
        return 'h-12';
    }
  };

  const getCrowdLabel = (level: string) => {
    switch (level) {
      case 'dead':
        return '💤';
      case 'slow':
        return '🌙';
      case 'moderate':
        return '📊';
      case 'busy':
        return '🔥';
      case 'packed':
        return '🚀';
      default:
        return '?';
    }
  };

  // Handle drag
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const newOffset = dragOffset + e.movementX;
    // Limit drag range
    setDragOffset(Math.max(-300, Math.min(300, newOffset)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-6">
      <style>{`
        @keyframes neon-glow {
          0%, 100% {
            text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
          }
          50% {
            text-shadow: 0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor;
          }
        }
        .neon-text {
          animation: neon-glow 2s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
          }
          50% {
            box-shadow: 0 0 20px currentColor, 0 0 30px currentColor;
          }
        }
        .pulse-bar {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .draggable-container {
          cursor: grab;
          user-select: none;
          transition: transform 0.1s ease-out;
        }
        .draggable-container:active {
          cursor: grabbing;
        }
      `}</style>

      <div>
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <span className="text-lg animate-pulse">📊</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-pink-500 to-brand neon-text">
            Popular Times
          </span>
        </h3>

        {/* Horizontal Draggable Chart */}
        <div 
          ref={containerRef}
          className="border border-neutral-700 rounded-lg bg-neutral-900/50 p-6 overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="draggable-container flex items-end justify-center gap-6 h-56 px-4"
            style={{
              transform: `translateX(${dragOffset}px)`,
              minWidth: 'max-content',
            }}
          >
            {days.map((day) => {
              const dayData = completeBusyData[day];
              if (!dayData) return null;

              const colors = getCrowdColor(dayData.crowdLevel);
              const height = getCrowdHeight(dayData.crowdLevel);
              const isSelected = selectedDay === day;

              return (
                <div
                  key={day}
                  className="flex flex-col items-center gap-2 cursor-pointer group"
                  onClick={() => setSelectedDay(isSelected ? null : day)}
                >
                  {/* Label at top */}
                  <div className={`text-xs font-semibold transition ${isSelected ? 'text-brand' : 'text-neutral-400 group-hover:text-brand'}`}>
                    {day.slice(0, 3)}
                  </div>

                  {/* Bar growing upward */}
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-12 rounded-t-lg transition-all duration-500 border-2 ${isSelected ? `${colors.glow} border-current pulse-bar` : 'border-transparent'} ${colors.bar}`}
                      style={{
                        height: `${height.match(/\d+/)?.[0] || 48}px`,
                      }}
                    />
                  </div>

                  {/* Emoji indicator */}
                  <div className={`text-lg transition ${isSelected ? 'scale-125' : 'scale-100'}`}>
                    {getCrowdLabel(dayData.crowdLevel)}
                  </div>

                  {/* Info tooltip on hover/select */}
                  {isSelected && (
                    <div className={`mt-2 p-3 rounded-lg text-xs bg-neutral-800 border border-neutral-600 whitespace-nowrap shadow-lg ${colors.glow}`}>
                      <div className={`font-bold ${colors.text}`}>{dayData.startTime} - {dayData.endTime}</div>
                      <div className="text-neutral-400 capitalize">{dayData.crowdLevel}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Drag instruction */}
        <p className="text-xs text-neutral-500 mt-3 text-center">👆 Drag horizontally to scroll</p>
      </div>


      {/* Legend */}
      <div className="pt-4 border-t border-neutral-700/50">
        <p className="text-xs font-semibold text-neutral-400 mb-3">Crowd Levels:</p>
        <div className="flex flex-wrap gap-4">
          {[
            { level: 'dead', label: 'Dead', emoji: '💤', color: getCrowdColor('dead') },
            { level: 'slow', label: 'Slow', emoji: '🌙', color: getCrowdColor('slow') },
            { level: 'moderate', label: 'Moderate', emoji: '📊', color: getCrowdColor('moderate') },
            { level: 'busy', label: 'Busy', emoji: '🔥', color: getCrowdColor('busy') },
            { level: 'packed', label: 'Packed', emoji: '🚀', color: getCrowdColor('packed') },
          ].map(({ level, label, emoji, color }) => (
            <div key={level} className="flex items-center gap-2">
              <div className={`w-4 h-12 rounded-sm ${color.bar} shadow-lg`} />
              <span className="text-xs text-neutral-400">{label} {emoji}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tip */}
      <div className="mt-4 pt-4 border-t border-neutral-700/50">
        <p className="text-xs font-semibold text-neutral-400 mb-2">💡 Tip:</p>
        <p className="text-xs text-neutral-500">Taller bars = busier! Click a day to see exact peak hours. Drag to see all days.</p>
      </div>
    </div>
  );
}
