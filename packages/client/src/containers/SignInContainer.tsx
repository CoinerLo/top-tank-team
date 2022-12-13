import { useCallback, useEffect, useLayoutEffect } from 'react'
import { SubmitHandler } from 'react-hook-form/dist/types/form'
import { useAppDispatch } from '../hooks'
import { SignIn } from '../pages/SignIn'
import { loginThunk, yandexSigninThunk } from '../store/api-thunks'
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
    if (codeYandexOAuth && !isAuthorized) {
      const data = {
        code: `${codeYandexOAuth}`,
        redirect_uri: `/${AppRoute.SignIn}`,
      }
      dispatch(yandexSigninThunk(data))
      setSearchParams('')
    }
  }, [])

  return <SignIn handleSubmitSignInData={handleSubmitSignInData} />
}
