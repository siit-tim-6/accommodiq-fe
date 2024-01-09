export interface Comment {
  id: number;
  rating: number;
  author: string;
  comment: string;
  date: Date;
  deletable: boolean;
  authorId: number;
}
