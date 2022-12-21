import { Button, Box, Typography, Container, Link } from '@mui/material'
import { AppRoute, AuthorizationStatus } from '../../utils/consts'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthorizationStatus } from '../../hooks/useAuthorizationStatus'
import { useAppselector } from '../../hooks'
import { LoadingScreen } from '../../components/LoadingScreen/LoadingScreen'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '100px',
  },
  mainBtn: {
    margin: '20px',
    marginX: '40px',
    padding: '20px 80px',
    fontSize: '2rem',
  },
}

export const Home = () => {
  const navigate = useNavigate()
  const { isAuthorized } = useAuthorizationStatus()

  const handleClickGoToPageSigninButton = () => {
    navigate(`/${AppRoute.SignIn}`)
  }

  return (
    <Container disableGutters sx={styles.container}>
      <Box
        component="img"
        src="/HomeLogo.png"
        alt="HomeLogo"
        sx={{ height: '200px' }}
      />
      <Box
        sx={{
          margin: '30px',
          width: '1000px',
          border: '3px solid rgba(234,227,204,30%)',
          borderRadius: '5px',
          padding: '20px',
        }}>
        <Typography variant="body1">
          <Typography component="span" variant="h3" marginRight="5px">
            Headquarters Tank Battles
          </Typography>
          – бесплатная браузерная коллекционная карточная онлайн-игра,
          разработанная в жанре пошаговой стратегии. В основу игрового процесса
          заложены события Второй мировой войны. В ваше распоряжение поступает
          целая армия, состоящая из разного типа войск, наделенных своими
          уникальными характеристиками.
        </Typography>

        <Typography variant="body1" marginTop="20px">
          <Typography component="span" variant="h3" marginRight="5px">
            Ваша задача
          </Typography>
          – стать во главе воинского подразделения, в составе которого танки,
          пехота, артиллерия, представленные отдельными коллекционными картами.
        </Typography>

        <Typography variant="body1" marginTop="20px">
          <Typography component="span" variant="h3" marginRight="5px">
            Ваша цель
          </Typography>
          – уничтожение штаба противника. Дальнейшая прокачка техники и
          улучшений вашей армии. Развитие качественной стратегии боя.
          Восхождение к вершине в таблице лидеров среди остальных участников
          сражения.
        </Typography>

        <Typography variant="body1" marginTop="20px">
          Достижение успеха возможно благодаря грамотному распределению сил на
          поле брани. Исход сражения зависит даже от самого незначительного
          маневра. Абсолютную победу над противником вам принесут продуманная
          стратегия с верными тактическими ходами.
        </Typography>
      </Box>
      {!isAuthorized && (
        <Button
          onClick={handleClickGoToPageSigninButton}
          variant="secondary"
          sx={styles.mainBtn}>
          Войти
        </Button>
      )}
      <Typography
        variant="subtitle1"
        component="span"
        sx={{ marginTop: '20px' }}>
        <Link component={NavLink} to={`/${AppRoute.Briefing}`}>
          Подробнее об игре...
        </Link>
      </Typography>
    </Container>
  )
}
