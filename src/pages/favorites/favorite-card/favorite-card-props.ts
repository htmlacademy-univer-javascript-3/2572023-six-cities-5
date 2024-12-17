import {Offer} from '../../../types/offer.ts';
import {FavoriteAction} from '../../../types/favorite-action.ts';

export type FavoriteCardProps = {
  offer: Offer;
  onFavoriteStatusChanged: (action: FavoriteAction) => void;
}
