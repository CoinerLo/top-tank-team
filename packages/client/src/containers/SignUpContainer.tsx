import { useCallback } from 'react'
import { SubmitHandler } from 'react-hook-form/dist/types/form'
import { useNavigate } from 'react-router-dom'
import AuthController from '../controllers/AuthController'
import { SignUp } from '../pages/SignUp'
import { ISingUpForm } from '../typings'

export const SignUpContainer = () => {
  const handleSubmitSignUp: SubmitHandler<ISingUpForm> = useCallback(
    async data => {
      const navigate = useNavigate()
      const res = await AuthController.signup(data)
      if (res?.status == 200) {
        navigate('/headquarters')
      }
    },
    []
  )

  return <SignUp handleSubmitSignUp={handleSubmitSignUp} />
}