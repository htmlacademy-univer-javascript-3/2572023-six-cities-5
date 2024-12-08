import { Offer } from '../../domain/models/offer';
import MemoizedOfferItem from './offer-item.tsx';
import {memo} from 'react';

export type OfferListProps = {
  offers: Offer[];
  className: string;
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: (id: string) => void;
}

function OfferList({ offers, className, onMouseEnter, onMouseLeave }: OfferListProps) {
  return (
    <div className={className}>
      {
        offers
          .map((offer) => (
            <MemoizedOfferItem
              key={offer.id}
              offer={offer}
              onMouseEnter={(id) => onMouseEnter?.(id)}
              onMouseLeave={(id) => onMouseLeave?.(id)}
            />)
          )
      }
    </div>
  );
}

const MemoizedOfferList = memo(OfferList);
export default MemoizedOfferList;
