'use client';

import { Venue } from '@/lib/data';
import { useState } from 'react';

export function BusyTimesChart({ venue }: { venue: Venue }) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  
  if (!venue.busyTimes || venue.busyTimes.length === 0) {
    return null;
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const busyData = venue.busyTimes.reduce((acc, bt) => {
    acc[bt.day] = bt;
    return acc;
  }, {} as Record<string, typeof venue.busyTimes[0]>);

  const getCrowdColor = (level: string) => {
    switch (level) {
      case 'dead':
        return { bg: 'bg-gray-600', glow: 'shadow-gray-600/50', text: 'text-gray-400', bar: 'bg-gradient-to-r from-gray-600 to-gray-500' };
      case 'slow':
        return { bg: 'bg-blue-500', glow: 'shadow-blue-500/50', text: 'text-blue-400', bar: 'bg-gradient-to-r from-blue-500 to-cyan-400' };
      case 'moderate':
        return { bg: 'bg-yellow-500', glow: 'shadow-yellow-500/50', text: 'text-yellow-400', bar: 'bg-gradient-to-r from-yellow-500 to-orange-400' };
      case 'busy':
        return { bg: 'bg-orange-500', glow: 'shadow-orange-500/50', text: 'text-orange-400', bar: 'bg-gradient-to-r from-orange-500 to-red-400' };
      case 'packed':
        return { bg: 'bg-red-500', glow: 'shadow-red-500/50', text: 'text-red-400', bar: 'bg-gradient-to-r from-red-500 via-pink-500 to-rose-400' };
      default:
        return { bg: 'bg-gray-600', glow: 'shadow-gray-600/50', text: 'text-gray-400', bar: 'bg-gradient-to-r from-gray-600 to-gray-500' };
    }
  };

  const getCrowdLabel = (level: string) => {
    switch (level) {
      case 'dead':
        return 'Dead 💤';
      case 'slow':
        return 'Slow 🌙';
      case 'moderate':
        return 'Moderate 📊';
      case 'busy':
        return 'Busy 🔥';
      case 'packed':
        return 'Packed 🚀';
      default:
        return 'Unknown';
    }
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
            box-shadow: inset 0 0 10px currentColor, 0 0 20px currentColor;
          }
          50% {
            box-shadow: inset 0 0 20px currentColor, 0 0 30px currentColor;
          }
        }
        .pulse-bar {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      <div>
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <span className="text-lg animate-pulse">📊</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-pink-500 to-brand neon-text">
            Popular Times
          </span>
        </h3>
        
        <div className="space-y-4">
          {days.map((day) => {
            const dayData = busyData[day];
            if (!dayData) return null;

            const colors = getCrowdColor(dayData.crowdLevel);
            const width = dayData.crowdLevel === 'dead' ? '15%' : 
                         dayData.crowdLevel === 'slow' ? '35%' :
                         dayData.crowdLevel === 'moderate' ? '55%' :
                         dayData.crowdLevel === 'busy' ? '75%' : '100%';
            
            const isSelected = selectedDay === day;

            return (
              <div 
                key={day} 
                className="group cursor-pointer"
                onClick={() => setSelectedDay(isSelected ? null : day)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${isSelected ? 'text-brand' : 'text-neutral-300'} transition w-20`}>
                    {day}
                  </span>
                  <div className="flex-1 mx-3">
                    <div className={`h-3 bg-neutral-800 rounded-full overflow-hidden border border-neutral-700 transition ${isSelected ? 'border-brand shadow-lg shadow-brand/50' : 'group-hover:border-brand/50'}`}>
                      <div
                        className={`h-full ${colors.bar} rounded-full transition-all duration-500 ${isSelected ? 'pulse-bar' : ''}`}
                        style={{
                          width: width,
                        }}
                      />
                    </div>
                  </div>
                  <div className={`text-xs font-semibold ${colors.text} text-right w-16 transition`}>
                    {getCrowdLabel(dayData.crowdLevel)}
                  </div>
                </div>
                
                {/* Expanded Details */}
                {isSelected && (
                  <div className={`ml-20 mt-3 p-3 rounded-lg border ${colors.glow} border-transparent bg-gradient-to-r from-neutral-900/50 to-neutral-800/50 shadow-lg ${colors.glow}`}>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-400">Peak Hours:</span>
                        <span className={`text-sm font-bold ${colors.text}`}>
                          {dayData.startTime} - {dayData.endTime}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-400">Crowd Level:</span>
                        <span className={`text-sm font-bold capitalize ${colors.text}`}>
                          {dayData.crowdLevel}
                        </span>
                      </div>
                      <div className="h-1 bg-neutral-700 rounded-full overflow-hidden mt-2">
                        <div
                          className={`h-full ${colors.bar}`}
                          style={{
                            width: width,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="pt-4 border-t border-neutral-700/50">
        <p className="text-xs font-semibold text-neutral-400 mb-3">Crowd Levels:</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { level: 'dead', label: 'Dead 💤', color: getCrowdColor('dead') },
            { level: 'slow', label: 'Slow 🌙', color: getCrowdColor('slow') },
            { level: 'moderate', label: 'Moderate 📊', color: getCrowdColor('moderate') },
            { level: 'busy', label: 'Busy 🔥', color: getCrowdColor('busy') },
            { level: 'packed', label: 'Packed 🚀', color: getCrowdColor('packed') },
          ].map(({ level, label, color }) => (
            <div key={level} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${color.bg} ${color.glow} shadow-lg`} />
              <span className="text-xs text-neutral-400">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Current Status */}
      <div className="mt-4 pt-4 border-t border-neutral-700/50">
        <p className="text-xs font-semibold text-neutral-400 mb-2">💡 Tip:</p>
        <p className="text-xs text-neutral-500">Click any day to see detailed peak hours and crowd levels. Visit during slower times for a chill vibe, or come packed if you want energy!</p>
      </div>
    </div>
  );
}
