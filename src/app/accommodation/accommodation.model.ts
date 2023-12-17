export interface Accommodation {
  id: number;
  title: string;
  rating: number;
  reviewCount: number;
  location: string;
  minPrice: number;
  totalPrice: number;
  minGuests: number;
  maxGuests: number;
  accepted?: boolean;
  pricingType: string;
}

export interface AccommodationCreateDto {
  title: string;
  description: string;
  location: string;
  minGuests: number;
  maxGuests: number;
  available: AvailabilityDto[];
  pricingType: string;
  automaticAcceptance: boolean;
  images: String[];
  type: string;
  benefits: string[];
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
  apartmentType: string;
  name: string;
  description: string;
  location: string;
  minGuests: number;
  maxGuests: number;
  pricePerGuest: string;
  automaticallyAcceptIncomingReservations: boolean;
  benefits: string[];
}

export type SearchParams = {
  location: string;
  rangeDates: Date[] | undefined;
  guests: string | number | undefined;
  title: string;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  type: string;
  benefits: string[];
};

export type AccommodationHost = {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
};

export type AccommodationReview = {
  author: string;
  comment: string;
  rating: number;
  date: Date;
};

export type AccommodationDetails = {
  id: number;
  title: string;
  rating: number;
  reviewCount: number;
  location: string;
  host: AccommodationHost;
  image: string;
  minGuests: number;
  maxGuests: number;
  description: string;
  reviews: AccommodationReview[];
  benefits: string[];
  type: string;
};
