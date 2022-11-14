import { useCallback } from 'react'
import { Header } from '../components/Header/Header'
import { useAppDispatch } from '../hooks'
import { logoutThunk } from '../store/api-thunks'

export const HeaderContainer = () => {
  const dispatch = useAppDispatch()

  const handleLogout = useCallback(() => {
    dispatch(logoutThunk())
  }, [])

  return <Header handleLogout={handleLogout} />
}
