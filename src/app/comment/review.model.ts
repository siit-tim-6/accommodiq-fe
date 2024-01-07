export interface ReviewDto {
  id: number;
  rating: number;
  comment: string;
  date: number;
  author: string;
  deletable: boolean;
  authorId: number;
  status: ReviewStatus;
}

export interface ReviewStatusDto {
  status: ReviewStatus;
}

export enum ReviewStatus {
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  REPORTED = 'REPORTED',
}

export interface ReviewRequest {
  rating: number;
  comment: string;
}
