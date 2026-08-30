import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useApp } from '../context/AppContext';
import { CampusEvent, CampusBuilding } from '../types';
import { FilterBar } from './FilterBar';
import { EventPreviewList } from './EventPreviewList';
import { ViewToggle } from './ViewToggle';
import {
  Building2,
  MapPin,
  Clock,
  CheckCircle,
  Share2,
  ShieldAlert
} from 'lucide-react';

// Center of Washington University in St. Louis Danforth Campus
const WASHU_CAMPUS_CENTER: [number, number] = [38.6488, -90.3108];

// Helper component to smoothly center/zoom map when user selects building
const MapController: React.FC<{ focusBuilding: CampusBuilding | null }> = ({ focusBuilding }) => {
  const map = useMap();
  useEffect(() => {
    if (focusBuilding) {
      map.flyTo([focusBuilding.lat, focusBuilding.lng], 18, {
        duration: 1.2,
      });
    }
  }, [focusBuilding, map]);
  return null;
};

// Create custom colored HTML markers for campus buildings and events
const createBuildingIcon = (buildingName: string) => {
  return L.divIcon({
    className: 'custom-building-pin',
    html: `
      <div style="
        display: flex; 
        align-items: center; 
        gap: 4px; 
        background: rgba(24, 24, 27, 0.9);
        border: 1px solid rgba(185, 28, 28, 0.4);
        color: #e4e4e7;
        padding: 3px 8px;
        border-radius: 9999px;
        font-size: 10px;
        font-weight: 600;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.5);
        transform: translate(-50%, -50%);
        white-space: nowrap;
      ">
        <span style="display: inline-block; width: 6px; height: 6px; border-radius: 9999px; background: #DC2626;"></span>
        ${buildingName}
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

const createEventIcon = (event: CampusEvent) => {
  const isCollege = event.organizerType === 'college';
  const color = isCollege ? '#B91C1C' : '#CBD5E1';
  const isPending = !event.isPublished;

  return L.divIcon({
    className: 'custom-event-pin',
    html: `
      <div style="
        position: relative;
        width: 34px;
        height: 34px;
        background: ${color};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg) translate(-10px, -10px);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 10px 15px -3px rgba(0,0,0,0.6);
        border: 2px solid #ffffff;
      ">
        <div style="transform: rotate(45deg); color: white; font-size: 13px; font-weight: bold;">
          ${isCollege ? '🏛️' : '🎉'}
        </div>
        ${
          isPending
            ? `<div style="
                position: absolute; 
                top: -4px; 
                right: -4px; 
                width: 12px; 
                height: 12px; 
                border-radius: 50%; 
                background: #F59E0B; 
                border: 2px solid white;
              "></div>`
            : ''
        }
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -30],
  });
};

export const MapView: React.FC = () => {
  const {
    filteredEvents,
    buildings,
    selectedBuildingForMapFocus,
    setSelectedBuildingForMapFocus,
    cosignEvent,
    setActiveCosignModalEvent,
  } = useApp();

  return (
    <div className="relative w-full flex-1 min-h-[360px] sm:min-h-[500px] overflow-hidden bg-zinc-950 flex flex-col">

      {/* Interactive Leaflet Map */}
      <div className="w-full flex-1 min-h-0 relative z-10 flex flex-col">
        <MapContainer
          center={WASHU_CAMPUS_CENTER}
          zoom={16}
          minZoom={14}
          maxZoom={19}
          scrollWheelZoom={true}
          zoomControl={false}
          className="w-full flex-1 min-h-0"
        >
          <ZoomControl position="bottomright" />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapController focusBuilding={selectedBuildingForMapFocus} />

          {/* Campus Building Base Markers */}
          {buildings.map(b => (
            <Marker
              key={b.id}
              position={[b.lat, b.lng]}
              icon={createBuildingIcon(b.shortName)}
              eventHandlers={{
                click: () => setSelectedBuildingForMapFocus(b),
              }}
            >
              <Popup>
                <div className="p-3 max-w-[240px]">
                  <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-0.5">
                    WashU Danforth Campus
                  </div>
                  <h4 className="text-sm font-extrabold text-white">{b.name}</h4>
                  <p className="text-xs text-zinc-300 mt-1">{b.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Event Markers with Popups */}
          {filteredEvents.map(event => (
            <Marker
              key={event.id}
              position={[event.lat, event.lng]}
              icon={createEventIcon(event)}
            >
              <Popup>
                <div className="p-3 sm:p-4 w-[calc(100vw-64px)] max-w-[280px] sm:w-[320px] sm:max-w-none">
                  
                  {/* Category & Distance Header */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      event.organizerType === 'college'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                        : 'bg-white/10 text-zinc-200 border border-white/25'
                    }`}>
                      {event.organizerType === 'college' ? '🏛️ College-Run' : '🎓 Student-Run'}
                    </span>
                    <span className="text-[11px] font-semibold text-red-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {event.distanceMiles} mi away
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-extrabold text-sm text-white mb-1 leading-snug">
                    {event.title}
                  </h3>
                  <p className="text-xs text-zinc-300 line-clamp-2 mb-3">
                    {event.description}
                  </p>

                  {/* Location & Time details */}
                  <div className="space-y-1 text-xs text-zinc-400 bg-zinc-800/60 p-2.5 rounded-xl border border-zinc-700/50 mb-3">
                    <div className="flex items-center gap-1.5 text-zinc-200">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span className="truncate font-medium">{event.locationName}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-300">
                      <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span>{event.dateTime}</span>
                    </div>
                  </div>

                  {/* Student Co-Signers Status Section */}
                  {event.organizerType === 'student' && (
                    <div className="mb-3 p-2 rounded-xl bg-red-950/40 border border-red-500/30">
                      <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
                        <span className="text-red-200">Student Co-Signers</span>
                        <span className="text-red-400">
                          {event.cosignersCount} / 10 required
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, (event.cosignersCount / 10) * 100)}%` }}
                        />
                      </div>
                      {!event.isPublished && (
                        <p className="text-[10px] text-amber-300 mt-1 flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3" />
                          Needs {10 - event.cosignersCount} more co-signs to go live on campus feed!
                        </p>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {event.organizerType === 'student' && (
                      <button
                        onClick={() => cosignEvent(event.id)}
                        disabled={event.cosignedByMe}
                        className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          event.cosignedByMe
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30 cursor-default'
                            : 'bg-red-600 hover:bg-red-500 text-white shadow-md active:scale-95'
                        }`}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{event.cosignedByMe ? 'Co-Signed' : 'Co-Sign Event'}</span>
                      </button>
                    )}

                    <button
                      onClick={() => setActiveCosignModalEvent(event)}
                      className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg border border-zinc-700 transition-all"
                      title="Share & Invite"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Floating Quick Campus Building Selector */}
        <div className="absolute top-4 left-4 z-[400] max-w-xs hidden lg:block bg-zinc-900/40 backdrop-blur-md p-2 rounded-2xl border border-zinc-800/50 shadow-lg">
          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider px-2 py-1 flex items-center gap-1">
            <Building2 className="w-3 h-3 text-red-400" />
            <span>Danforth Campus Buildings</span>
          </div>
          <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto p-1">
            {buildings.map(b => (
              <button
                key={b.id}
                onClick={() => setSelectedBuildingForMapFocus(b)}
                className={`text-[11px] px-2 py-1 rounded-lg transition-all ${
                  selectedBuildingForMapFocus?.id === b.id
                    ? 'bg-red-700 text-white font-bold'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {b.shortName}
              </button>
            ))}
          </div>
        </div>

        {/* Floating Filter Bar */}
        <div className="absolute bottom-4 left-4 z-[450] hidden lg:block">
          <FilterBar variant="floating" />
        </div>

        {/* Compact view switcher for phones and tablets */}
        <div className="absolute top-3 right-3 z-[450] w-36 lg:hidden">
          <ViewToggle className="w-full bg-zinc-900/80" />
        </div>

      </div>

      {/* Floating Sidebar: View Toggle + Nearby Events Preview + Map Legend, each with its own blurred backing */}
      <div className="absolute top-4 right-4 z-[450] w-80 max-h-[calc(100%-2rem)] hidden lg:flex flex-col gap-2">
        <ViewToggle className="w-full" />
        <EventPreviewList />

        {/* Map Legend Overlay */}
        <div className="shrink-0 bg-zinc-900/40 backdrop-blur-md p-3 rounded-2xl border border-zinc-800/50 shadow-lg text-xs space-y-1.5">
          <div className="font-bold text-white text-[11px] uppercase tracking-wider">Map Legend</div>
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="w-3 h-3 rounded-full bg-red-700 inline-block" />
            <span>🏛️ College-Run Event</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="w-3 h-3 rounded-full bg-zinc-300 inline-block" />
            <span>🎉 Student-Run Event</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="w-2.5 h-2.5 rounded-full border border-red-400 inline-block" />
            <span>Campus Building</span>
          </div>
        </div>
      </div>

    </div>
  );
};
