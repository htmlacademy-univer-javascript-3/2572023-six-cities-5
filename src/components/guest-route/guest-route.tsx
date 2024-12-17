import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';

type GuestRouteProps = {
  isGuest: boolean;
  children: JSX.Element;
}

export function GuestRoute({isGuest, children}: GuestRouteProps): JSX.Element {
  return isGuest ? children : <Navigate to={AppRoute.Main} />;
}
