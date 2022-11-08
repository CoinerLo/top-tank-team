import { Box } from '@mui/system'
import { RenderCards } from '../CardUpgrade/RenderCards'
import { HeadquartersCard } from '../HeadquartersCard/HeadquartersCard'

const TrainingHeadquarters = {
  name: 'Учебная часть',
}

const TrainingHeadquartersTechnicsFirstStage = [
  {
    name: 'БТ-2',
  },
  {
    name: 'Артиллеристы 17',
  },
  {
    name: 'Обеспечение 8А',
  },
  {
    name: 'СУ-26',
  },
  {
    name: 'Отстоим!',
  },
]

const TrainingHeadquartersTechnicsSecondStage = [
  {
    name: 'Т-26',
  },
  {
    name: 'АТ-1',
  },
  {
    name: 'Болтун',
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

export const Ussr = () => {
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
