import { Offer } from '../../../../domain/models/offer';
import { FavoriteCard } from './favorite-card';

export type FavoriteListProps = {
  offers: Offer[];
}

export function FavoriteList({ offers }: FavoriteListProps) {
  return (
    <div className='favorites__places'>
      {
        offers
          .map((offer) => (
            <FavoriteCard
              key={offer.id}
              offer={offer}
            />)
          )
      }
    </div>
  );
}
