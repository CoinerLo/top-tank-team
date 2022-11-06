import { Box } from '@mui/system'
import { Key } from 'react'
import { ICardUpgrade } from '../../../typings'
import { CardUpgrade } from '../CardUpgrade'
import { HeadquartersCard } from '../HeadquartersCard'

const TrainingHeadquarters = {
  name: 'Trainingslager',
}

const TrainingHeadquartersTechnics = {
  first: [
    {
      name: 'Nachrichten 1.PD',
    },
    {
      name: 'Bison',
    },
    {
      name: 'Wir kommen',
    },
    {
      name: 'Pz38(t)',
    },
    {
      name: 'Pz35(t)',
    },
  ],
  second: [
    {
      name: 'Fernschreiber K',
    },
    {
      name: 'Kraft and List',
    },
    {
      name: 'Marder II',
    },
  ],
}

const styles = {
  row: {
    width: '100%',
    marginTop: '25px',
    display: 'flex',
    justifyContent: 'space-between',
  },
}

export const German = () => {
  const renderCards = (card: ICardUpgrade, idx: Key) => (
    <CardUpgrade key={idx} name={card.name} />
  )

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <HeadquartersCard name={TrainingHeadquarters.name} />
      <Box sx={styles.row}>
        {TrainingHeadquartersTechnics.first.map(renderCards)}
      </Box>
      <Box sx={styles.row}>
        {TrainingHeadquartersTechnics.second.map(renderCards)}
      </Box>
    </Box>
  )
}