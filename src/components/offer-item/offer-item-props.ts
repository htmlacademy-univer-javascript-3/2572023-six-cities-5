import {Offer} from '../../types/offer.ts';
import {FavoriteAction} from '../../types/favorite-action.ts';

export type OfferItemProps = {
  offer: Offer;
  onFavoriteStatusChanged: (action: FavoriteAction) => void;
  onMouseEnter: (id: string) => void;
  onMouseLeave: (id: string) => void;
}
