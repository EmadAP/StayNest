export interface Listing {
  _id: string;
  title: string;
  description: string;
  pricePerNight: number;
  availableFrom: string;
  availableTo: string;
  address: string;
  coordinates: [number, number];
  amenities: string[];
  maxGuests: number;
  houseRules: string;
  images: string[];
  owner: string;
  propertyType: "house" | "apartment" | "room";
  country: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface User {
  id: string;
  username: string;
  email?: string;
}

export interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export type SignupData = {
  username: string;
  email: string;
  password: string;
};

export type LoginData = {
  username: string;
  password: string;
};

export type Testimonial = {
  name: string;
  image: string;
  message: string;
};

// export interface DraftData {
//   propertyType: "house" | "apartment" | "room";
//   country: string;
// }
