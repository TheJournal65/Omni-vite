import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ALL_CATEGORIES } from '../data/initialData';
import { EventCategory } from '../types';
import { 
  X, 
  User, 
  GraduationCap, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  Check, 
  AlertCircle
} from 'lucide-react';

const COLLEGES_LIST = [
  'Washington University in St. Louis',
  'Saint Louis University (SLU)',
  'University of Missouri - St. Louis (UMSL)',
  'Fontbonne University',
  'Webster University'
];

export const UserProfileModal: React.FC = () => {
  const { isProfileModalOpen, setIsProfileModalOpen, user, setUser, buildings } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [college, setCollege] = useState(user.college);
  const [preferencesDescription, setPreferencesDescription] = useState(user.preferencesDescription);
  const [favoriteCategories, setFavoriteCategories] = useState<EventCategory[]>(user.favoriteCategories);
  const [selectedBuildingId, setSelectedBuildingId] = useState(
    buildings.find(b => b.name.includes(user.currentLocationName))?.id || buildings[0].id
  );
  const [emailError, setEmailError] = useState('');

  if (!isProfileModalOpen) return null;

  const toggleCategory = (cat: EventCategory) => {
    setFavoriteCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim().toLowerCase().endsWith('.edu')) {
      setEmailError('Omni-vite requires a verified student email address ending with .edu');
      return;
    }

    const currentBuilding = buildings.find(b => b.id === selectedBuildingId) || buildings[0];

    setUser({
      name: name.trim() || 'Alex Chen',
      email: email.trim().toLowerCase(),
      college,
      preferencesDescription,
      favoriteCategories,
      currentLocationName: currentBuilding.shortName,
      userCoords: {
        lat: currentBuilding.lat,
        lng: currentBuilding.lng,
      },
    });

    setIsProfileModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-800/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white">Student Profile & AI Preferences</h2>
              <p className="text-xs text-zinc-400">Personalize your campus event radar</p>
            </div>
          </div>

          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Name & Email (.edu enforced) */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>Student Email (.edu required)</span>
                <span className="text-[10px] text-red-400 font-normal flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Verified Student Access
                </span>
              </label>
              <input
                type="email"
                required
                placeholder="you@wustl.edu"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                }}
                className={`w-full bg-zinc-800 border rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 ${
                  emailError
                    ? 'border-red-500 focus:ring-red-500/50'
                    : 'border-zinc-700 focus:ring-red-500/50'
                }`}
              />
              {emailError && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {emailError}
                </p>
              )}
            </div>
          </div>

          {/* College Selection */}
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-red-400" />
              <span>Select College / Campus</span>
            </label>
            <select
              value={college}
              onChange={e => setCollege(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              {COLLEGES_LIST.map(c => (
                <option key={c} value={c} className="bg-zinc-900">
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Current Campus Spot (for distance calculation) */}
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>Current Campus Location (for Distance Sorting)</span>
            </label>
            <select
              value={selectedBuildingId}
              onChange={e => setSelectedBuildingId(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              {buildings.map(b => (
                <option key={b.id} value={b.id} className="bg-zinc-900">
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* AI Preferences Description */}
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>Describe Your Ideal Events</span>
            </label>
            <textarea
              rows={3}
              placeholder="e.g. I love casual late-night gaming, food trucks, spikeball tournaments, and hackathon project sessions."
              value={preferencesDescription}
              onChange={e => setPreferencesDescription(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 resize-none"
            />
            <p className="text-[11px] text-zinc-400 mt-1">
              Omni-vite uses this description to automatically match and prioritize what appears on your dashboard.
            </p>
          </div>

          {/* Category Chips */}
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
              Favorite Event Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {ALL_CATEGORIES.map(cat => {
                const isSelected = favoriteCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-red-700 text-white font-bold shadow-md'
                        : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:text-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Save */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(false)}
              className="px-4 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800 text-sm font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-600 text-white text-sm font-extrabold shadow-lg shadow-red-950/50 transition-all active:scale-95 flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

