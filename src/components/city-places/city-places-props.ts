import {City} from '@typings/city.ts';
import {Offer, Offers} from '@typings/offer.ts';

export type CityPlacesProps = {
  city: City;
  offers: Offers;
  selectedOffer: Offer | undefined;
  onActiveOfferChange: (offerId: string | null) => void;
}
