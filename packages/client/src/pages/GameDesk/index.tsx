import { useParams } from 'react-router-dom'

export const GameDesk = () => {
  const params = useParams()

  return <div>This is GameDesk! Number {params.gameId}</div>
}
