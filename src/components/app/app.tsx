import MainScreen from '../../pages/main-screen/main-screen';
import {AppScreenProps} from './app-screen-props.ts';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {LoginScreen} from '../../pages/login-screen/login-screen.tsx';
import {FavoritesScreen} from '../../pages/favorites-screen/favorites-screen.tsx';
import {OfferScreen} from '../../pages/offer-screen/offer-screen.tsx';
import {NotFoundScreen} from '../../pages/not-found-screen/not-found-screen.tsx';
import {PrivateRoute} from '../private-route/private-route.tsx';
import {AppRoutes} from '../../app-routes.ts';


export function App({placesCount}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.MainScreen} element={<MainScreen placesCount={placesCount}/>}/>
        <Route path={AppRoutes.LoginScreen} element={<LoginScreen/>}/>
        <Route path={AppRoutes.FavoritesScreen} element={PrivateRoute(false, <FavoritesScreen />)}/>
        <Route path={AppRoutes.OfferScreen} element={<OfferScreen/>}/>
        <Route path={AppRoutes.NotFoundScreen} element={<NotFoundScreen/>}/>
      </Routes>
    </BrowserRouter>
  );
}
