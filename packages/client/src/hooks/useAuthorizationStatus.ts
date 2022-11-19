import { useAppselector } from '.'
import { AuthorizationStatus } from '../utils/consts'

export const useAuthorizationStatus = () => {
  const { authorizationStatus } = useAppselector(({ USER }) => USER)
  return {
    isAuthorized: authorizationStatus === AuthorizationStatus.Auth,
  }
}
