import {Navigate} from 'react-router-dom';
import { AuthorizationStatus} from '../../authorization-status.ts';
import {AppRoute} from '../../app-routes.ts';
import {PrivateRouteProps} from '@components/private-route/private-route-props.ts';

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
