import { useCallback } from 'react'
import { SubmitHandler } from 'react-hook-form/dist/types/form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks'
import { SignUp } from '../pages/SignUp'
import { getUserThunk, signUpThunk } from '../store/api-thunks'
import { ISingUpForm } from '../typings'
import { AppRoute } from '../utils/consts'

export const SignUpContainer = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmitSignUp: SubmitHandler<ISingUpForm> = useCallback(data => {
    dispatch(signUpThunk(data)).then(() => {
      dispatch(getUserThunk())
    })
    navigate(`/${AppRoute.Headquarters}`)
  }, [])

  return <SignUp handleSubmitSignUpData={handleSubmitSignUp} />
}
