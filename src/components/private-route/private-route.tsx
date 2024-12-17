import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';

type PrivateRouteProps = {
  isAuthenticated: boolean;
  children: JSX.Element;
}

export function PrivateRoute({isAuthenticated, children}: PrivateRouteProps): JSX.Element {
  return isAuthenticated ? children : <Navigate to={AppRoute.Login} />;
}
