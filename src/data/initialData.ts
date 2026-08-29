import { CampusBuilding, CampusEvent, UserProfile, EventCategory } from '../types';

export const WASHU_BUILDINGS: CampusBuilding[] = [
  {
    id: 'duc',
    name: 'Danforth University Center (DUC)',
    shortName: 'DUC',
    category: 'student_life',
    lat: 38.6475,
    lng: -90.3093,
    description: 'Central hub for student dining, fireside chats, and campus events.'
  },
  {
    id: 'tisch-park',
    name: 'Tisch Park (East End)',
    shortName: 'Tisch Park',
    category: 'outdoor',
    lat: 38.6472,
    lng: -90.3032,
    description: 'Expansive green space and gateway facing Forest Park.'
  },
  {
    id: 'mudd-field',
    name: 'Mudd Field',
    shortName: 'Mudd Field',
    category: 'outdoor',
    lat: 38.6482,
    lng: -90.3122,
    description: 'Open campus field popular for spikeball, club fairs, and outdoor concerts.'
  },
  {
    id: 'olin-library',
    name: 'John M. Olin Library',
    shortName: 'Olin Library',
    category: 'academic',
    lat: 38.6488,
    lng: -90.3088,
    description: 'Main research library and study spaces at the heart of campus.'
  },
  {
    id: 'bauer-hall',
    name: 'Bauer Hall (Olin Business School)',
    shortName: 'Bauer Hall',
    category: 'academic',
    lat: 38.6496,
    lng: -90.3106,
    description: 'Modern glass atrium hosting hackathons, guest speakers, and career events.'
  },
  {
    id: 'south-40',
    name: 'South 40 Residential Commons & Bear\'s Den',
    shortName: 'South 40 / BD',
    category: 'residential',
    lat: 38.6450,
    lng: -90.3142,
    description: 'Freshman and sophomore residential village with dining and common lawns.'
  },
  {
    id: 'village',
    name: 'The Village Lawn & Center',
    shortName: 'The Village',
    category: 'residential',
    lat: 38.6521,
    lng: -90.3117,
    description: 'Upperclassman housing community near North Campus and Millbrook.'
  },
  {
    id: 'sumers-rec',
    name: 'Gary M. Sumers Recreation Center',
    shortName: 'Sumers Rec',
    category: 'athletics',
    lat: 38.6493,
    lng: -90.3148,
    description: 'Athletic center with courts, tracks, and fitness studios.'
  },
  {
    id: 'delmar-loop',
    name: 'Delmar Loop (Off-Campus Hub)',
    shortName: 'The Loop',
    category: 'student_life',
    lat: 38.6558,
    lng: -90.3060,
    description: 'Vibrant dining and entertainment district 0.8 miles north of campus.'
  }
];

export const INITIAL_USER: UserProfile = {
  name: 'Alex Chen',
  email: 'alex.chen@wustl.edu',
  college: 'Washington University in St. Louis',
  preferencesDescription: 'Looking for hackathon team meetups, late night Mario Kart, campus food trucks, and weekend social mixers.',
  favoriteCategories: ['Party / Social', 'Career & Tech', 'Free Food & Perks', 'Gaming & Chill'],
  currentLocationName: 'Olin Library',
  userCoords: {
    lat: 38.6488,
    lng: -90.3088
  }
};

export const INITIAL_EVENTS: CampusEvent[] = [
  {
    id: 'ev-1',
    title: 'WashU Hackathon 2026 Opening Night & Pizza',
    description: 'Kick off the annual WashU Hackathon with keynote speakers, sponsor booths, team matching, and 50+ boxes of hot pizza.',
    organizerType: 'college',
    organizerName: 'WashU CSE & ACM Chapter',
    organizerEmail: 'hack@wustl.edu',
    buildingId: 'bauer-hall',
    locationName: 'Bauer Hall - Atrium',
    lat: 38.6496,
    lng: -90.3106,
    distanceMiles: 0.12,
    dateTime: 'Today @ 6:00 PM',
    category: 'Career & Tech',
    tags: ['Hackathon', 'Coding', 'Free Pizza', 'Tech'],
    cosignersCount: 10,
    cosignersGoal: 0,
    isPublished: true,
    coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-08-28T14:00:00Z'
  },
  {
    id: 'ev-2',
    title: 'South 40 Sunset Spikeball & Boba Hangout',
    description: 'Bring your friends for 2v2 Spikeball tournaments on the lawn. First 40 students get free Kung Fu Tea milk boba!',
    organizerType: 'student',
    organizerName: 'Jordan Taylor (Class of 27)',
    organizerEmail: 'jordan.t@wustl.edu',
    buildingId: 'south-40',
    locationName: 'South 40 - Swamp Lawn',
    lat: 38.6450,
    lng: -90.3142,
    distanceMiles: 0.38,
    dateTime: 'Tomorrow @ 4:30 PM',
    category: 'Sports & Fitness',
    tags: ['Spikeball', 'Free Boba', 'Sunset', 'Outdoor'],
    cosignersCount: 10, // Published because >= 10 co-signers reached
    cosignersGoal: 10,
    isPublished: true,
    coverImage: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-08-27T18:00:00Z'
  },
  {
    id: 'ev-3',
    title: 'Late Night Smash Bros & Mario Kart Tournament',
    description: 'Casual bracket for Smash Ultimate and Mario Kart 8 Deluxe. Snacks, energy drinks, and Nintendo Switch setups provided in the multipurpose room.',
    organizerType: 'student',
    organizerName: 'WashU Esports & Casual Gaming',
    organizerEmail: 'gaming@wustl.edu',
    buildingId: 'duc',
    locationName: 'DUC - Tisch Commons (Rm 240)',
    lat: 38.6475,
    lng: -90.3093,
    distanceMiles: 0.09,
    dateTime: 'Saturday @ 8:00 PM',
    category: 'Gaming & Chill',
    tags: ['Gaming', 'Nintendo', 'Smash Bros', 'Snacks'],
    cosignersCount: 3,
    cosignersGoal: 10,
    isPublished: true,
    coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-08-28T10:00:00Z'
  },
  {
    id: 'ev-4',
    title: 'East End Stargazing & Acoustic Jam Session',
    description: 'Chill outdoor acoustic session under the stars. Bring blankets, guitars, or just come hang out and listen to local student musicians.',
    organizerType: 'student',
    organizerName: 'Maya Patel (WashU Music Guild)',
    organizerEmail: 'maya.p@wustl.edu',
    buildingId: 'tisch-park',
    locationName: 'Tisch Park - East End Steps',
    lat: 38.6472,
    lng: -90.3032,
    distanceMiles: 0.32,
    dateTime: 'Saturday @ 9:30 PM',
    category: 'Arts & Music',
    tags: ['Acoustic', 'Music', 'Stargazing', 'Chill'],
    cosignersCount: 8, // Needs 2 more co-signers!
    cosignersGoal: 10,
    isPublished: false,
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-08-28T19:30:00Z'
  },
  {
    id: 'ev-5',
    title: 'Fall Welcome Back Quad Party & Food Trucks',
    description: 'Official university welcome bash featuring 6 St. Louis local food trucks, live DJ sets, photo booths, and campus club showcases.',
    organizerType: 'college',
    organizerName: 'Student Union & Campus Life',
    organizerEmail: 'campuslife@wustl.edu',
    buildingId: 'mudd-field',
    locationName: 'Mudd Field Quadrangle',
    lat: 38.6482,
    lng: -90.3122,
    distanceMiles: 0.18,
    dateTime: 'Sunday @ 2:00 PM',
    category: 'Party / Social',
    tags: ['Quad Party', 'Food Trucks', 'Live DJ', 'Freebies'],
    cosignersCount: 10,
    cosignersGoal: 0,
    isPublished: true,
    coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-08-26T12:00:00Z'
  },
  {
    id: 'ev-6',
    title: 'Delmar Loop Midnight Tacos & Bowling Afterparty',
    description: 'Post-hackathon celebration at Flamingo Bowl and late night taco spot on Delmar Loop. Rideshare carpools leaving from Village clock tower.',
    organizerType: 'student',
    organizerName: 'Sammy & Friends',
    organizerEmail: 'sammy.k@wustl.edu',
    buildingId: 'delmar-loop',
    locationName: 'Delmar Loop (6100 Delmar Blvd)',
    lat: 38.6558,
    lng: -90.3060,
    distanceMiles: 0.85,
    dateTime: 'Sunday @ 11:00 PM',
    category: 'Party / Social',
    tags: ['Late Night', 'Tacos', 'Bowling', 'Off-Campus'],
    cosignersCount: 10,
    cosignersGoal: 10,
    isPublished: true,
    coverImage: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-08-28T16:00:00Z'
  },
  {
    id: 'ev-7',
    title: 'Pre-Midterm Quiet Focus Group + Matcha Station',
    description: 'Silent study zone with ceremonial matcha bar and noise-canceling setup in Olin Library level 2 group room.',
    organizerType: 'student',
    organizerName: 'Chloe Lin',
    organizerEmail: 'chloe.lin@wustl.edu',
    buildingId: 'olin-library',
    locationName: 'Olin Library - Room 214',
    lat: 38.6488,
    lng: -90.3088,
    distanceMiles: 0.02,
    dateTime: 'Monday @ 7:00 PM',
    category: 'Academic / Study',
    tags: ['Study', 'Matcha', 'Focus', 'Olin Library'],
    cosignersCount: 6, // Needs 4 co-signers
    cosignersGoal: 10,
    isPublished: false,
    coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-08-28T21:00:00Z'
  }
];

export const ALL_CATEGORIES: EventCategory[] = [
  'Party / Social',
  'Academic / Study',
  'Club & Greek Life',
  'Sports & Fitness',
  'Arts & Music',
  'Free Food & Perks',
  'Career & Tech',
  'Gaming & Chill'
];

