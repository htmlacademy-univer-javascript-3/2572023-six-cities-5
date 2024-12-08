import { Helmet } from 'react-helmet-async';
import Logo from '@components/logo/logo';
import HeaderNav from '@components/header-nav/header-nav';
import { useState, useMemo } from 'react';
import CitiesList from '@components/cities-list/cities-list';
import { useAppSelector } from '@hooks/index';
import { SortType } from '@const';
import CityPlacesEmpty from '@components/city-places-empty/city-place-empty';
import CityPlaces from '@components/city-places/city-places';
import { getOffers } from '@store/offers-data/selectors';
import { getCity, getSortType } from '@store/app-data/selectors';

export default function MainScreen(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const city = useAppSelector(getCity);
  const sortType = useAppSelector(getSortType);

  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const selectedOffer = useMemo(() => offers.find((offer) => offer.id === activeOfferId), [activeOfferId, offers]);

  const currentCityOffers = useMemo(() => {
    const filteredOffers = offers.filter((offer) => offer.city.name === city.name);

    return [...filteredOffers].sort((a, b) => {
      switch (sortType) {
        case SortType.PriceLowToHigh:
          return a.price - b.price;
        case SortType.PriceHighToLow:
          return b.price - a.price;
        case SortType.TopRated:
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [city, offers, sortType]);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <HeaderNav/>
          </div>
        </div>
      </header>

      <main className={`page__main page__main--index ${currentCityOffers.length === 0 ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList/>
          </section>
        </div>
        <div className="cities">
          {currentCityOffers.length > 0 ? (
            <CityPlaces
              city={city}
              offers={currentCityOffers}
              selectedOffer={selectedOffer}
              onActiveOfferChange={setActiveOfferId}
            />
          ) : (
            <CityPlacesEmpty city={city.name} />
          )}
        </div>
      </main>
    </div>
  );
}
