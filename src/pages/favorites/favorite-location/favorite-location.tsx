import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const.ts';
import { FavoritesPlaces } from '@pages/favorites/favorites-places/favorites-places.tsx';
import {FavoriteCitySectionProps} from '@pages/favorites/favorite-location/favorite-location-props.ts';

export function FavoriteLocation({ city, offers, onFavoriteStatusChanged }: FavoriteCitySectionProps) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link to={AppRoute.Main} className="locations__item-link">
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <FavoritesPlaces
        offers={offers}
        onFavoriteStatusChanged={onFavoriteStatusChanged}
      />
    </li>
  );
}
