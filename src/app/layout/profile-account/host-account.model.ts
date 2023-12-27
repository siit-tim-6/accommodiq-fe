export interface HostReviewDto {
  id: number;
  rating: number;
  comment: string;
  date: number;
  author: string;
  canDelete: boolean;
}

export interface HostReviewRequest {
  rating: number;
  comment: string;
}
