import { OfferItem } from '../offer-item/offer-item';
import {OfferListProps} from '@components/offer-list/offer-list-props.ts';

export function OfferList({ offers, className, onFavoriteStatusChanged, onMouseEnter, onMouseLeave }: OfferListProps) {
  return (
    <div className={className}>
      {
        offers
          .map((offer) => (
            <OfferItem
              key={offer.id}
              offer={offer}
              onFavoriteStatusChanged={onFavoriteStatusChanged}
              onMouseEnter={(id) => onMouseEnter?.(id)}
              onMouseLeave={(id) => onMouseLeave?.(id)}
            />)
          )
      }
    </div>
  );
}
