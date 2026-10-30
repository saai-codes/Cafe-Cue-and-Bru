export interface CafeInfo {
  name: string;
  hindiName: string;
  tagline: string;
  address: string;
  landmark: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  plusCode: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  rating: {
    score: number;
    reviewCount: number;
    platform: string;
    note: string;
  };
  priceRange: string;
  openingHours: string;
  mapsUrl: string;
  mapsEmbedQuery: string;
}

export const CAFE_INFO: CafeInfo = {
  name: 'Cafe Cue & Brew',
  hindiName: 'कैफे क्यू & ब्रेव',
  tagline: 'Great Food. Good View. Better Company.',
  address: '7th floor, above Amigos Gym, opposite Sinhgad Campus, Vadgaon Budruk, Pune, Maharashtra 411041',
  landmark: 'Above Amigos Gym, Opposite Sinhgad Campus',
  locality: 'Vadgaon Budruk',
  city: 'Pune',
  state: 'Maharashtra',
  pincode: '411041',
  plusCode: 'FR7M+6J Pune, Maharashtra',
  phone: '07887745344',
  phoneDisplay: '0788 774 5344',
  whatsapp: '917887745344',
  rating: {
    score: 4.9,
    reviewCount: 56,
    platform: 'Google Reviews',
    note: 'Rating based on current listing snapshot (56 reviews). Verified customer score.'
  },
  priceRange: '₹200 – ₹800 per person',
  openingHours: 'Open 24 Hours (Subject to rooftop management verification)',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Cafe+Cue+%26+Brew+7th+floor+above+Amigos+Gym+opposite+Sinhgad+Campus+Vadgaon+Budruk+Pune+411041',
  mapsEmbedQuery: '7th floor, above Amigos Gym, opposite Sinhgad Campus, Vadgaon Budruk, Pune, Maharashtra 411041'
};

export const AMBIENCE_GALLERY = [
  {
    id: 'ambience-1',
    image: '/images/hero/rooftop-hero.jpg',
    title: 'Sunset Rooftop Skyline',
    subtitle: 'Golden hour panoramic views over Sinhgad hills and Pune cityscape'
  },
  {
    id: 'ambience-2',
    image: '/images/ambience/rooftop-terrace.jpg',
    title: 'Open Sky Terrace Dining',
    subtitle: 'Warm ambient glow, breeze, and comfortable lounge seating'
  },
  {
    id: 'ambience-3',
    image: '/images/ambience/rooftop-night.jpg',
    title: 'Midnight Rooftop Vibes',
    subtitle: 'Fairy lights, stargazing & late night comfort food'
  },
  {
    id: 'ambience-4',
    image: '/images/pool/pool-table-hero.jpg',
    title: 'Tournament Pool Arena',
    subtitle: 'High precision 8-ball & 9-ball tables under studio illumination'
  },
  {
    id: 'ambience-5',
    image: '/images/ambience/cafe-interior.jpg',
    title: 'Cozy Inner Lounge',
    subtitle: 'Quiet corners for reading, coffee chats and acoustic melodies'
  },
  {
    id: 'ambience-6',
    image: '/images/pool/pool-lounge.jpg',
    title: 'Snooker & Social Club',
    subtitle: 'Where cue sports meet artisanal brews and friendship'
  }
];

