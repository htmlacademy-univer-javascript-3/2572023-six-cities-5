import {Offer} from '../../../types/offer.ts';
import {FavoriteAction} from '../../../types/favorite-action.ts';

export type MainPageProps = {
  offers: Offer[];
  isOffersLoading: boolean;
  canAddToFavorite: boolean;
  onFavoriteStatusChanged: (action: FavoriteAction) => void;
};
