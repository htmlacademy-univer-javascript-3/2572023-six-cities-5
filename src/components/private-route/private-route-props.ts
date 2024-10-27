import {AuthorizationStatus} from '../../authorization-status.ts';

export type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}
