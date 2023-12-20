import { AccommodationReview } from './accommodation-review.model';
import { AccommodationHost } from './accommodation-host.model';

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

export type AccommodationAdvancedDetails = {
  id: number;
  title: string;
  description: string;
  location: string;
  minGuests: number;
  maxGuests: number;
  automaticAcceptance: boolean;
  type: string;
  images: string[];
  benefits: string[];
};
