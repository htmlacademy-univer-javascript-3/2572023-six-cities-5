import { useState } from 'react';
import { Offer } from '../../../domain/models/offer';
import { OfferList } from '../../components/offer-list';
import { Map } from './components/map';
import { AppNavBar } from '../../components/app-navbar';
import { CityHeader } from './components/city-header';
import { selectCity, selectSorting } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { AppState } from '../../store/reducer';
import { SortOptions } from './components/sort-options';
import { SortType } from '../../../domain/models/sort-type';
import { LoadingScreen } from './components/loading-screen';

export function MainPage() {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  function onMouseEnter(id: string) {
    setActiveOfferId(id);
  }

  function onMouseLeave(id: string) {
    if (activeOfferId === id) {
      setActiveOfferId(null);
    }
  }

  const choosenCity = useSelector<AppState, string>((state) => state.selectedCity);
  const choosenSortType = useSelector<AppState, SortType>((state) => state.sortType);
  const offers = useSelector<AppState, Offer[]>((state) => state.offers);
  const cities = useSelector<AppState, string[]>((state) => state.cities);

  const choosenOffers = offers
    .filter((offer) => offer.city.name === choosenCity)
    .sort(
      (left, right) => {
        if (choosenSortType === SortType.PriceHighToLow) {
          return right.price - left.price;
        } else if (choosenSortType === SortType.PriceLowToHigh) {
          return left.price - right.price;
        } else if (choosenSortType === SortType.TopRatedFirst) {
          return right.rating - left.rating;
        }

        return 0;
      }
    );

  const dispatch = useDispatch<AppDispatch>();

  const handleCityChoose = (city: string) => {
    dispatch(selectCity(city));
  };

  const handleSortingChoose = (sortType: SortType) => {
    dispatch(selectSorting(sortType));
  };

  return (
    <div className="page page--gray page--main">
      <AppNavBar isActive={false} />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CityHeader
          city={choosenCity}
          cities={cities}
          onCityClicked={handleCityChoose}
        />
        {
          choosenOffers.length !== 0
            ?
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{choosenOffers.length} places to stay in {choosenCity}</b>
                  <SortOptions
                    sortType={choosenSortType}
                    handleSortingChoose={handleSortingChoose}
                  />
                  <OfferList
                    offers={choosenOffers}
                    className={'cities__places-list places__list tabs__content'}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                  />
                </section>

                <div className="cities__right-section">
                  <Map
                    city={choosenOffers[0].city}
                    offers={choosenOffers}
                    activeOfferId={activeOfferId}
                    className="cities__map map"
                  />
                </div>
              </div>
            </div>
            : <LoadingScreen />
        }
      </main>
    </div>
  );
}
