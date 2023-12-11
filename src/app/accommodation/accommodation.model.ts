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
}
