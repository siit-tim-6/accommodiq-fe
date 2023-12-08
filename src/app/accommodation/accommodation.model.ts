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
  startDate: Date;
  endDate: Date;
  price: number;
}

export interface AccommodationDetailsHostDto {
  // Define the structure for AccommodationDetailsHostDto
}

export interface Availability {
  // Define the structure for Availability
}

export interface AccommodationDetailsReviewDto {
  // Define the structure for AccommodationDetailsReviewDto
}

export enum PricingType {
  PerGuest = 'PER_GUEST',
  PerNight = 'PER_NIGHT',
}
