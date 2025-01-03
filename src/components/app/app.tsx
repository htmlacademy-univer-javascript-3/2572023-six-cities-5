import MemoizedFavoritesPage from '@pages/favorites/favorites-page/favorites-page.tsx';
import MemoizedLoginPage from '@pages/login/login-page/login-page.tsx';
import MemoizedOfferPage from '@pages/offer/offer-page/offer-page.tsx';
import { MainPage } from '@pages/main/main-page/main-page.tsx';
import { NotFoundPage } from '@pages/not-found/not-found.tsx';
import { PrivateRoute } from '../private-route/private-route';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import { AppRoute, AuthStatus } from '../../const';
import { LoadingScreen } from '@pages/loading-screen/loading-screen.tsx';
import { AppLayout } from '../app-layout/app-layout';
import { HistoryRouter } from '../history-router/history-router';
import { browserHistory } from '../../browser-history';
import { Route, Routes } from 'react-router-dom';
import { AppDispatch } from '../../store';
import { changeFavoriteStatusAction, logoutAction } from '../../store/api-actions';
import { UserData } from '../../types/user-data';
import { Offer } from '../../types/offer';
import { FavoriteAction } from '../../types/favorite-action';
import { GuestRoute } from '../guest-route/guest-route';

export function App() {
  const authStatus = useSelector<AppState, AuthStatus>((state) => state.authStatus);
  const authorized = authStatus === AuthStatus.Auth;
  const isGuest = authStatus === AuthStatus.NoAuth;
  const userData = useSelector<AppState, UserData | undefined>((state) => state.userData);
  const offers = useSelector<AppState, Offer[]>((state) => state.offers);
  const isOffersLoading = useSelector<AppState, boolean>((state) => state.isOffersLoading);
  const favorites = useSelector<AppState, Offer[] | undefined>((state) => state.favoriteOffers);

  const dispatch = useDispatch<AppDispatch>();

  if (authStatus === AuthStatus.Unknown) {
    return (<LoadingScreen />);
  }

  const handleSignOutClick = () => {
    dispatch(logoutAction());
  };

  const handleFavoriteClick = (action: FavoriteAction) => {
    dispatch(changeFavoriteStatusAction(action));
  };

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route element={
          <AppLayout
            email={userData?.email}
            favoriteCount={favorites?.length}
            onSignOutClick={handleSignOutClick}
          />
        }
        >
          <Route path={AppRoute.Login}
            element={
              <GuestRoute isGuest={isGuest}>
                <MemoizedLoginPage />
              </GuestRoute>
            }
          />
          <Route path={AppRoute.Main}
            element={
              <MainPage
                offers={offers}
                isOffersLoading={isOffersLoading}
                canAddToFavorite={authorized}
                onFavoriteStatusChanged={handleFavoriteClick}
              />
            }
          />
          <Route path={AppRoute.Offer} element={
            <MemoizedOfferPage
              onFavoriteStatusChanged={handleFavoriteClick}
              canWriteComments={authorized}
              canAddToFavorite={authorized}
            />
          }
          />
          <Route path={AppRoute.Favorites}
            element={
              <PrivateRoute isAuthenticated={authorized}>
                <MemoizedFavoritesPage
                  offers={favorites}
                  onFavoriteStatusChanged={handleFavoriteClick}
                />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HistoryRouter>
  );
}
