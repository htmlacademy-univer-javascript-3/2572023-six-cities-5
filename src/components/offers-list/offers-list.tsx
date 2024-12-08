import { Offers } from '@typings/offer';
import PlaceCard from '@components/place-card/place-card';
import { CardType } from '@const';
import { useState, useEffect, memo, useCallback } from 'react';

type OffersListProps = {
    offers: Offers;
    onActiveOfferChange: (offerId: string | null) => void;
};

function OffersList({offers, onActiveOfferChange}: OffersListProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  useEffect(() => {
    onActiveOfferChange(activeOfferId);
  }, [activeOfferId, onActiveOfferChange]);

  const handleMouseEnter = useCallback((offerId: string) => {
    setActiveOfferId(offerId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveOfferId(null);
  }, []);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => handleMouseEnter(offer.id)}
          onMouseLeave={handleMouseLeave}
          cardType={CardType.Regular}
        />))}
    </div>
  );
}

const MemoizedOffersList = memo(OffersList);
export default MemoizedOffersList;
