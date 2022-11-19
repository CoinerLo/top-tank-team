import { useCallback } from 'react'
import { SubmitHandler } from 'react-hook-form/dist/types/form'
import { useAppDispatch } from '../hooks'
import { SignIn } from '../pages/SignIn'
import { loginThunk } from '../store/api-thunks'
import { ISignInData } from '../typings'
import { useNavigate } from 'react-router-dom'
import { AppRoute } from '../utils/consts'

export const SignInContainer = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmitSignInData: SubmitHandler<ISignInData> = useCallback(
    data => {
      dispatch(loginThunk(data))
      navigate(`/${AppRoute.Headquarters}`)
    },
    []
  )

  return <SignIn handleSubmitSignInData={handleSubmitSignInData} />
}
