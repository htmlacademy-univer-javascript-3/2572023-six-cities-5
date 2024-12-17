import {Offer} from '../../../types/offer.ts';
import {FavoriteAction} from '../../../types/favorite-action.ts';

export type FavoritesPageProps = {
  offers: Offer[] | undefined;
  onFavoriteStatusChanged: (action: FavoriteAction) => void;
};
