'use client';

import { Venue } from '@/lib/data';

export function BusyTimesChart({ venue }: { venue: Venue }) {
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
        return 'bg-neutral-600';
      case 'slow':
        return 'bg-blue-500';
      case 'moderate':
        return 'bg-yellow-500';
      case 'busy':
        return 'bg-orange-500';
      case 'packed':
        return 'bg-red-500';
      default:
        return 'bg-neutral-600';
    }
  };

  const getCrowdLabel = (level: string) => {
    switch (level) {
      case 'dead':
        return 'Dead';
      case 'slow':
        return 'Slow';
      case 'moderate':
        return 'Moderate';
      case 'busy':
        return 'Busy';
      case 'packed':
        return 'Packed';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="mt-6 p-4 bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-lg border border-neutral-700">
      <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
        <span className="text-lg">📊</span>
        Popular Times
      </h3>
      
      <div className="space-y-3">
        {days.map((day) => {
          const dayData = busyData[day];
          if (!dayData) return null;

          return (
            <div key={day} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-neutral-300 w-20">{day}</span>
                <div className="flex-1 mx-3">
                  <div className="h-2 bg-neutral-700 rounded-full overflow-hidden relative">
                    <div
                      className={`h-full ${getCrowdColor(dayData.crowdLevel)} rounded-full transition-all duration-500 group-hover:shadow-lg group-hover:shadow-current`}
                      style={{
                        width: dayData.crowdLevel === 'dead' ? '15%' : 
                               dayData.crowdLevel === 'slow' ? '35%' :
                               dayData.crowdLevel === 'moderate' ? '55%' :
                               dayData.crowdLevel === 'busy' ? '75%' : '100%',
                      }}
                    />
                  </div>
                </div>
                <span className="text-xs text-neutral-400 w-12 text-right">{getCrowdLabel(dayData.crowdLevel)}</span>
              </div>
              <div className="text-xs text-neutral-500 ml-20 opacity-0 group-hover:opacity-100 transition-opacity">
                {dayData.startTime} - {dayData.endTime}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-neutral-700">
        <div className="grid grid-cols-5 gap-2 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-neutral-600 rounded-full" />
            <span>Dead</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span>Slow</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span>Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full" />
            <span>Busy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span>Packed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
