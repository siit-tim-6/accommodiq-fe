export enum AccommodationStatus {
  ACCEPTED = 'ACCEPTED',
  DENIED = 'DENIED',
  PENDING = 'PENDING',
}

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
  status?: AccommodationStatus;
}

export interface AccommodationCreateDto {
  id?: number;
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
  id?: number;
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

export interface AccommodationBookingDetailsDto {
  cancellationDeadline: number;
  pricingType: string;
}

export interface AccommodationBookingDetailFormDto {
  cancellationDeadline: number;
  pricingType: string;
  available: Availability[];
}

export interface MessageDto {
  message: string;
}
