import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, State } from '../typings/redux'

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppselector: TypedUseSelectorHook<State> = useSelector
