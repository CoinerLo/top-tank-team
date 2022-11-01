import { Container } from '@mui/material'
import { useParams } from 'react-router-dom'

export const GameResult = () => {
  const params = useParams()

  return (
    <Container disableGutters>
      This is GameResult! Number {params.gameId}
    </Container>
  )
}
