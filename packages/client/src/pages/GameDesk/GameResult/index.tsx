import { useParams } from 'react-router-dom'

export const GameResult = () => {
  const params = useParams()

  return <div>This is GameResult! Number {params.gameId}</div>
}
