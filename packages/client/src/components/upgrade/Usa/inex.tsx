import { Box } from '@mui/system'
import { Key } from 'react'
import { ICardUpgrade } from '../../../typings'
import { CardUpgrade } from '../CardUpgrade'
import { HeadquartersCard } from '../HeadquartersCard'

const TrainingHeadquarters = {
  name: 'Training Camp',
}

const TrainingHeadquartersTechnicsFirstStage = [
  {
    name: 'Telephonists EF',
  },
  {
    name: 'M2 LT',
  },
  {
    name: 'Signalers CA',
  },
  {
    name: 'Together We Win',
  },
]

const TrainingHeadquartersTechnicsSecondStage = [
  {
    name: 'T57',
  },
  {
    name: 'T2 MT',
  },
  {
    name: 'M3 Stuart',
  },
  {
    name: 'T82',
  },
]

const styles = {
  row: {
    width: '100%',
    marginTop: '25px',
    display: 'flex',
    justifyContent: 'space-between',
  },
}

export const Usa = () => {
  const renderCards = (card: ICardUpgrade, idx: Key) => (
    <CardUpgrade key={idx} name={card.name} />
  )

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <HeadquartersCard name={TrainingHeadquarters.name} />
      <Box sx={styles.row}>
        {TrainingHeadquartersTechnicsFirstStage.map(renderCards)}
      </Box>
      <Box sx={styles.row}>
        {TrainingHeadquartersTechnicsSecondStage.map(renderCards)}
      </Box>
    </Box>
  )
}
