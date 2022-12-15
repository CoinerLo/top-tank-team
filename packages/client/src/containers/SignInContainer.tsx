import { useCallback, useEffect } from 'react'
import { SubmitHandler } from 'react-hook-form/dist/types/form'
import { useAppDispatch, useAppselector } from '../hooks'
import { SignIn } from '../pages/SignIn'
import {
  getUserThunk,
  loginThunk,
  yandexGetIdThunk,
  yandexSigninThunk,
} from '../store/api-thunks'
import { ISignInData } from '../typings'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppRoute, AuthorizationStatus } from '../utils/consts'
import { useAuthorizationStatus } from '../hooks/useAuthorizationStatus'
import { LoadingScreen } from '../components/LoadingScreen/LoadingScreen'

export const SignInContainer = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isAuthorized } = useAuthorizationStatus()
  const [searchParams, setSearchParams] = useSearchParams()

  const handleSubmitSignInData: SubmitHandler<ISignInData> = useCallback(
    data => {
      dispatch(loginThunk(data))
      navigate(`/${AppRoute.Headquarters}`)
    },
    []
  )

  useEffect(() => {
    const codeYandexOAuth = searchParams.get('code')

    if (isAuthorized) {
      dispatch(getUserThunk())
    }

    if (codeYandexOAuth && !isAuthorized) {
      const data = {
        code: `${codeYandexOAuth}`,
        redirect_uri: `/${AppRoute.SignIn}`,
      }
      dispatch(yandexSigninThunk(data))
      setSearchParams('')
    } else if (!isAuthorized) {
      dispatch(yandexGetIdThunk(`${window.location.href}`))
    }
  }, [])

  const { authorizationStatus } = useAppselector(({ USER }) => USER)

  return authorizationStatus === AuthorizationStatus.Unknown ? (
    <LoadingScreen />
  ) : (
    <SignIn handleSubmitSignInData={handleSubmitSignInData} />
  )
}
