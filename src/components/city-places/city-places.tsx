import { Offer, Offers } from '@typings/offer';
import { City } from '@typings/city';
import Map from '@components/map/map';
import { MapClassName } from '@const';
import SortingOptions from '@components/sorting-options/sorting-options';
import OffersList from '@components/offers-list/offers-list';
import { memo } from 'react';

type CityPlacesProps = {
  city: City;
  offers: Offers;
  selectedOffer: Offer | undefined;
  onActiveOfferChange: (offerId: string | null) => void;
}

function CityPlaces({city, offers, selectedOffer, onActiveOfferChange }: CityPlacesProps): JSX.Element {
  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{`${offers.length} places to stay in ${city.name}`}</b>
        <SortingOptions />
        <OffersList offers={offers} onActiveOfferChange={onActiveOfferChange} />
      </section>
      <div className="cities__right-section">
        <Map
          city={city}
          offers={offers}
          selectedOffer={selectedOffer}
          className={MapClassName.Main}
        />
      </div>
    </div>
  );
}

const MemoizedCityPlaces = memo(CityPlaces);
export default MemoizedCityPlaces;
