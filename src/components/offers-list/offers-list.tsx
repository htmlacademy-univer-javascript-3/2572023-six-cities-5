import PlaceCard from '@components/place-card/place-card';
import { useState, useEffect } from 'react';
import {OffersListProps} from '@components/offers-list/offer-list-props.ts';

export default function OffersList({offers, onChange}: OffersListProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  useEffect(() => {
    onChange(activeOfferId);
  }, [activeOfferId, onChange]);
  const handleMouseEnter = (offerId: string) => {
    setActiveOfferId(offerId);
  };

  const handleMouseLeave = () => {
    setActiveOfferId(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => handleMouseEnter(offer.id)}
          onMouseLeave={handleMouseLeave}
        />))}
    </div>
  );
}
