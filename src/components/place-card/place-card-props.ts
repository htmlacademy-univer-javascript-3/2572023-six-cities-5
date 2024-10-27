import {Offer} from '../../types/offer.ts';

export type PlaceCardProps = {
  offer: Offer;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}
