import React from 'react';
import { useApp } from '../context/AppContext';
import { FilterBar } from './FilterBar';
import { ViewToggle } from './ViewToggle';
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

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col lg:flex-row items-start gap-6">
        <FilterBar variant="sidebar" />

        <div className="flex-1 min-w-0 w-full">
          <div className="flex items-center justify-between gap-3 mb-5">
            <p className="text-xs text-zinc-400">
              Showing <span className="text-zinc-200 font-semibold">{filteredEvents.length}</span> events
            </p>
            <ViewToggle />
          </div>

          {filteredEvents.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mx-auto mb-4 text-zinc-400">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">No events match your current filters</h3>
              <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6">
                Try expanding your search radius, selecting different category tags, or clearing your search term.
              </p>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEvents.map(event => {
          const isCollege = event.organizerType === 'college';
          const isPending = !event.isPublished;

          return (
            <div
              key={event.id}
              className="bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700/80 rounded-2xl overflow-hidden shadow-lg transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Event Image Banner / Category Header */}
                <div className="relative h-44 w-full bg-zinc-800 overflow-hidden">
                  {event.coverImage ? (
                    <img
                      src={event.coverImage}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-zinc-900 to-zinc-800 flex items-center justify-center text-4xl">
                      {isCollege ? '🏛️' : '🎉'}
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                  {/* Badges on top of image */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-md ${
                        isCollege
                          ? 'bg-red-950/80 text-red-300 border border-red-500/50'
                          : 'bg-zinc-900/80 text-zinc-100 border border-white/30'
                      }`}
                    >
                      {isCollege ? '🏛️ College-Run' : '🎓 Student-Run'}
                    </span>

                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-zinc-900/80 backdrop-blur-md text-red-400 border border-red-500/30 flex items-center gap-1 shadow-md">
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
                  <h3 className="font-extrabold text-base text-white mb-2 leading-snug group-hover:text-red-400 transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-xs text-zinc-300 line-clamp-3 mb-4 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Time and Location details */}
                  <div className="space-y-1.5 text-xs text-zinc-400 bg-zinc-800/50 p-3 rounded-xl border border-zinc-800 mb-4">
                    <div className="flex items-center gap-2 text-zinc-200">
                      <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span className="truncate font-medium">{event.locationName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-300">
                      <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span>{event.dateTime}</span>
                    </div>
                    <div className="text-[11px] text-zinc-400 pt-1 border-t border-zinc-700/50 truncate">
                      Hosted by: <span className="text-zinc-300 font-medium">{event.organizerName}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {event.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 border border-zinc-700/40"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Co-Signers Status Bar (for student events) */}
                  {!isCollege && (
                    <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/20 mb-4">
                      <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                        <span className="text-red-200">Student Co-Signers</span>
                        <span className="text-red-400 font-mono">
                          {event.cosignersCount} / 10 required
                        </span>
                      </div>
                      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-700 via-red-500 to-red-400 rounded-full transition-all duration-500"
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
                        <div className="flex items-center gap-1.5 text-[11px] text-red-400 mt-2 font-medium">
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
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30 cursor-default'
                        : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-950/50 active:scale-95'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>{event.cosignedByMe ? 'Co-Signed' : 'Co-Sign Event'}</span>
                  </button>
                )}

                <button
                  onClick={() => handleShowOnMap(event.buildingId)}
                  className="py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl border border-zinc-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
                  title="View on Map"
                >
                  <Map className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Map</span>
                </button>

                <button
                  onClick={() => setActiveCosignModalEvent(event)}
                  className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl border border-zinc-700 transition-all"
                  title="Share / Invite Co-signers"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
            })}
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

