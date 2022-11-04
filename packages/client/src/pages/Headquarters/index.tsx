import { Box, Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { SubMenu } from '../../components/SubMenu'
import { UserProfile } from '../../components/UserProfile/UserProfile'
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
  },
  cardCarousel: {
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
    fontSize: '2rem',
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
      <UserProfile containerStyle={styles.avatar} />
      <SubMenu />
      <Box sx={styles.cardCarousel}>
        <div>
          Здесь будет карусель с колодами карт игрока, с дополнительной
          информацией о колоде
        </div>
      </Box>
      <Box sx={{}}>
        <Button onClick={navigateToDeck} variant="sub">
          Редактировать
        </Button>
        <Button onClick={startGame} variant="secondary" sx={styles.mainBtn}>
          В бой!
        </Button>
        <Button onClick={navigateToUpgradeRoom} variant="sub">
          Исследования
        </Button>
      </Box>
    </Container>
  )
}
