import {Offer} from '../../../types/offer.ts';
import {FavoriteAction} from '../../../types/favorite-action.ts';

export type FavoritePageContentProps = {
  offers: Offer[];
  onFavoriteStatusChanged: (action: FavoriteAction) => void;
}
