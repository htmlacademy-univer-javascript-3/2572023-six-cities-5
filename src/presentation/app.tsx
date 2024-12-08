import MemoizedFavoritesPage from './screens/favorites/favorites-page';
import MemoizedLoginPage from './screens/login/login-page';
import MemoizedMainPage from './screens/main/main-page';
import MemoizedMainPageOfferPage from './screens/offer/offer-page';
import MemoizedNotFoundPage from './screens/not-found/not-found';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '../routing/private-route';
import { AppRoutes } from '../routing/app-routes';
import { Provider } from 'react-redux';
import { appStateStore } from './store';

export function App() {
  return (
    <Provider store={appStateStore}>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoutes.login} element={<MemoizedLoginPage />} />
          <Route path={AppRoutes.main} element={<MemoizedMainPage />} />
          <Route path={AppRoutes.offer} element={<MemoizedMainPageOfferPage />} />
          <Route path={AppRoutes.favorites}
            element={
              <PrivateRoute isAuthenticated={false}>
                <MemoizedFavoritesPage offers={[]} />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<MemoizedNotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
