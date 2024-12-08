import { Offer } from '../../domain/models/offer';
import { OfferItem } from './offer-item';

export type OfferListProps = {
  offers: Offer[];
  className: string;
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: (id: string) => void;
}

export function OfferList({ offers, className, onMouseEnter, onMouseLeave }: OfferListProps) {
  return (
    <div className={className}>
      {
        offers
          .map((offer) => (
            <OfferItem
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
