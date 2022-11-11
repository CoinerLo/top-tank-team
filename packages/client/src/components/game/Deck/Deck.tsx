import { Box, Typography } from '@mui/material'
import { FC } from 'react'

interface IDeck {
  userName: string
  cardCountInDeck: number
  cardCountThrown: number
}

export const Deck: FC<IDeck> = ({
  userName,
  cardCountInDeck,
  cardCountThrown,
}) => {
  return (
    <Box
      sx={{
        width: '105px',
        height: '148px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'url("/cards/card-face.png")',
        backgroundSize: 'cover',
      }}>
      <Typography
        sx={{ mb: '30px', fontSize: '13px' }}>{`${userName}`}</Typography>
      <Typography fontSize="36px">{cardCountInDeck}</Typography>
      <Typography sx={{ mt: '10px', fontSize: '12px' }}>
        {cardCountThrown}
      </Typography>
    </Box>
  )
}
