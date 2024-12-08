import {Navigate} from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '@const';
import {PrivateRouteProps} from '@components/private-route/private-route-props.ts';

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
