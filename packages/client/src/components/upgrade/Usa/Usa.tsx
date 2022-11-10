import { Box } from '@mui/system'
import { RenderCards } from '../CardUpgrade/RenderCards'
import { HeadquartersCard } from '../HeadquartersCard/HeadquartersCard'

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
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <HeadquartersCard name={TrainingHeadquarters.name} />
      <Box sx={styles.row}>
        {TrainingHeadquartersTechnicsFirstStage.map(RenderCards)}
      </Box>
      <Box sx={styles.row}>
        {TrainingHeadquartersTechnicsSecondStage.map(RenderCards)}
      </Box>
    </Box>
  )
}
