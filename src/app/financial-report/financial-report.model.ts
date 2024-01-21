export type FinancialReportEntry = {
  accommodationId: number;
  accommodationImage: string;
  accommodationTitle: string;
  revenue: number;
  reservationCount: number;
};

export type AccommodationTitle = {
  id: number;
  title: string;
};

export type FinancialReportIndividualEntry = {
  month: string;
  revenue: number;
  reservationCount: number;
};
