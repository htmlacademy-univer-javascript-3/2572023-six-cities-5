import {City} from '@typings/city.ts';
import {Offer, Offers} from '@typings/offer.ts';

export type MapProps = {
  city: City;
  offers: Offers;
  selectedOffer: Offer | undefined;
  className: string;
};
