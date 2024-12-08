import { Link } from 'react-router-dom';
import PlaceCard from '@components/place-card/place-card';
import { CardType } from '@const';
import { Offers } from '@typings/offer';
import { memo } from 'react';

interface FavoritesListProps {
  cities: string[];
  favorites: Offers;
}

function FavoritesList({ cities, favorites }: FavoritesListProps): JSX.Element {
  return (
    <ul className="favorites__list">
      {cities.map((city) => (
        <li key={city} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="#">
                <span>{city}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {favorites
              .filter((favorite) => favorite.city.name === city)
              .map((favorite) => (
                <PlaceCard
                  key={favorite.id}
                  offer={favorite}
                  onMouseEnter={() => {}}
                  onMouseLeave={() => {}}
                  cardType={CardType.Favorites}
                />
              ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

const MemoizedFavoritesList = memo(FavoritesList);
export default MemoizedFavoritesList;
