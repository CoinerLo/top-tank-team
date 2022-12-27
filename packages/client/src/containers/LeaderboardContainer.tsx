import { useEffect } from 'react'
import { useAppDispatch } from '../hooks'
import { LeaderBoard } from '../pages/LeaderBoard'
import { getAllLeaderThunk } from '../store/api-thunks'

export const LeaderboardContainer = () => {
  const dispatch = useAppDispatch()
  // const navigate = useNavigate()

  // const handleSubmitSignUp: SubmitHandler<ISingUpForm> = useCallback(data => {
    useEffect(() => {
      const data = {
        ratingFieldName: 'ratingTopTank1',
        cursor: 0,
        limit: 10,
      }
      dispatch(getAllLeaderThunk(data))
      // navigate(`/${AppRoute.Headquarters}`)
    // }, [])
    }, [])

  return <LeaderBoard />
}
