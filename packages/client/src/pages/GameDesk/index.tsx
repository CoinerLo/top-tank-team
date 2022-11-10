import { Container } from '@mui/material'
import { useParams } from 'react-router-dom'

export const GameDesk = () => {
  const params = useParams()

  return (
    <Container disableGutters>
      This is GameDesk! Number {params.gameId}
    </Container>
  )
}
