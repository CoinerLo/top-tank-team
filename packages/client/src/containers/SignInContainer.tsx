import { useCallback } from 'react'
import { SubmitHandler } from 'react-hook-form/dist/types/form'
import { useAppDispatch } from '../hooks'
import { SignIn } from '../pages/SignIn'
import { loginThunk } from '../store/api-thunks'
import { ISignInData } from '../typings'

export const SignInContainer = () => {
  const dispatch = useAppDispatch()

  const handleSubmitSignInData: SubmitHandler<ISignInData> = useCallback(
    data => {
      dispatch(loginThunk(data))
    },
    []
  )

  return <SignIn handleSubmitSignInData={handleSubmitSignInData} />
}
