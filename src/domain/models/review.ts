import { User } from './user';

export type Review = {
  id: string;
  comment: string;
  user: User;
  timestamp: string;
  rating: number;
}
