import { Offer } from '../../../../domain/models/offer';
import MemoizedFavoriteCard from './favorite-card';
import {memo} from 'react';

export type FavoriteListProps = {
  offers: Offer[];
}

function FavoriteList({ offers }: FavoriteListProps) {
  return (
    <div className='favorites__places'>
      {
        offers
          .map((offer) => (
            <MemoizedFavoriteCard
              key={offer.id}
              offer={offer}
            />)
          )
      }
    </div>
  );
}

const MemoizedFavoriteList = memo(FavoriteList);
export default MemoizedFavoriteList;
