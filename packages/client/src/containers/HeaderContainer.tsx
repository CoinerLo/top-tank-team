import { useCallback } from 'react'
import { Header } from '../components/Header/Header'
import { useAppDispatch } from '../hooks'
import { logoutThunk } from '../store/api-thunks'
import { useNavigate } from 'react-router-dom'
import { AppRoute } from '../utils/consts'

export const HeaderContainer = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = useCallback(() => {
    dispatch(logoutThunk())
    navigate(`/${AppRoute.SignIn}`)
  }, [])

  return <Header handleLogout={handleLogout} />
}
