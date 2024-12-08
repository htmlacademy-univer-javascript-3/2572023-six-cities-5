import { Route, Routes } from 'react-router-dom';
import HistoryRouter from '@components/history-route/history-route';
import browserHistory from '@browser-history';
import {HelmetProvider} from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '@const';
import PrivateRoute from '@components/private-route/private-route';
import LoginScreen from '@pages/login-screen/login-screen';
import MainScreen from '@pages/main-screen/main-screen';
import OfferScreen from '@pages/offer-screen/offer-screen';
import FavoritesScreen from '@pages/favorites-screen/favorites-screen';
import NotFoundScreen from '@pages/not-found-screen/not-found-screen';
import { useAppSelector } from '@hooks/index';
import LoadingScreen from '@pages/loading-screen/loading-screen';
import { getAuthorizationStatus } from '@store/user-process/selectors';
import { getOffersDataLoadingStatus } from '@store/offers-data/selectors';

export default function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainScreen/>}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginScreen/>}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <FavoritesScreen/>
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:id`}
            element={<OfferScreen/>}
          />
          <Route
            path='*'
            element={<NotFoundScreen />}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}
