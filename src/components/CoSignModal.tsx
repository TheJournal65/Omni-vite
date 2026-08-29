import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Users, 
  CheckCircle2, 
  Copy, 
  Check, 
  ShieldAlert, 
  MapPin
} from 'lucide-react';

export const CoSignModal: React.FC = () => {
  const { activeCosignModalEvent, setActiveCosignModalEvent, cosignEvent, user, events } = useApp();
  const [copied, setCopied] = useState(false);

  if (!activeCosignModalEvent) return null;

  // Read the live event from the events array instead of trusting the snapshot
  // captured when the modal opened — otherwise co-signing here doesn't visibly update.
  const event = events.find(ev => ev.id === activeCosignModalEvent.id) || activeCosignModalEvent;
  const isCollege = event.organizerType === 'college';
  const progressPercent = isCollege ? 100 : Math.min(100, (event.cosignersCount / 10) * 100);
  const isLive = isCollege || event.cosignersCount >= 10;
  const remaining = Math.max(0, 10 - event.cosignersCount);

  const inviteUrl = `https://omnivite.washu.edu/events/${event.id}/cosign`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCoSign = () => {
    cosignEvent(event.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-800/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white">Event Co-Sign & Verification</h2>
              <p className="text-xs text-zinc-400">10-Student Peer Validation Threshold</p>
            </div>
          </div>

          <button
            onClick={() => setActiveCosignModalEvent(null)}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Event Preview Card */}
          <div className="p-4 rounded-2xl bg-zinc-800/60 border border-zinc-700/60 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-red-500/20 text-red-300 border border-red-500/40">
                {event.category}
              </span>
              <span className="text-xs text-zinc-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-red-400" />
                {event.locationName}
              </span>
            </div>
            <h3 className="text-base font-extrabold text-white">{event.title}</h3>
            <p className="text-xs text-zinc-300 line-clamp-2">{event.description}</p>
          </div>

          {/* Verification Status Progress Bar */}
          <div className="p-5 rounded-2xl bg-red-950/40 border border-red-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-300">
                  Co-Signers Progress
                </span>
                <div className="text-2xl font-black text-white font-mono mt-0.5">
                  {event.cosignersCount} <span className="text-zinc-400 text-sm font-normal">/ 10 required</span>
                </div>
              </div>

              <div>
                {isLive ? (
                  <span className="px-3 py-1.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Live on Feed
                  </span>
                ) : (
                  <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" /> Pending ({remaining} more)
                  </span>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-red-700 via-red-500 to-red-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              {isLive ? (
                <span className="text-red-300 font-medium">
                  🎉 This event reached the 10-student requirement and is now publicly visible to everyone on campus!
                </span>
              ) : (
                <span>
                  Omni-vite prevents spam and unsafe posts by requiring <strong>10 peers</strong> to co-sign student gatherings before they appear on the public map.
                </span>
              )}
            </p>
          </div>

          {/* Quick Co-Sign Action */}
          {!event.cosignedByMe ? (
            <button
              onClick={handleCoSign}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white font-bold text-sm shadow-xl shadow-red-950/50 flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Co-Sign This Event as {user.name}</span>
            </button>
          ) : (
            <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>You have already co-signed this event</span>
            </div>
          )}

          {/* Shareable Invite Link */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
              Share Invite Link with Friends & Group Chats
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={inviteUrl}
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-zinc-300 font-mono focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl border border-zinc-700 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-red-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Simulated Peer Signers List */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Verified Co-Signers ({event.cosignersCount})
            </div>
            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-800/40 text-xs">
                <span className="font-semibold text-zinc-200">Alex Chen (Creator)</span>
                <span className="text-red-400 font-mono text-[11px]">alex.chen@wustl.edu</span>
              </div>
              {Array.from({ length: Math.max(0, event.cosignersCount - 1) }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-zinc-800/40 text-xs">
                  <span className="text-zinc-300">WashU Student #{i + 2}</span>
                  <span className="text-red-400/80 font-mono text-[11px]">.edu verified</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

