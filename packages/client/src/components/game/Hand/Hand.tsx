import Box from '@mui/material/Box/Box'
import { FC } from 'react'
import { CardFace } from '../CardFace/CardFace'

interface IHand {
  cardsInHand: Record<string, string>[]
}

export const Hand: FC<IHand> = ({ cardsInHand }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {cardsInHand.map((_item, idx) => (
        <CardFace key={idx} />
      ))}
    </Box>
  )
}
