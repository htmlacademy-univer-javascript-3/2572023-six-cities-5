import {FavoriteAction} from '../../../types/favorite-action.ts';

export type OfferPageProps = {
  canWriteComments: boolean;
  canAddToFavorite: boolean;
  onFavoriteStatusChanged: (action: FavoriteAction) => void;
}
