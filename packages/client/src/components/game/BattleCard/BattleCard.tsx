import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import { IHeadquarters } from '../../../gameCore/types'
import { BattleCardIcons } from '../../../utils/consts'

type BattleCardType = 'training' | 'tt' | 'pt' | 'lt' | 'st' | 'say'

interface IBattleCard {
  card: Pick<IHeadquarters, 'name' | 'bringsResources' | 'icon'>
  battleCardType: BattleCardType
}

const styles = {
  base: {
    width: '170px',
    height: '170px',
    position: 'absolute',
    zIndex: 10,
  },
  baseImg: {
    width: '150px',
    height: '125px',
    position: 'absolute',
    right: 10,
    bottom: 9,
  },
  headIcon: {
    width: '20px',
    height: '18px',
    position: 'absolute',
    top: 10,
    left: 3,
    zIndex: 20,
  },
  name: {
    width: '100px',
    position: 'absolute',
    top: 10,
    left: 25,
    zIndex: 20,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.4)',
  },
  bringsResourcesIcon: {
    width: '39px',
    height: '39px',
    position: 'absolute',
    top: 2,
    right: 2,
    zIndex: 20,
  },
  bringsResources: {
    width: '39px',
    height: '39px',
    position: 'absolute',
    top: 13,
    zIndex: 30,
    color: '#000',
    fontSize: '15px',
    fontWeight: 900,
    letterSpacing: '-3px',
  },
}

export const BattleCard: FC<IBattleCard> = ({ card, battleCardType }) => {
  const { bringsResources, name, icon } = card
  return (
    <Box sx={{ width: '170px', height: '170px', position: 'relative' }}>
      <Box component="img" src="/cards/battleCard.png" sx={styles.base} />
      <Box component="img" src={icon} sx={styles.baseImg} />
      <Box
        component="img"
        src={BattleCardIcons[battleCardType]}
        sx={styles.headIcon}
      />
      <Typography sx={styles.name}>{name}</Typography>
      {bringsResources && (
        <>
          <Box
            component="img"
            src="/cards/bringsResources.png"
            sx={styles.bringsResourcesIcon}
          />
          <Typography
            sx={{
              ...styles.bringsResources,
              right: bringsResources > 9 ? -11 : -15,
            }}>
            {bringsResources}
          </Typography>
        </>
      )}
    </Box>
  )
}
