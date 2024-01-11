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
  PENDING = 'PENDING',
}

export interface ReviewRequest {
  rating: number;
  comment: string;
}

export interface ReviewApprovalCardDto {
  review: ReviewDto;
  title: string;
  accommodationId: number;
  image: string;
}

export interface ReviewBaseInfo {
  id: number;
  rating: number;
  author: string;
  comment: string;
  date: Date;
  deletable: boolean;
  authorId: number;
}
