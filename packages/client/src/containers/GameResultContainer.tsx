import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppselector } from '../hooks'
import { GameResult } from '../pages/GameDesk/GameResult'
import { addLeaderThunk } from '../store/api-thunks'
import { AppRoute } from '../utils/consts'

export const GameResultContainer = () => {
  const dispatch = useAppDispatch()
  const { leaders } = useAppselector(({ USER }) => USER)

  
  useEffect(() => {
    // console.log('ho')
    let arr:any[] = []
    let name, winner, all, ratingTopTank1
    if (leaders) {
      arr = leaders.filter((val:any) => {
        if (val.data.name == 'gamer8') {
          return true
        }
        return false
      })
      if (arr.length > 0 && arr[0].data) {
        ({ name, winner, all, ratingTopTank1 } = arr[0].data)
        all = all + 1
        ratingTopTank1 = winner / all * 5
      } else {
        name = 'gamer8'
        winner = 2
        all = 4
        ratingTopTank1 = winner / all * 5
      }
    } else {
      name = 'gamer8'
      winner = 2
      all = 4
      ratingTopTank1 = winner / all * 5
    }
    console.log(all)
    const data = {
      data: {
        name,
        winner,
        all,
        ratingTopTank1
      },
      ratingFieldName: 'ratingTopTank1',
      teamName: 'topTank1',
    }
    dispatch(addLeaderThunk(data))
  }, [])
  const { gameId } = useParams()
  const { game: games } = useAppselector(({ GAME }) => GAME)
  let game
  if (gameId) {
    game = games[gameId]
  }

  return game ? (
    <GameResult game={game} />
  ) : (
    <Navigate to={`/${AppRoute.Headquarters}`} />
  )
}
