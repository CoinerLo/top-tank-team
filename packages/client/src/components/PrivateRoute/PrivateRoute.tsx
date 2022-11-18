

import { FC } from 'react';
import { Navigate, RouteProps } from 'react-router-dom';
import { useAppselector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../utils/consts';

type PrivateRouteProps = RouteProps & {
  children: JSX.Element;
}

export const PrivateRoute: FC<PrivateRouteProps> = (props) => {
  const { children } = props
  const {authorizationStatus} = useAppselector(({USER}) => USER)
  console.log(authorizationStatus);
  

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={`/${AppRoute.SignIn}`}/>
  );
}
