import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import {PrivateRouteProps} from '@components/private-route/private-route-props.ts';

export function PrivateRoute({isAuthenticated, children}: PrivateRouteProps): JSX.Element {
  return isAuthenticated ? children : <Navigate to={AppRoute.Login} />;
}
