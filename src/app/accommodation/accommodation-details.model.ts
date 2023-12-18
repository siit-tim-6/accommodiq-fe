import { AccommodationReview } from './accommodation-review.model';
import { AccommodationHost } from './accommodation-host.model';
import { AvailabilityDto, PricingType } from './accommodation.model';

export type AccommodationDetails = {
  available: AvailabilityDto[];
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
  pricingType: PricingType;
  automaticAcceptance: boolean;
};
