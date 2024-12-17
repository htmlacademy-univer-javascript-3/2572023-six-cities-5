import {Offer} from '../../types/offer.ts';
import {FavoriteAction} from '../../types/favorite-action.ts';

export type OfferListProps = {
  offers: Offer[];
  className: string;
  onFavoriteStatusChanged: (action: FavoriteAction) => void;
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: (id: string) => void;
}
