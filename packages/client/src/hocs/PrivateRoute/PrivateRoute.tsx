import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthorizationStatus } from '../../hooks/useAuthorizationStatus'
import { AppRoute } from '../../utils/consts'

type PrivateRouteProps = {
  children?: JSX.Element
}

export const PrivateRoute: FC<PrivateRouteProps> = props => {
  const { children } = props
  const { isAuthorized } = useAuthorizationStatus()

  if (!isAuthorized) {
    return <Navigate to={`/${AppRoute.SignIn}`} replace />
  }

  return children ? children : <Outlet />
}
