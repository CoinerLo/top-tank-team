import { Box, Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AppRoute } from '../../utils/consts'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    position: 'absolute',
    left: 0,
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  statistic: {
    display: 'flex',
    padding: '20px 80px',
    border: '1px solid #373936',
    borderRadius: '5px',
    backgroundColor: '#373936',
  },
  cardCarusel: {
    width: '280px',
    height: '360px',
    marginTop: '150px',
    marginBottom: '75px',
    border: '1px solid #373936',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  mainBtn: {
    marginX: '40px',
    padding: '20px 80px',
    borderRadius: '5px',
    textTransform: 'uppercase',
    fontSize: '2rem',
    letterSpacing: '0.1px',
  },
  subBtn: {
    padding: '15px 25px',
    borderRadius: '5px',
    textTransform: 'uppercase',
  },
}

export const Headquarters = () => {
  const navigate = useNavigate()

  const startGame = () => {
    navigate(`/${AppRoute.Game}/${AppRoute.StartGame}`)
  }

  const navigateToDeck = () => {
    navigate(`/${AppRoute.Deck}`)
  }

  const navigateToUpgradeRoom = () => {
    navigate(`/${AppRoute.Upgrade}`)
  }

  return (
    <Container disableGutters sx={styles.container}>
      <Box sx={styles.avatar}>Аватар</Box>
      <Box sx={styles.statistic}>
        <Box marginRight="40px">монеты</Box>
        <Box marginLeft="40px">опыт</Box>
      </Box>
      <Box sx={styles.cardCarusel}>
        <div>
          Здесь будет карусель с колодами карт игрока, с дополнительной
          информацией о колоде
        </div>
      </Box>
      <Box sx={{}}>
        <Button onClick={navigateToDeck} variant="sub" sx={styles.subBtn}>
          Редактировать
        </Button>
        <Button onClick={startGame} variant="secondary" sx={styles.mainBtn}>
          В бой!
        </Button>
        <Button
          onClick={navigateToUpgradeRoom}
          variant="sub"
          sx={styles.subBtn}>
          Исследования
        </Button>
      </Box>
    </Container>
  )
}