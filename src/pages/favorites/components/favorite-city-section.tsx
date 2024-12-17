import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { FavoriteList } from './favorite-list';
import { Offer } from '../../../types/offer';
import { FavoriteAction } from '../../../types/favorite-action';

export type FavoriteCitySectionProps = {
  city: string;
  offers: Offer[];
  onFavoriteStatusChanged: (action: FavoriteAction) => void;
}

export function FavoriteCitySection({ city, offers, onFavoriteStatusChanged }: FavoriteCitySectionProps) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link to={AppRoute.Main} className="locations__item-link">
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <FavoriteList
        offers={offers}
        onFavoriteStatusChanged={onFavoriteStatusChanged}
      />
    </li>
  );
}
