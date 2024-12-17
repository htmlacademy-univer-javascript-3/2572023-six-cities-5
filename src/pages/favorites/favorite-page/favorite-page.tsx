import { FavoriteLocation } from '../favorite-location/favorite-location.tsx';
import {FavoritePageContentProps} from '@pages/favorites/favorite-page/favorite-page-props.ts';

export function FavoritePage({ offers, onFavoriteStatusChanged }: FavoritePageContentProps) {
  const cities = Array.from(new Set(offers.map((offer) => offer.city.name)));

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {
          cities.map((city) => (
            <FavoriteLocation
              key={city}
              city={city}
              offers={offers.filter((offer) => offer.city.name === city)}
              onFavoriteStatusChanged={onFavoriteStatusChanged}
            />)
          )
        }
      </ul>
    </section>
  );
}
