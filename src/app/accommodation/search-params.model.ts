export type SearchParams = {
  location: string;
  rangeDates: Date[] | undefined;
  guests: number | undefined;
  title: string;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  type: string;
  benefits: string[];
};
