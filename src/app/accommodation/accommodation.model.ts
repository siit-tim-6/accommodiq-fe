export interface Accommodation {
  id: number;
  title: string;
  rating: number;
  reviewCount: number;
  location: string;
  minPrice: number;
  minGuests: number;
  maxGuests: number;
  accepted?: boolean;
}

export interface AccommodationCreateDto {
  title: string;
  description: string;
  location: string;
  minGuests: number;
  maxGuests: number;
  available: AvailabilityDto[];
  pricingType: PricingType;
  automaticAcceptance: boolean;
  images: String[];
}

export interface AccommodationDetailsDto {
  id: number;
  title: string;
  rating: number;
  reviewCount: number;
  address: string;
  host: AccommodationDetailsHostDto;
  image: string;
  minGuests: number;
  maxGuests: number;
  available: Availability[];
  description: string;
  reviews: AccommodationDetailsReviewDto[];
}

export interface AvailabilityDto {
  fromDate: number;
  toDate: number;
  price: number;
}

export interface AccommodationDetailsHostDto {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
}

export interface Availability {
  id: number;
  fromDate: number;
  toDate: number;
  price: number;
}

export interface AccommodationDetailsReviewDto {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
}

export enum PricingType {
  PerGuest = 'PER_GUEST',
  PerNight = 'PER_NIGHT',
}

export interface AccommodationFormData {
  name: string;
  description: string;
  location: string;
  minGuests: number;
  maxGuests: number;
  pricePerGuest: boolean;
  automaticallyAcceptIncomingReservations: boolean;
}
