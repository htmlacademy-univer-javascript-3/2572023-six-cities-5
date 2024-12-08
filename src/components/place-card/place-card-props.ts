import {Offer} from '@typings/offer.ts';
import {CardType} from '@const';

export type PlaceCardProps = {
  offer: Offer;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  cardType: CardType;
}
