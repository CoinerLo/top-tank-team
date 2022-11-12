import { useCallback } from 'react'
import { Header } from '../components/Header/Header'
import { useAppDispatch } from '../hooks'
import { logoutAction } from '../store/api-actions'

export const HeaderContainer = () => {
  const dispatch = useAppDispatch()

  const handleLogout = useCallback(async () => {
    dispatch(logoutAction())
  }, [])

  return <Header handleLogout={handleLogout} />
}
