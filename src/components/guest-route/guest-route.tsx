import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import {GuestRouteProps} from '@components/guest-route/guest-route-props.ts';

export function GuestRoute({isGuest, children}: GuestRouteProps): JSX.Element {
  return isGuest ? children : <Navigate to={AppRoute.Main} />;
}
