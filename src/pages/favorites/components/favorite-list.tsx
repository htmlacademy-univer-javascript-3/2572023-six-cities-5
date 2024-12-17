import { FavoriteAction } from '../../../types/favorite-action';
import { Offer } from '../../../types/offer';
import { FavoriteCard } from './favorite-card';

export type FavoriteListProps = {
  offers: Offer[];
  onFavoriteStatusChanged: (action: FavoriteAction) => void;
}

export function FavoriteList({ offers, onFavoriteStatusChanged }: FavoriteListProps) {
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
