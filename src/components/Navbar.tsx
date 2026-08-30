import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useApp } from '../context/AppContext';
import { FilterBar } from './FilterBar';
import {
  Compass,
  Menu,
  PlusCircle,
  User,
  Search,
  Sparkles,
  X
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const filterPanelRef = useRef<HTMLDivElement>(null);
  const {
    user,
    searchQuery,
    setSearchQuery,
    setIsCreateModalOpen,
    setIsProfileModalOpen
  } = useApp();

  useEffect(() => {
    if (!isFilterMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      const isInsideTrigger = filterMenuRef.current?.contains(target);
      const isInsidePanel = filterPanelRef.current?.contains(target);
      if (!isInsideTrigger && !isInsidePanel) {
        setIsFilterMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsFilterMenuOpen(false);
    };

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isFilterMenuOpen]);

  const mobileFilterMenu = isFilterMenuOpen
    ? createPortal(
        <div
          id="mobile-filter-menu"
          className="fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto p-3 sm:p-6 bg-zinc-950/45 backdrop-blur-md lg:hidden"
          onClick={() => setIsFilterMenuOpen(false)}
        >
          <div
            ref={filterPanelRef}
            className="my-auto w-full max-w-md max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)] overflow-y-auto overscroll-contain p-2 sm:p-3"
            onClick={event => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="text-center flex-1 pl-8">
                <h2 className="text-base font-bold text-white">Filters</h2>
                <p className="text-xs text-zinc-400">Refine the events shown below</p>
              </div>
              <button
                type="button"
                onClick={() => setIsFilterMenuOpen(false)}
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
                aria-label="Close filters"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mx-auto w-full max-w-sm">
              <FilterBar variant="drawer" />
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
    <header className="sticky top-0 z-40 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800">
      <div className="px-2 min-[360px]:px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">

          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-gradient-to-tr from-red-600 via-red-500 to-red-400 flex items-center justify-center shadow-lg shadow-red-900/30 ring-1 ring-white/20">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-zinc-100 to-red-300 bg-clip-text text-transparent">
                  Omni-vite
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/30">
                  <Sparkles className="w-3 h-3" /> WashU '26
                </span>
              </div>
              <p className="text-xs text-zinc-400 hidden sm:block">Campus Event Discovery & Co-Signing</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search events, buildings, food, parties..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-800/80 border border-zinc-700 text-sm rounded-xl pl-10 pr-4 py-2 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons: Create, Profile */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0" ref={filterMenuRef}>

            {/* Create Event Button */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center justify-center gap-1.5 w-9 h-9 sm:w-auto sm:h-auto sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-red-950/50 transition-all active:scale-95"
              aria-label="Post an event"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Post Event</span>
            </button>

            {/* User Profile Icon */}
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="p-1 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 border border-zinc-700/80 transition-all hover:border-zinc-600"
              title={`${user.name} — Edit Profile & Preferences`}
            >
              <div className="w-7 h-7 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center font-bold text-xs">
                <User className="w-4 h-4" />
              </div>
            </button>

            {/* Mobile and tablet filters */}
            <button
              type="button"
              onClick={() => setIsFilterMenuOpen(open => !open)}
              className="lg:hidden w-9 h-9 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 border border-zinc-700/80 text-zinc-100 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-red-500/60"
              aria-label={isFilterMenuOpen ? 'Close filters' : 'Open filters'}
              aria-expanded={isFilterMenuOpen}
              aria-controls="mobile-filter-menu"
            >
              {isFilterMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search events, buildings, food..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-800/90 border border-zinc-700 text-sm rounded-xl pl-9 pr-3 py-2 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            />
          </div>
        </div>

      </div>
    </header>
    {mobileFilterMenu}
    </>
  );
};
