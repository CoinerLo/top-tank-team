import { FC, memo } from 'react'
import { Box } from '@mui/system'
import { Tank } from '../../gameCore/models/TanksDeck'
import { ImageByName } from '../../utils/consts'

const styles = {
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px',
    width: '200px',
    overflow: 'hidden',
    borderRadius: '5px 5px 0 0',
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
  cardImg: {
    width: '200px',
    height: '300px',
  },
}

export interface ICardProps {
  handleCardClick: (item: Tank) => void
  item: Tank
}

export const Card: FC<ICardProps> = memo(({ item, handleCardClick }) => {
  const { name } = item
  const srcImg = ImageByName[name]
  return (
    <Box onClick={() => handleCardClick(item)} sx={styles.card}>
      <Box component="img" src={srcImg} sx={styles.cardImg} />
    </Box>
  )
})
