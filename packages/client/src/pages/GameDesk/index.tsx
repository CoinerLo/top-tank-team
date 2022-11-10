import { Box, Container, Typography } from '@mui/material'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const opponentCardsInHand = [ {}, {}, {}, {} ]

const path = '/cards/images/fields/'

const fields = [
  `${path}scouts-1-field.png`,
  `${path}signalers-2-field.png`,
  `${path}artillerymen-3-field.png`,
  `${path}doctors-4-field.png`,
  `${path}engineers-5-field.png`,
]

const Field = ({ url }) => {
  return (
    <Box sx={{ width: '74px', height: '67px', background: `url("${url}")`, backgroundSize: 'cover' }}>

    </Box>
  )
}

const Card = () => {
  return (
    <Box sx={{ width: '105px', height: '148px', background: 'url("/cards/card-face.png")', backgroundSize: 'cover' }}>

    </Box>
  )
}

const Deck = () => {
  return (
    <Box sx={{ width: '105px', height: '148px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'url("/cards/card-face.png")', backgroundSize: 'cover' }}>
      <Typography fontSize='36px' >{opponentCardsInHand.length}</Typography>
    </Box>
  )
}

const OpponentHand = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      {opponentCardsInHand.map((item, idx) => <Card key={idx} />)}
    </Box>
  )
}

export const GameDesk = () => {
  const [opponentDeck, setOpponentDeck] = useState(34);
  const params = useParams()
  console.log(params.gameId)
  return (
    <Container disableGutters>
      <Box sx={{ my: '10px', mx: 'auto' }}>
        <Box sx={{ display: 'flex', ml: '20px' }}>
          <Box>
            <OpponentHand />
          </Box>
          <Box sx={{ ml: '20px' }}>
            <Deck />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', my: '10px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', mr: '10px' }}>
            {fields.map((field, idx) => <Field url={field} key={idx} />)}
            Timer
          </Box>
          <Box sx={{ width: '850px', height: '510px', border: '1px solid #fff' }}>

          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', ml: '10px' }}>
            Timer
            {fields.map((field, idx) => <Field url={field} key={idx} />)}

          </Box>
        </Box>
        <Box>
          <Box sx={{ display: 'flex', ml: '20px' }}>
            <Box>
              <OpponentHand />
            </Box>
            <Box sx={{ ml: '20px' }}>
              <Deck />
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
