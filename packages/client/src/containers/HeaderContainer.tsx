import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import AuthController from '../controllers/AuthController'

export const HeaderContainer = () => {
  const navigate = useNavigate()

  const handleLogout = useCallback(async () => {
    const res = await AuthController.logout()
    if (res?.status == 200) {
      navigate('/')
    }
  }, [])

  return <Header handleLogout={handleLogout} />
}
