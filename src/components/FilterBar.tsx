import React from 'react';
import { useApp } from '../context/AppContext';
import { ALL_CATEGORIES } from '../data/initialData';
import { 
  Building2, 
  Users, 
  Sparkles, 
  SlidersHorizontal, 
  MapPin, 
  Clock 
} from 'lucide-react';

export const FilterBar: React.FC = () => {
  const {
    selectedOrganizerType,
    setSelectedOrganizerType,
    selectedCategories,
    toggleCategory,
    resetCategoryFilter,
    user,
    sortBy,
    setSortBy,
    maxDistance,
    setMaxDistance,
    filteredEvents,
    pendingCosignEvents,
    setActiveCosignModalEvent,
  } = useApp();

  return (
    <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3.5 space-y-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        
        {/* Organizer Type Selector (All vs College-Run vs Student-Run) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-800/90 rounded-xl border border-slate-700/80 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setSelectedOrganizerType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedOrganizerType === 'all'
                ? 'bg-slate-700 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Events ({filteredEvents.length})
          </button>
          
          <button
            onClick={() => setSelectedOrganizerType('college')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedOrganizerType === 'college'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>College-Run</span>
          </button>
          
          <button
            onClick={() => setSelectedOrganizerType('student')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedOrganizerType === 'student'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span>Student-Run</span>
          </button>
        </div>

        {/* Distance Slider & Sort Control */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end text-xs">
          
          {/* Max Distance Slider */}
          <div className="flex items-center gap-2 bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-700/70">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">Radius:</span>
            <input
              type="range"
              min="0.1"
              max="5.0"
              step="0.1"
              value={maxDistance}
              onChange={e => setMaxDistance(parseFloat(e.target.value))}
              className="w-20 accent-emerald-500 cursor-pointer"
            />
            <span className="font-semibold text-slate-200 min-w-[3rem]">
              {maxDistance >= 5 ? '5+ mi' : `${maxDistance} mi`}
            </span>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-700/70">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="distance" className="bg-slate-800">Nearest First</option>
              <option value="cosigners" className="bg-slate-800">Most Popular (Co-Signs)</option>
              <option value="time" className="bg-slate-800">Recently Added</option>
            </select>
          </div>

          {/* Pending Co-Signs Notification Pill */}
          {pendingCosignEvents.length > 0 && (
            <button
              onClick={() => setActiveCosignModalEvent(pendingCosignEvents[0])}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-all text-xs font-semibold animate-pulse"
              title="Student events waiting for 10 co-signers"
            >
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{pendingCosignEvents.length} Gathering Co-Signs</span>
            </button>
          )}

        </div>

      </div>

      {/* Category Chips with Personalized Filter Toggle */}
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
        
        {/* Reset / My Preferences button */}
        <button
          onClick={resetCategoryFilter}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-semibold whitespace-nowrap transition-all shadow-sm"
          title={`Default categories matching ${user.name}'s profile`}
        >
          <Sparkles className="w-3 h-3 text-emerald-400" />
          <span>My AI Matches</span>
        </button>

        <div className="h-4 w-px bg-slate-700 shrink-0" />

        {ALL_CATEGORIES.map(category => {
          const isSelected = selectedCategories.includes(category);
          const isUserFavorite = user.favoriteCategories.includes(category);

          return (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-slate-100 text-slate-900 font-semibold shadow-md'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700/50'
              }`}
            >
              {isUserFavorite && !isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" title="Matches your profile" />
              )}
              {category}
            </button>
          );
        })}

        {selectedCategories.length === 0 && (
          <span className="text-xs text-slate-500 italic pl-1 whitespace-nowrap">
            (Showing all categories)
          </span>
        )}
      </div>

    </div>
  );
};

