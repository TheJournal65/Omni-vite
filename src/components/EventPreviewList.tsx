import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Sparkles } from 'lucide-react';

export const EventPreviewList: React.FC = () => {
  const { filteredEvents, buildings, setSelectedBuildingForMapFocus } = useApp();

  if (filteredEvents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center px-4 py-10 text-zinc-500">
        <Sparkles className="w-6 h-6 mb-2" />
        <p className="text-xs italic">No events match your current filters.</p>
      </div>
    );
  }

  return (
    <div className="max-h-[50vh] overflow-y-auto p-3 space-y-2 scrollbar-none">
      {filteredEvents.map(event => {
        const isCollege = event.organizerType === 'college';

        return (
          <button
            key={event.id}
            onClick={() => {
              const building = buildings.find(b => b.id === event.buildingId);
              if (building) setSelectedBuildingForMapFocus(building);
            }}
            className="w-full flex items-stretch gap-3 bg-zinc-900/40 backdrop-blur-md hover:bg-zinc-900/60 border border-zinc-800/50 hover:border-red-500/40 rounded-xl overflow-hidden shadow-lg transition-all text-left group"
          >
            <div className="w-24 h-20 shrink-0 relative bg-zinc-800 overflow-hidden">
              {event.coverImage ? (
                <img
                  src={event.coverImage}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl bg-gradient-to-tr from-zinc-900 to-zinc-800">
                  {isCollege ? '🏛️' : '🎉'}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 py-2 pr-3 flex flex-col justify-center gap-1">
              <span
                className={`self-start text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  isCollege
                    ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                    : 'bg-white/10 text-zinc-200 border border-white/25'
                }`}
              >
                {isCollege ? 'College' : 'Student'}
              </span>
              <h4 className="text-xs font-bold text-white truncate leading-snug">
                {event.title}
              </h4>
              <span className="flex items-center gap-1 text-[11px] text-red-400 font-medium">
                <MapPin className="w-3 h-3 shrink-0" /> {event.distanceMiles} mi away
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
