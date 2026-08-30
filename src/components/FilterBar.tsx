import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { ALL_CATEGORIES } from '../data/initialData';
import {
  Building2,
  Users,
  Sparkles,
  SlidersHorizontal,
  MapPin,
  Clock,
  ChevronDown,
  Check,
} from 'lucide-react';

type FilterBarVariant = 'bar' | 'floating' | 'sidebar' | 'drawer';

export const FilterBar: React.FC<{ variant?: FilterBarVariant }> = ({ variant = 'bar' }) => {
  const isFloating = variant === 'floating';
  const isDrawer = variant === 'drawer';
  const isSidebar = variant === 'sidebar' || isDrawer;
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

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
        setIsCategoryOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const SORT_OPTIONS: { value: 'distance' | 'cosigners' | 'time'; label: string }[] = [
    { value: 'distance', label: 'Nearest First' },
    { value: 'cosigners', label: 'Most Popular (Co-Signs)' },
    { value: 'time', label: 'Recently Added' },
  ];

  // Organizer Type Selector (All vs College-Run vs Student-Run)
  const organizerTabs = (
    <div className={`flex gap-1.5 p-1 rounded-xl border ${
      isDrawer ? 'bg-white/[0.06] backdrop-blur-xl border-white/10' : 'bg-zinc-800/90 border-zinc-700/80'
    } ${
      isSidebar ? 'flex-col w-full' : `items-center overflow-x-auto ${isFloating ? '' : 'w-full sm:w-auto'}`
    }`}>
      <button
        onClick={() => setSelectedOrganizerType('all')}
        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
          selectedOrganizerType === 'all'
            ? 'bg-zinc-700 text-white shadow'
            : 'text-zinc-400 hover:text-zinc-200'
        }`}
      >
        All Events ({filteredEvents.length})
      </button>

      <button
        onClick={() => setSelectedOrganizerType('college')}
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
          selectedOrganizerType === 'college'
            ? 'bg-red-500/20 text-red-400 border border-red-500/40 shadow-sm'
            : 'text-zinc-400 hover:text-zinc-200'
        }`}
      >
        <Building2 className="w-3.5 h-3.5 text-red-400" />
        <span>College-Run</span>
      </button>

      <button
        onClick={() => setSelectedOrganizerType('student')}
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
          selectedOrganizerType === 'student'
            ? 'bg-white/10 text-zinc-100 border border-white/30 shadow-sm'
            : 'text-zinc-400 hover:text-zinc-200'
        }`}
      >
        <Users className="w-3.5 h-3.5 text-zinc-300" />
        <span>Student-Run</span>
      </button>
    </div>
  );

  // Max Distance Slider
  const radiusControl = (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${
      isDrawer ? 'bg-white/[0.05] backdrop-blur-xl border-white/10' : 'bg-zinc-800/60 border-zinc-700/70'
    } ${isSidebar ? 'w-full' : ''}`}>
      <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
      <span className="text-zinc-400">Radius:</span>
      <input
        type="range"
        min="0.1"
        max="5.0"
        step="0.1"
        value={maxDistance}
        onChange={e => setMaxDistance(parseFloat(e.target.value))}
        className={`accent-red-500 cursor-pointer ${isSidebar ? 'flex-1' : 'w-20'}`}
      />
      <span className="font-semibold text-zinc-200 min-w-[3rem] text-right">
        {maxDistance >= 5 ? '5+ mi' : `${maxDistance} mi`}
      </span>
    </div>
  );

  // Sort By Dropdown
  const sortControl = (
    <div className={`relative ${isSidebar ? 'w-full' : ''}`} ref={sortRef}>
      <button
        onClick={() => setIsSortOpen(open => !open)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs whitespace-nowrap transition-all ${
          isDrawer ? 'bg-white/[0.05] backdrop-blur-xl border-white/10' : 'bg-zinc-800/60 border-zinc-700/70'
        } ${isSidebar ? 'w-full justify-between' : ''}`}
      >
        <span className="flex items-center gap-2 min-w-0">
          <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <span className="text-zinc-400">Sort:</span>
          <span className="text-zinc-200 font-semibold truncate">
            {SORT_OPTIONS.find(o => o.value === sortBy)?.label}
          </span>
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 shrink-0 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
      </button>

      {isSortOpen && (
        <div className={`left-0 rounded-xl border shadow-xl z-30 p-1.5 ${
          isDrawer ? 'border-white/10 bg-zinc-950/35 backdrop-blur-2xl' : 'border-zinc-700/80 bg-zinc-800'
        } ${isSidebar ? 'w-full' : 'w-56'} ${
          isDrawer ? 'relative mt-2' : `absolute ${isFloating ? 'bottom-full mb-2' : 'top-full mt-2'}`
        }`}>
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => {
                setSortBy(opt.value);
                setIsSortOpen(false);
              }}
              className={`w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                sortBy === opt.value
                  ? 'bg-zinc-100 text-zinc-900 font-semibold'
                  : 'text-zinc-300 hover:bg-zinc-700/70'
              }`}
            >
              <span>{opt.label}</span>
              {sortBy === opt.value && <Check className="w-3.5 h-3.5 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  // Pending Co-Signs Notification Pill
  const pendingPill = pendingCosignEvents.length > 0 && (
    <button
      onClick={() => setActiveCosignModalEvent(pendingCosignEvents[0])}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-all text-xs font-semibold animate-pulse ${isSidebar ? 'w-full justify-center' : ''}`}
      title="Student events waiting for 10 co-signers"
    >
      <Clock className="w-3.5 h-3.5 text-amber-400" />
      <span>{pendingCosignEvents.length} Gathering Co-Signs</span>
    </button>
  );

  // Quick AI-match action + collapsible category dropdown
  const categorySection = (
    <div className={`flex gap-2 ${isSidebar ? 'flex-col items-stretch' : `items-center flex-wrap ${isFloating ? '' : 'max-w-7xl mx-auto'}`}`}>
      <button
        onClick={resetCategoryFilter}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/40 text-red-300 text-xs font-semibold whitespace-nowrap transition-all shadow-sm ${isSidebar ? 'w-full justify-center' : ''}`}
        title={`Default categories matching ${user.name}'s profile`}
      >
        <Sparkles className="w-3 h-3 text-red-400" />
        <span>My AI Matches</span>
      </button>

      <div className={isSidebar ? 'w-full h-px bg-zinc-700' : 'h-4 w-px bg-zinc-700 shrink-0'} />

      <div className={`relative ${isSidebar ? 'w-full' : ''}`} ref={categoryRef}>
        <button
          onClick={() => setIsCategoryOpen(open => !open)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${isSidebar ? 'w-full justify-between' : ''} ${
            selectedCategories.length > 0
              ? 'bg-zinc-100 text-zinc-900 font-semibold shadow-md'
              : 'bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-700/50'
          }`}
        >
          <span>
            {selectedCategories.length === 0
              ? 'All Categories'
              : `Categories (${selectedCategories.length})`}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
        </button>

        {isCategoryOpen && (
          <div className={`left-0 max-h-80 overflow-y-auto rounded-xl border shadow-xl z-30 p-1.5 ${
            isDrawer ? 'border-white/10 bg-zinc-950/35 backdrop-blur-2xl' : 'border-zinc-700/80 bg-zinc-800'
          } ${isSidebar ? 'w-full' : 'w-64'} ${
            isDrawer ? 'relative mt-2' : `absolute ${isFloating ? 'bottom-full mb-2' : 'top-full mt-2'}`
          }`}>
            {ALL_CATEGORIES.map(category => {
              const isSelected = selectedCategories.includes(category);
              const isUserFavorite = user.favoriteCategories.includes(category);

              return (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-zinc-100 text-zinc-900 font-semibold'
                      : 'text-zinc-300 hover:bg-zinc-700/70'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {isUserFavorite && !isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" title="Matches your profile" />
                    )}
                    {category}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {selectedCategories.length === 0 && (
        <span className="text-xs text-zinc-500 italic pl-1 whitespace-nowrap">
          (Showing all categories)
        </span>
      )}
    </div>
  );

  if (isFloating) {
    return (
      <div className="w-fit max-w-[min(1100px,94vw)] flex flex-col gap-2.5 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-2xl shadow-lg p-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {organizerTabs}
          {radiusControl}
          {sortControl}
          {pendingPill}
        </div>
        {categorySection}
      </div>
    );
  }

  if (isSidebar) {
    return (
      <div className={`w-full shrink-0 flex flex-col gap-4 text-xs ${
        isDrawer
          ? ''
          : 'lg:w-64 pb-6 border-b border-zinc-800 lg:pb-0 lg:border-b-0 lg:border-r lg:pr-6 lg:border-zinc-800'
      }`}>
        {organizerTabs}
        <div className="flex flex-col gap-2">
          {radiusControl}
          {sortControl}
          {pendingPill}
        </div>
        {categorySection}
      </div>
    );
  }

  return (
    <div className="bg-zinc-900/60 border-b border-zinc-800/80 px-4 sm:px-6 lg:px-8 py-3.5 space-y-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {organizerTabs}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end text-xs">
          {radiusControl}
          {sortControl}
          {pendingPill}
        </div>
      </div>
      {categorySection}
    </div>
  );
};
