import { User } from './user';

export type Review = {
  id: string;
  comment: string;
  user: User;
  date: string;
  rating: number;
}
