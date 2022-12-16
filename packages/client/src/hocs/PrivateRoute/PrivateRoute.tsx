import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthorizationStatus } from '../../hooks/useAuthorizationStatus'
import { AppRoute, AuthorizationStatus } from '../../utils/consts'
import { useAppselector } from '../../hooks'

type PrivateRouteProps = {
  children?: JSX.Element
}

export const PrivateRoute: FC<PrivateRouteProps> = props => {
  const { children } = props
  const { isAuthorized } = useAuthorizationStatus()
  const { authorizationStatus } = useAppselector(({ USER }) => USER)

  if (!isAuthorized && authorizationStatus !== AuthorizationStatus.Unknown) {
    return <Navigate to={`/${AppRoute.SignIn}`} replace />
  }

  return children ? children : <Outlet />
}
