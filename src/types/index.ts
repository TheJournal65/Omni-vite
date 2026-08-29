export type EventType = 'college' | 'student';

export type EventCategory = 
  | 'Party / Social'
  | 'Academic / Study'
  | 'Club & Greek Life'
  | 'Sports & Fitness'
  | 'Arts & Music'
  | 'Free Food & Perks'
  | 'Career & Tech'
  | 'Gaming & Chill';

export interface CampusBuilding {
  id: string;
  name: string;
  shortName: string;
  category: 'academic' | 'student_life' | 'residential' | 'athletics' | 'outdoor';
  lat: number;
  lng: number;
  description: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  organizerType: EventType;
  organizerName: string;
  organizerEmail: string;
  buildingId: string;
  locationName: string;
  lat: number;
  lng: number;
  distanceMiles: number; // dynamically computed or base relative distance
  dateTime: string;
  category: EventCategory;
  tags: string[];
  cosignersCount: number;
  cosignersGoal: number; // 10 for student events, 0 for college
  cosignedByMe?: boolean;
  isPublished: boolean;
  coverImage?: string;
  createdAt: string;
}

export interface UserProfile {
  name: string;
  email: string;
  college: string;
  preferencesDescription: string;
  favoriteCategories: EventCategory[];
  currentLocationName: string;
  userCoords: {
    lat: number;
    lng: number;
  };
}

