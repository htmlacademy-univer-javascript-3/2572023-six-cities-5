import { FavoriteAction } from '../../../types/favorite-action';
import { Offer } from '../../../types/offer';
import { FavoriteCitySection } from './favorite-city-section';

export type FavoritePageContentProps = {
  offers: Offer[];
  onFavoriteStatusChanged: (action: FavoriteAction) => void;
}

export function FavoritePageContent({ offers, onFavoriteStatusChanged }: FavoritePageContentProps) {
  const cities = Array.from(new Set(offers.map((offer) => offer.city.name)));

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {
          cities.map((city) => (
            <FavoriteCitySection
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
