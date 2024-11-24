import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import { AuthorizationStatus} from '../../authorization-status.ts';
import PrivateRoute from '@components/private-route/private-route';
import LoginScreen from '@pages/login-screen/login-screen';
import MainScreen from '@pages/main-screen/main-screen';
import OfferScreen from '@pages/offer-screen/offer-screen';
import FavoritesScreen from '@pages/favorites-screen/favorites-screen';
import NotFoundScreen from '@pages/not-found-screen/not-found-screen';
import {AppRoute} from '../../app-routes.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setOffersInDetails, setOffersList, setReviews} from '../../store/action.ts';

export default function App(): JSX.Element {
  const offers = useAppSelector((state) => state.offersList);
  const reviews = useAppSelector((state) => state.reviews);
  const offersInDetails = useAppSelector((state) => state.offersInDetails);
  const dispatch = useAppDispatch();
  dispatch(setOffersList(offers));
  dispatch(setReviews(reviews));
  dispatch(setOffersInDetails(offersInDetails));
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainScreen />}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginScreen />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <FavoritesScreen />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:id`}
            element={<OfferScreen />}
          />
          <Route
            path='*'
            element={<NotFoundScreen />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
