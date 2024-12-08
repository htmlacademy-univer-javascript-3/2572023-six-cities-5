import { City } from './city';
import { Location } from './location';
import { OfferType } from './offer-type';
import { User } from './user';

export type Offer = {
  id: string;
  title: string;
  type: OfferType;
  price: number;
  city: City;
  location: Location;
  description: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  bedrooms: number;
  maxAdults: number;
  host: User;
  goods: string[];
  previewImage: string;
  images: string[];
}
