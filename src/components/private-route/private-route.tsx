import { Navigate } from 'react-router-dom';
import {AppRoutes} from '../../app-routes.ts';

export function PrivateRoute(authorized: boolean, element: JSX.Element) {
  return authorized ? element : <Navigate to={AppRoutes.LoginScreen} />;
}
