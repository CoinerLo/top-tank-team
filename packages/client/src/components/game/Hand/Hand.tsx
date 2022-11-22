import Box from '@mui/material/Box/Box'
import { FC } from 'react'
import { CardsDeckType } from '../../../gameCore/types'
import { ImageByName } from '../../../utils/consts'
import { CardFace } from '../CardFace/CardFace'

interface IHand {
  cardsInHand: CardsDeckType[]
  isActive: boolean
}

export const Hand: FC<IHand> = ({ cardsInHand, isActive }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {cardsInHand.map(card => {
        const { id, name } = card
        const srcImg = ImageByName[name]
        return isActive ? (
          <Box
            sx={{ width: '100px', height: '150px' }}
            component="img"
            src={srcImg}
            alt="Изображение карточки"
          />
        ) : (
          <CardFace key={id} />
        )
      })}
    </Box>
  )
}
