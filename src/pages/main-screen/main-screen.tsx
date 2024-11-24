import { Helmet } from 'react-helmet-async';
import Logo from '@components/logo/logo';
import Header from '@components/header/header.tsx';
import OffersList from '@components/offers-list/offers-list';
import Map from '@pages/map/map.tsx';
import {useEffect, useState} from 'react';
import {useAppSelector} from '../../hooks';
import {Offers} from '../../types/offer.ts';
import {Cities} from '@components/cities-list/cities.ts';
import CitiesList from '@components/cities-list/cities-list.tsx';
import SortingOptions from '@components/sorting-options/sorting-options.tsx';

export default function MainScreen(): JSX.Element {
  const offers = useAppSelector((state) => state.offersList);
  const [, setCurrentCityOffers] = useState<Offers>(offers);

  const city = useAppSelector((state) => state.city);
  useEffect(() => {
    const filteredOffers = offers.filter((offer) => offer.city.name === city);
    setCurrentCityOffers(filteredOffers);
  }, [city, offers]);

  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const selectedOffer = offers.find((offer) => offer.id === activeOfferId);

  const [currentSortType, setCurrentSortType] = useState('popular');

  const handleSortChange = (sortType: string) => {
    setCurrentSortType(sortType);
  };

  const sortedOffers = () => {
    switch (currentSortType) {
      case 'lowToHigh':
        return [...offers].sort((a, b) => a.price - b.price);
      case 'highToLow':
        return [...offers].sort((a, b) => b.price - a.price);
      case 'topRated':
        return [...offers].sort((a, b) => b.starsCount - a.starsCount);
      default:
        return offers; // 'popular' - оригинальный порядок
    }
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <Header offers={offers}/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={Cities}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{`${offers.length} places to stay in ${city}`}</b>
              <SortingOptions onSortChange={handleSortChange} currentSortType={currentSortType} />
              <OffersList offers={sortedOffers()} onChange={setActiveOfferId}/>
            </section>
            <div className="cities__right-section">
              <Map
                city={offers[0].city}
                offers={offers}
                selectedOffer={selectedOffer}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
