import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ALL_CATEGORIES } from '../data/initialData';
import { EventCategory, EventType } from '../types';
import { 
  X, 
  PlusCircle, 
  Building2, 
  Users, 
  Info
} from 'lucide-react';

export const CreateEventModal: React.FC = () => {
  const { isCreateModalOpen, setIsCreateModalOpen, buildings, createEvent, user } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [organizerType, setOrganizerType] = useState<EventType>('student');
  const [organizerName] = useState(user.name);
  const [buildingId, setBuildingId] = useState(buildings[0]?.id || 'duc');
  const [locationDetail, setLocationDetail] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [category, setCategory] = useState<EventCategory>('Party / Social');
  const [tagsInput, setTagsInput] = useState('Campus, Free Food, Social');
  const [coverImage] = useState(
    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'
  );

  if (!isCreateModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert('Please fill out the event title and description.');
      return;
    }

    const selectedBuilding = buildings.find(b => b.id === buildingId) || buildings[0];
    const fullLocationName = locationDetail.trim()
      ? `${selectedBuilding.shortName} - ${locationDetail.trim()}`
      : selectedBuilding.name;

    const parsedTags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    createEvent({
      title,
      description,
      organizerType,
      organizerName: organizerName.trim() || user.name,
      organizerEmail: user.email,
      buildingId: selectedBuilding.id,
      locationName: fullLocationName,
      lat: selectedBuilding.lat + (Math.random() - 0.5) * 0.0005,
      lng: selectedBuilding.lng + (Math.random() - 0.5) * 0.0005,
      dateTime: dateTime.trim() || 'This Weekend',
      category,
      tags: parsedTags.length > 0 ? parsedTags : ['Campus', category],
      cosignersGoal: organizerType === 'college' ? 0 : 10,
      coverImage: coverImage.trim() || undefined,
    });

    setIsCreateModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-800/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white">Create Campus Event</h2>
              <p className="text-xs text-slate-400">Post an event for {user.college}</p>
            </div>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Organizer Type Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Event Classification
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setOrganizerType('student')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  organizerType === 'student'
                    ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg'
                    : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  <Users className="w-4 h-4 text-indigo-400" />
                  <span>Student-Run</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Requires 10 student co-signers before appearing on the public feed.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setOrganizerType('college')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  organizerType === 'college'
                    ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg'
                    : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>College-Run</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Official university department, club union, or campus authority.
                </p>
              </button>
            </div>
          </div>

          {/* Student Co-Sign Alert Notice */}
          {organizerType === 'student' && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300">10 Co-Signers Rule: </span>
                After submitting, you'll receive an invite link. Once 10 verified .edu students co-sign, your event instantly becomes discoverable on the main campus map and feed.
              </div>
            </div>
          )}

          {/* Event Title */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Event Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. South 40 Mario Kart & Boba Night"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Description & Highlights *
            </label>
            <textarea
              required
              rows={3}
              placeholder="What should students bring? Any free perks, food, tournament rules, or vibes?"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 resize-none"
            />
          </div>

          {/* Category & Date/Time Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as EventCategory)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                {ALL_CATEGORIES.map(cat => (
                  <option key={cat} value={cat} className="bg-slate-900">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Date & Time
              </label>
              <input
                type="text"
                placeholder="e.g. Friday @ 8:30 PM"
                value={dateTime}
                onChange={e => setDateTime(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>
          </div>

          {/* Campus Building & Specific Spot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Campus Building / Zone
              </label>
              <select
                value={buildingId}
                onChange={e => setBuildingId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                {buildings.map(b => (
                  <option key={b.id} value={b.id} className="bg-slate-900">
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Specific Room / Spot
              </label>
              <input
                type="text"
                placeholder="e.g. Lawn, Rm 210, Fireplace"
                value={locationDetail}
                onChange={e => setLocationDetail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Tags (Comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. FreeFood, Spikeball, Casual, Sunset"
              value={tagsInput}
              onChange={e => setTagsInput(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 text-sm font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-bold shadow-lg shadow-emerald-950/50 transition-all active:scale-95 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{organizerType === 'student' ? 'Submit & Get 10 Co-Signers' : 'Publish College Event'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

