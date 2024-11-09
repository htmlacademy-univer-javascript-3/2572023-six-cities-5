import {Offers} from '../../types/offer.ts';

export type OffersListProps = {
  offers: Offers;
  onChange: (offerId: string | null) => void;
};
