import { FavoriteCard } from '../favorite-card/favorite-card.tsx';
import {FavoritesPlacesProps} from '@pages/favorites/favorites-places/favorites-places-props.ts';

export function FavoritesPlaces({ offers, onFavoriteStatusChanged }: FavoritesPlacesProps) {
  return (
    <div className='favorites__places'>
      {
        offers
          .map((offer) => (
            <FavoriteCard
              key={offer.id}
              offer={offer}
              onFavoriteStatusChanged={onFavoriteStatusChanged}
            />)
          )
      }
    </div>
  );
}
