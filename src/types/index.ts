export type DietaryType = 'veg' | 'non-veg' | 'both' | 'beverage' | 'dessert';

export interface MenuVariant {
  name: string;
  price: number;
  dietary?: 'veg' | 'non-veg';
}

export interface MenuItem {
  id: string;
  name: string;
  hindiName?: string;
  category: string;
  description: string;
  price: number;
  variants?: MenuVariant[];
  dietary: DietaryType;
  image: string;
  badge?: string;
  spicyLevel?: 1 | 2 | 3;
  popular?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  hindiName?: string;
  description: string;
  icon: string;
}

export interface TableBookingRequest {
  id?: string;
  fullName: string;
  phone: string;
  email?: string;
  date: string;
  timeSlot: string;
  guestCount: number;
  seatingArea: 'rooftop-outdoor' | 'rooftop-cabana' | 'snooker-lounge' | 'indoor-cozy';
  specialOccasion?: 'birthday' | 'anniversary' | 'date-night' | 'friends-hangout' | 'none';
  notes?: string;
  poolTableInterest?: boolean;
  timestamp?: string;
}

export interface PoolEnquiryRequest {
  fullName: string;
  phone: string;
  date: string;
  preferredTime: string;
  playersCount: number;
  tableType: 'standard-pool' | 'snooker-tournament';
  combineWithDining: boolean;
  notes?: string;
}

