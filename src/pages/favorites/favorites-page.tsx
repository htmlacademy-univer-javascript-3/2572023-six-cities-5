import { Offer } from '../../types/offer';
import { EmptyOffers } from './components/empty-offers';
import { LoadingScreen } from '../main/components/loading-screen';
import { FavoritePageContent } from './components/favorite-page-content';
import { FavoriteAction } from '../../types/favorite-action';
import {memo} from 'react';

export type FavoritesPageProps = {
  offers: Offer[] | undefined;
  onFavoriteStatusChanged: (action: FavoriteAction) => void;
};

function FavoritesPage({ offers, onFavoriteStatusChanged }: FavoritesPageProps) {
  if (offers === undefined) {
    return (<LoadingScreen />);
  }

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        {

          offers.length <= 0
            ? <EmptyOffers />
            :
            <FavoritePageContent
              offers={offers}
              onFavoriteStatusChanged={onFavoriteStatusChanged}
            />
        }
      </div>
    </main>
  );
}

const MemoizedFavoritesPage = memo(FavoritesPage);
export default MemoizedFavoritesPage;

