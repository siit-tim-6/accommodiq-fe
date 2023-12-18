import { AccommodationReview } from './accommodation-review.model';
import { AccommodationHost } from './accommodation-host.model';
import { Availability } from './accommodation.model';

export type AccommodationDetails = {
  available: [Availability];
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
  price: number;
  pricePerGuest: boolean;
  automaticallyAcceptIncomingReservations: boolean;
};
