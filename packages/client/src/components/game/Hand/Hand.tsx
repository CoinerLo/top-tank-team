import Box from '@mui/material/Box/Box'
import React, { FC, useState } from 'react'
import { CardsDeckType } from '../../../gameCore/types'
import { ImageByName } from '../../../utils/consts'
import { CardFace } from '../CardFace/CardFace'

interface IHand {
  cardsInHand: CardsDeckType[]
  isActive: boolean
  isOpponent: boolean
  handleChoiceActiveCardInHand: (idCard: string) => void
}

const styles = {
  card: {
    width: '100px',
    height: '150px',
    cursor: 'pointer',
  },
  activeCard: {
    position: 'absolute',
    transform: 'scale(0.7, 0.7) translate(20%, -150%);',
    transformOrigin: 'right bottom',
    transition: 'transform 0.5s ease-in-out',
    cursor: 'pointer',
  },
  opponentActiveCard: {
    position: 'absolute',
    transform: 'scale(0.7, 0.7) translate(0, 30%);',
    transformOrigin: 'right bottom',
    transition: 'transform 0.5s ease-in-out',
    cursor: 'pointer',
  },
}

export const Hand: FC<IHand> = ({
  cardsInHand,
  isActive,
  isOpponent,
  handleChoiceActiveCardInHand,
}) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null)

  const handleClickOnCard = (id: string) => () => {
    if (!activeCardId) {
      setActiveCardId(id)
      handleChoiceActiveCardInHand(id)
      return
    }

    if (activeCardId === id) {
      setActiveCardId(null)
      handleChoiceActiveCardInHand('')
      return
    }

    handleChoiceActiveCardInHand(id)
    setActiveCardId(id) // здесь логика так расписана на будущее, с движком эти события будут по другому обрабатываться
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {cardsInHand.map(card => {
        const { id, name } = card
        const srcImg = ImageByName[name]
        return isActive ? (
          <Box
            onClick={handleClickOnCard(id)}
            key={id}
            sx={
              activeCardId && activeCardId === id
                ? isOpponent
                  ? styles.opponentActiveCard
                  : styles.activeCard
                : styles.card
            }
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
