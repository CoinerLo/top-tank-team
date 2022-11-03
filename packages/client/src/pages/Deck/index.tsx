import { Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { SubMenu } from '../../components/SubMenu'

const collection = [
  {
    name: 'M46 Patton'
  }, {
    name: 'ИС-7'
  }, {
    name: 'Panther II'
  }, {
    name: 'ИС-7'
  }, {
    name: 'T110E5'
  }, {
    name: 'Maus'
  }, {
    name: 'Объект 268'
  },
]

const deck = [
  {
    name: 'Т-54'
  }, {
    name: 'T-30'
  }, {
    name: 'Объект 261'
  }, {
    name: 'Объект 212'
  }, {
    name: 'Т-34-85'
  }, {
    name: 'Телефонисты'
  }, {
    name: 'T110E4'
  },
]

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}

export const DeckItem = (props: Record<string, string>) => {
  return (
    <Box sx={{ width: '100px', height: '200px' }}>
      {props.name}
    </Box>
  )
}

export const Deck = () => {
  return (
    <Container disableGutters  sx={styles.container}>
      <SubMenu />
      <Box sx={{ width: '80%', height: '70%', marginTop: '70px' }}>
        {/* кнопку возврата в ЛК скопируй из Upgrade */}
        <Box sx={{ flex: 1 }}>
          <Typography>Коллекция</Typography>
          {/* здесь карусель всех карт доступных игроку */}
        </Box>
        <Box>
          <Box sx={{ display: 'flex' }}>
            <Typography>Колода</Typography>
            <Typography>Название штаба</Typography>
            <Typography>{`${deck.length}/40`}</Typography>
          </Box>
          {/* здесь карусель калоды игрока */}
        </Box>
      </Box>
    </Container>
  )
}
