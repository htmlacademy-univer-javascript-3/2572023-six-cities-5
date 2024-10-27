import { City } from './city';
import { Location } from './location';

export type Offer = {
  id: string;
  title: string;
  cardType: string;
  price: number;
  city: City;
  location: Location;
  isBookmarked: boolean;
  isPremium: boolean;
  starsCount: number;
  imageSrc: string;
};

export type Offers = Offer[];
