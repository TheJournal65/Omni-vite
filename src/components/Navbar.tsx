import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  PlusCircle,
  User,
  Search,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    user,
    searchQuery,
    setSearchQuery,
    setIsCreateModalOpen,
    setIsProfileModalOpen
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 via-red-500 to-red-400 flex items-center justify-center shadow-lg shadow-red-900/30 ring-1 ring-white/20">
              <Compass className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-zinc-100 to-red-300 bg-clip-text text-transparent">
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
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Create Event Button */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-red-950/50 transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Post Event</span>
              <span className="sm:hidden">Post</span>
            </button>

            {/* User Profile Icon */}
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="p-1.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 border border-zinc-700/80 transition-all hover:border-zinc-600"
              title={`${user.name} — Edit Profile & Preferences`}
            >
              <div className="w-7 h-7 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center font-bold text-xs">
                <User className="w-4 h-4" />
              </div>
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
  );
};
