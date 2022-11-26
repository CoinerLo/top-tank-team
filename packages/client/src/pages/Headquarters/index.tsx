import { Box, Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { SubMenu } from '../../components/SubMenu/SubMenu'
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
    height: '420px',
    marginTop: '100px',
    marginBottom: '75px',
  },
  mainBtn: {
    marginX: '40px',
    padding: '20px 83px',
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
        <Box
          sx={{ width: '280px', height: '420px' }}
          component="img"
          src="/cards/headquarters/ussr.png"
          alt="Изображение штаба"
        />
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
