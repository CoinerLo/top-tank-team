import { FC, memo } from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { ICollectionCardItem } from '../../typings'

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
  onClick: (item: ICollectionCardItem) => void
  item: ICollectionCardItem
}

export const Card: FC<ICardProps> = memo(({ item, onClick }) => {
  return (
    <Box onClick={() => onClick(item)} sx={styles.card}>
      <Typography sx={{ alignSelf: 'center' }}>{item.name}</Typography>
    </Box>
  )
})
