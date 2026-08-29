import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Clock, 
  CheckCircle, 
  Share2, 
  ShieldAlert, 
  Sparkles,
  Map
} from 'lucide-react';

export const ListView: React.FC = () => {
  const {
    filteredEvents,
    cosignEvent,
    setActiveCosignModalEvent,
    setActiveView,
    setSelectedBuildingForMapFocus,
    buildings
  } = useApp();

  const handleShowOnMap = (buildingId: string) => {
    const building = buildings.find(b => b.id === buildingId);
    if (building) {
      setSelectedBuildingForMapFocus(building);
    }
    setActiveView('map');
  };

  if (filteredEvents.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-4 text-slate-400">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white mb-1">No events match your current filters</h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
          Try expanding your search radius, selecting different category tags, or clearing your search term.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => {
          const isCollege = event.organizerType === 'college';
          const isPending = !event.isPublished;

          return (
            <div
              key={event.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl overflow-hidden shadow-lg transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Event Image Banner / Category Header */}
                <div className="relative h-44 w-full bg-slate-800 overflow-hidden">
                  {event.coverImage ? (
                    <img
                      src={event.coverImage}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-slate-900 to-slate-800 flex items-center justify-center text-4xl">
                      {isCollege ? '🏛️' : '🎉'}
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Badges on top of image */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-md ${
                        isCollege
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50'
                          : 'bg-indigo-950/80 text-indigo-300 border border-indigo-500/50'
                      }`}
                    >
                      {isCollege ? '🏛️ College-Run' : '🎓 Student-Run'}
                    </span>

                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shadow-md">
                      <MapPin className="w-3 h-3" /> {event.distanceMiles} mi away
                    </span>
                  </div>

                  {/* Category Pill at bottom left of cover */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-white/15 backdrop-blur-md text-white border border-white/20">
                      {event.category}
                    </span>
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-5">
                  <h3 className="font-extrabold text-base text-white mb-2 leading-snug group-hover:text-emerald-400 transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Time and Location details */}
                  <div className="space-y-1.5 text-xs text-slate-400 bg-slate-800/50 p-3 rounded-xl border border-slate-800 mb-4">
                    <div className="flex items-center gap-2 text-slate-200">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate font-medium">{event.locationName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{event.dateTime}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-700/50 truncate">
                      Hosted by: <span className="text-slate-300 font-medium">{event.organizerName}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {event.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700/40"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Co-Signers Status Bar (for student events) */}
                  {!isCollege && (
                    <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 mb-4">
                      <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                        <span className="text-indigo-200">Student Co-Signers</span>
                        <span className="text-indigo-400 font-mono">
                          {event.cosignersCount} / 10 required
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 via-teal-400 to-emerald-400 rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(100, (event.cosignersCount / 10) * 100)}%`,
                          }}
                        />
                      </div>

                      {isPending ? (
                        <div className="flex items-center gap-1.5 text-[11px] text-amber-300 mt-2">
                          <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                          <span>Requires {10 - event.cosignersCount} more student signatures to go live!</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 mt-2 font-medium">
                          <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>Verified with 10+ campus signatures!</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Actions Card Footer */}
              <div className="px-5 pb-5 pt-0 flex items-center gap-2">
                {!isCollege && (
                  <button
                    onClick={() => cosignEvent(event.id)}
                    disabled={event.cosignedByMe}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      event.cosignedByMe
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-950/50 active:scale-95'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>{event.cosignedByMe ? 'Co-Signed' : 'Co-Sign Event'}</span>
                  </button>
                )}

                <button
                  onClick={() => handleShowOnMap(event.buildingId)}
                  className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
                  title="View on Map"
                >
                  <Map className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Map</span>
                </button>

                <button
                  onClick={() => setActiveCosignModalEvent(event)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-all"
                  title="Share / Invite Co-signers"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

