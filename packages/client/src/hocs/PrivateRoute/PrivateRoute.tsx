import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AppRoute, AuthorizationStatus } from '../../utils/consts'
import { useAppselector } from '../../hooks'

type PrivateRouteProps = {
  children?: JSX.Element
}

export const PrivateRoute: FC<PrivateRouteProps> = props => {
  const { children } = props
  const { authorizationStatus } = useAppselector(({ USER }) => USER)

  if (authorizationStatus === AuthorizationStatus.NoAuth) {
    return <Navigate to={`/${AppRoute.SignIn}`} replace />
  }

  return children ? children : <Outlet />
}
