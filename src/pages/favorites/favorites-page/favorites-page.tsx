import { FavoriteEmptyOffers } from '../favorite-empty-offers/favorite-empty-offers.tsx';
import { LoadingScreen } from '../../loading-screen/loading-screen.tsx';
import { FavoritePage } from '../favorite-page/favorite-page.tsx';
import {FavoritesPageProps} from '@pages/favorites/favorites-page/favorites-page-props.ts';
import {memo} from 'react';

function FavoritesPage({ offers, onFavoriteStatusChanged }: FavoritesPageProps) {
  if (offers === undefined) {
    return (<LoadingScreen />);
  }

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        {

          offers.length <= 0
            ? <FavoriteEmptyOffers />
            :
            <FavoritePage
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

