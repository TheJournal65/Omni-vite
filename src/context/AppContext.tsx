import React, { createContext, useContext, useState, useEffect } from 'react';
import { CampusEvent, CampusBuilding, UserProfile, EventCategory, EventType } from '../types';
import { INITIAL_EVENTS, INITIAL_USER, WASHU_BUILDINGS } from '../data/initialData';

// Haversine formula to compute distance in miles between two coordinates
export function calculateDistanceMiles(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8; // Earth radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 100) / 100;
}

interface AppContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  events: CampusEvent[];
  buildings: CampusBuilding[];
  activeView: 'map' | 'list';
  setActiveView: (view: 'map' | 'list') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedOrganizerType: 'all' | EventType;
  setSelectedOrganizerType: (type: 'all' | EventType) => void;
  selectedCategories: EventCategory[];
  toggleCategory: (cat: EventCategory) => void;
  resetCategoryFilter: () => void;
  sortBy: 'distance' | 'time' | 'cosigners';
  setSortBy: (sort: 'distance' | 'time' | 'cosigners') => void;
  maxDistance: number;
  setMaxDistance: (miles: number) => void;
  
  // Modals
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  activeCosignModalEvent: CampusEvent | null;
  setActiveCosignModalEvent: (event: CampusEvent | null) => void;
  
  // Actions
  createEvent: (newEvent: Omit<CampusEvent, 'id' | 'createdAt' | 'cosignersCount' | 'distanceMiles' | 'isPublished'>) => void;
  cosignEvent: (eventId: string) => void;
  selectedBuildingForMapFocus: CampusBuilding | null;
  setSelectedBuildingForMapFocus: (b: CampusBuilding | null) => void;
  
  // Filtered events
  filteredEvents: CampusEvent[];
  pendingCosignEvents: CampusEvent[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state from LocalStorage if present
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('omnivite_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [events, setEvents] = useState<CampusEvent[]>(() => {
    const saved = localStorage.getItem('omnivite_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [buildings] = useState<CampusBuilding[]>(WASHU_BUILDINGS);
  const [activeView, setActiveView] = useState<'map' | 'list'>('map');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrganizerType, setSelectedOrganizerType] = useState<'all' | EventType>('all');
  
  // Default category filter shows all events; "My AI Matches" opts into the user's preferences
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>([]);
  const [sortBy, setSortBy] = useState<'distance' | 'time' | 'cosigners'>('distance');
  const [maxDistance, setMaxDistance] = useState<number>(5.0); // 5 miles max slider

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activeCosignModalEvent, setActiveCosignModalEvent] = useState<CampusEvent | null>(null);
  const [selectedBuildingForMapFocus, setSelectedBuildingForMapFocus] = useState<CampusBuilding | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('omnivite_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('omnivite_events', JSON.stringify(events));
  }, [events]);

  const toggleCategory = (cat: EventCategory) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const resetCategoryFilter = () => {
    setSelectedCategories(user.favoriteCategories);
  };

  const createEvent = (
    eventData: Omit<CampusEvent, 'id' | 'createdAt' | 'cosignersCount' | 'distanceMiles' | 'isPublished'>
  ) => {
    const dist = calculateDistanceMiles(
      user.userCoords.lat,
      user.userCoords.lng,
      eventData.lat,
      eventData.lng
    );

    const isCollege = eventData.organizerType === 'college';
    // Student events start with 1 cosigner (the creator) and require 10 before publishing
    const initialCosigners = isCollege ? 10 : 1;
    const isPublished = isCollege || initialCosigners >= 10;

    const newEvent: CampusEvent = {
      ...eventData,
      id: `ev-${Date.now()}`,
      createdAt: new Date().toISOString(),
      distanceMiles: dist,
      cosignersCount: initialCosigners,
      cosignersGoal: isCollege ? 0 : 10,
      cosignedByMe: true,
      isPublished: isPublished,
    };

    setEvents(prev => [newEvent, ...prev]);

    // If it requires co-signers, open the invite/co-sign modal immediately
    if (!isCollege && !isPublished) {
      setActiveCosignModalEvent(newEvent);
    }
  };

  const cosignEvent = (eventId: string) => {
    setEvents(prevEvents =>
      prevEvents.map(ev => {
        if (ev.id === eventId) {
          if (ev.cosignedByMe) return ev; // already signed
          const newCount = ev.cosignersCount + 1;
          const isNowPublished = ev.organizerType === 'college' || newCount >= 10;
          return {
            ...ev,
            cosignersCount: newCount,
            cosignedByMe: true,
            isPublished: isNowPublished,
          };
        }
        return ev;
      })
    );
  };

  // Compute live distances relative to user
  const eventsWithLiveDistance = events.map(ev => ({
    ...ev,
    distanceMiles: calculateDistanceMiles(
      user.userCoords.lat,
      user.userCoords.lng,
      ev.lat,
      ev.lng
    ),
  }));

  // Filtered visible published events
  const filteredEvents = eventsWithLiveDistance
    .filter(ev => {
      // Must be published OR created by current user
      const isVisible = ev.isPublished || ev.organizerEmail === user.email;
      if (!isVisible) return false;

      // Filter by organizer type
      if (selectedOrganizerType !== 'all' && ev.organizerType !== selectedOrganizerType) {
        return false;
      }

      // Filter by categories (if any selected)
      if (selectedCategories.length > 0 && !selectedCategories.includes(ev.category)) {
        return false;
      }

      // Filter by max distance
      if (ev.distanceMiles > maxDistance) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = ev.title.toLowerCase().includes(q);
        const matchesDesc = ev.description.toLowerCase().includes(q);
        const matchesLoc = ev.locationName.toLowerCase().includes(q);
        const matchesTags = ev.tags.some(t => t.toLowerCase().includes(q));
        const matchesOrg = ev.organizerName.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesLoc && !matchesTags && !matchesOrg) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'distance') {
        return a.distanceMiles - b.distanceMiles;
      } else if (sortBy === 'cosigners') {
        return b.cosignersCount - a.cosignersCount;
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  // Pending Co-Sign Events (Draft / Waiting for 10 signatures)
  const pendingCosignEvents = eventsWithLiveDistance.filter(
    ev => !ev.isPublished && ev.organizerType === 'student'
  );

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        events,
        buildings,
        activeView,
        setActiveView,
        searchQuery,
        setSearchQuery,
        selectedOrganizerType,
        setSelectedOrganizerType,
        selectedCategories,
        toggleCategory,
        resetCategoryFilter,
        sortBy,
        setSortBy,
        maxDistance,
        setMaxDistance,
        isCreateModalOpen,
        setIsCreateModalOpen,
        isProfileModalOpen,
        setIsProfileModalOpen,
        activeCosignModalEvent,
        setActiveCosignModalEvent,
        createEvent,
        cosignEvent,
        selectedBuildingForMapFocus,
        setSelectedBuildingForMapFocus,
        filteredEvents,
        pendingCosignEvents,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

