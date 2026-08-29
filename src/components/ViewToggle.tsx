import React from 'react';
import { useApp } from '../context/AppContext';
import { Map, List } from 'lucide-react';

export const ViewToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { activeView, setActiveView } = useApp();

  return (
    <div className={`bg-zinc-800/50 backdrop-blur-md p-1 rounded-xl border border-zinc-700/60 flex items-center shadow-lg ${className}`}>
      <button
        onClick={() => setActiveView('map')}
        className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          activeView === 'map'
            ? 'bg-red-700 text-white shadow-md'
            : 'text-zinc-400 hover:text-white'
        }`}
      >
        <Map className="w-3.5 h-3.5" />
        <span>Map</span>
      </button>
      <button
        onClick={() => setActiveView('list')}
        className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          activeView === 'list'
            ? 'bg-red-700 text-white shadow-md'
            : 'text-zinc-400 hover:text-white'
        }`}
      >
        <List className="w-3.5 h-3.5" />
        <span>List</span>
      </button>
    </div>
  );
};
