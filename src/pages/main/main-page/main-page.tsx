import { useState } from 'react';
import { OfferList } from '@components/offer-list/offer-list.tsx';
import { Map } from '../map/map.tsx';
import { CityHeader } from '../city-header/city-header.tsx';
import { redirectToRoute, selectCity, selectSorting } from '../../../store/action.ts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { AppState } from '../../../store/reducer.ts';
import { SortOptions } from '../sort-options/sort-options.tsx';
import { LoadingScreen } from '../../loading-screen/loading-screen.tsx';
import { SortType } from '../../../types/sort-type.ts';
import { FavoriteAction } from '../../../types/favorite-action.ts';
import { AppRoute } from '../../../const.ts';
import {MainPageProps} from '@pages/main/main-page/main-page-props.ts';

export function MainPage({ offers, isOffersLoading, canAddToFavorite, onFavoriteStatusChanged }: MainPageProps) {
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
  const cities = useSelector<AppState, string[]>((state) => state.cities);

  const dispatch = useDispatch<AppDispatch>();

  if (isOffersLoading) {
    return (<LoadingScreen />);
  }

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

  const handleCityChoose = (city: string) => {
    dispatch(selectCity(city));
  };

  const handleSortingChoose = (sortType: SortType) => {
    dispatch(selectSorting(sortType));
  };

  const handleFavoriteChanged = (action: FavoriteAction) => {
    if (canAddToFavorite) {
      onFavoriteStatusChanged(action);
    } else {
      dispatch(redirectToRoute(AppRoute.Login));
    }
  };

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <CityHeader
        city={choosenCity}
        cities={cities}
        onCityClicked={handleCityChoose}
      />
      <div className="cities">
        {
          offers.length > 0 ?
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
                  onFavoriteStatusChanged={handleFavoriteChanged}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                />
              </section>
              {
                choosenOffers.length > 0 &&
                <div className="cities__right-section">
                  <Map
                    city={choosenOffers[0].city}
                    offers={choosenOffers}
                    activeOfferId={activeOfferId}
                    className="cities__map map"
                  />
                </div>
              }
            </div> :
            <div className="cities">
              <div className="cities__places-container cities__places-container--empty container">
                <section className="cities__no-places">
                  <div className="cities__status-wrapper tabs__content">
                    <b className="cities__status">No places to stay available</b>
                    <p className="cities__status-description">We could not find any property available at the moment in {choosenCity}</p>
                  </div>
                </section>
                <div className="cities__right-section"></div>
              </div>
            </div>
        }
      </div>
    </main>
  );
}
