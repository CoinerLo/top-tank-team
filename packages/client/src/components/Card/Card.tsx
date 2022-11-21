import { FC, memo } from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { Tank } from '../../gameCore/models/TanksDeck'

const styles = {
  card: {
    display: 'grid',
    height: '280px',
    width: '200px',
    backgroundColor: '#c03f3f',
    borderRadius: '5px 5px 0 0',
    textAlign: 'center',
  },
  cardButtonInfo: {
    background: 'grey',
    width: '100%',
    height: '20px',
    fontSize: '10px',
    pt: '5px',
    pb: '5px',
    borderRadius: '0 0 5px 5px',
  },
}

export interface ICardProps {
  handleCardClick: (item: Tank) => void
  item: Tank
}

export const Card: FC<ICardProps> = memo(({ item, handleCardClick }) => {
  return (
    <Box onClick={() => handleCardClick(item)} sx={styles.card}>
      <Typography sx={{ alignSelf: 'center' }}>{item.name}</Typography>
    </Box>
  )
})
