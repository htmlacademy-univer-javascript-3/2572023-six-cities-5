import {memo, useCallback, useState} from 'react';
import { Offer } from '../../../domain/models/offer';
import MemoizedOfferList from '../../components/offer-list';
import MemoizedMap from './components/map';
import MemoizedAppNavBar from '../../components/app-navbar';
import MemoizedCityHeader from './components/city-header';
import { selectCity, selectSorting } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { AppState } from '../../store/reducer';
import { SortOptions } from './components/sort-options';
import { SortType } from '../../../domain/models/sort-type';
import MemoizedLoadingScreen from './components/loading-screen';

function MainPage() {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const onMouseEnter = useCallback((id: string) => setActiveOfferId(id), []);
  const onMouseLeave = useCallback((id: string) => {
    if (activeOfferId === id) {
      setActiveOfferId(null);
    }
  }, [activeOfferId]);

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
      <MemoizedAppNavBar isActive={false} />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <MemoizedCityHeader
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
                  <MemoizedOfferList
                    offers={choosenOffers}
                    className={'cities__places-list places__list tabs__content'}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                  />
                </section>

                <div className="cities__right-section">
                  <MemoizedMap
                    city={choosenOffers[0].city}
                    offers={choosenOffers}
                    activeOfferId={activeOfferId}
                    className="cities__map map"
                  />
                </div>
              </div>
            </div>
            : <MemoizedLoadingScreen />
        }
      </main>
    </div>
  );
}

const MemoizedMainPage = memo(MainPage);
export default MemoizedMainPage;
