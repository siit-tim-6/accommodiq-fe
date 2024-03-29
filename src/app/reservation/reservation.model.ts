import { AccommodationLocation } from '../accommodation/accommodation.model';

export enum ReservationStatus {
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
  DECLINED = 'DECLINED',
}

export type Reservation = {
  id: number;
  accommodationId: number;
  accommodationImage: string;
  accommodationTitle: string;
  accommodationRating: number;
  accommodationReviewCount: number;
  accommodationLocation: AccommodationLocation;
  guests: number;
  startDate: number;
  endDate: number;
  status: ReservationStatus;
  totalPrice: number;
  guestName?: string;
  pastCancellations?: number;
};

export type ReservationSearchParams = {
  title: string;
  reservationDates: Date[];
  status: string | null;
};
