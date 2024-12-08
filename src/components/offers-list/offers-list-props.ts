import {Offers} from '@typings/offer.ts';

export type OffersListProps = {
  offers: Offers;
  onActiveOfferChange: (offerId: string | null) => void;
};
