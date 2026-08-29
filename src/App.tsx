import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { MapView } from './components/MapView';
import { ListView } from './components/ListView';
import { CreateEventModal } from './components/CreateEventModal';
import { UserProfileModal } from './components/UserProfileModal';
import { CoSignModal } from './components/CoSignModal';
import { ShieldCheck } from 'lucide-react';

const DashboardContent: React.FC = () => {
  const { activeView, user, filteredEvents } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-red-500 selection:text-white">
      {/* Navigation */}
      <Navbar />

      {/* Main View Area (each view renders its own FilterBar placement) */}
      <main className="flex-1 flex flex-col min-h-0">
        {activeView === 'map' ? <MapView /> : <ListView />}
      </main>

      {/* Footer / Demo Notes */}
      <footer className="bg-zinc-900/80 border-t border-zinc-800 text-xs py-3 px-4 text-zinc-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-300">Omni-vite</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-red-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> .edu student verified
            </span>
            <span>•</span>
            <span>Campus: <strong className="text-zinc-200">{user.college}</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-zinc-400">
              Showing {filteredEvents.length} events near {user.currentLocationName}
            </span>
            <span className="text-zinc-600">|</span>
            <span className="font-medium text-zinc-300">WashU Hackathon 2026</span>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <CreateEventModal />
      <UserProfileModal />
      <CoSignModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
};

export default App;

