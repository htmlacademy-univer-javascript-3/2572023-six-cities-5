import {City} from '../../types/city.ts';
import {Offers, Offer} from '../../types/offer.ts';

export type MapProps = {
  city: City;
  offers: Offers;
  selectedOffer: Offer | undefined;
};
