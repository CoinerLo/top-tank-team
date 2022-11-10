import { useCallback } from 'react'
import { SubmitHandler } from 'react-hook-form/dist/types/form'
import { useNavigate } from 'react-router-dom'
import AuthController from '../controllers/AuthController'
import { SignIn } from '../pages/SignIn'
import { ISignInData } from '../typings'

export const SignInContainer = () => {
  const navigate = useNavigate()

  const handleSubmitSignInData: SubmitHandler<ISignInData> = useCallback(
    async data => {
      const res = await AuthController.signin(data)
      if (res?.status == 200) {
        navigate('/headquarters')
      }
    },
    []
  )

  return <SignIn handleSubmitSignInData={handleSubmitSignInData} />
}
