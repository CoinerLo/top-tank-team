import { useCallback, useEffect } from 'react'
import { SubmitHandler } from 'react-hook-form/dist/types/form'
import { useAppDispatch } from '../hooks'
import { SignIn } from '../pages/SignIn'
import {
  loginThunk,
  getYandexIdThunk,
  signinYandexThunk,
} from '../store/api-thunks'
import { ISignInData } from '../typings'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppRoute } from '../utils/consts'
import { useAuthorizationStatus } from '../hooks/useAuthorizationStatus'

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
    const { protocol, host, pathname, href } = window.location
    const redirect_uri = `${protocol}//${host}${pathname}`

    if (codeYandexOAuth && !isAuthorized) {
      const data = {
        code: `${codeYandexOAuth}`,
        redirect_uri: `${redirect_uri}`,
      }
      dispatch(signinYandexThunk(data))
      setSearchParams('')
    } else if (!isAuthorized) {
      dispatch(getYandexIdThunk(href))
    }
  }, [])

  return <SignIn handleSubmitSignInData={handleSubmitSignInData} />
}
