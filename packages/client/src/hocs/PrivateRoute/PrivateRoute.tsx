import { FC } from 'react'
import { Navigate, RouteProps } from 'react-router-dom'
import { useAuthorizationStatus } from '../../hooks/useAuthorizationStatus'
import { AppRoute } from '../../utils/consts'

type PrivateRouteProps = RouteProps & {
  children: JSX.Element
}

export const PrivateRoute: FC<PrivateRouteProps> = props => {
  const { children } = props
  const { isAuthorized } = useAuthorizationStatus()

  return isAuthorized ? children : <Navigate to={`/${AppRoute.SignIn}`} />
}
