import {City} from '../../../types/city.ts';
import {Offer} from '../../../types/offer.ts';

export type MapProps = {
  city: City;
  offers: Offer[];
  activeOfferId: string | null;
  className: string;
}
