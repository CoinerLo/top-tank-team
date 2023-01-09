import { FC, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppRoute } from '../../utils/consts'
import {
  Box,
  Button,
  IconButton,
  Link as MuiLink,
  Theme,
  useTheme,
} from '@mui/material'
import { useAuthorizationStatus } from '../../hooks/useAuthorizationStatus'
import { ColorModeContext } from '../../context/ColorMode'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import AcUnitIcon from '@mui/icons-material/AcUnit'

interface HeaderProps {
  handleLogout: () => void
}

const styles = {
  container: {
    position: 'absolute',
    width: '100vw',
    display: 'flex',
    justifyContent: 'space-between',
    paddingY: '7px',
    zIndex: 100,
  },
  baseContainer: (theme: Theme) =>
    theme.palette.mode === 'dark'
      ? {
          ...styles.container,
          backgroundColor: '#000',
        }
      : {
          ...styles.container,
          background: `linear-gradient(
            180deg,
            hsl(0deg 0% 80%) 0%,
            hsl(0deg 0% 80%) 11%,
            hsl(0deg 0% 78%) 22%,
            hsl(0deg 0% 67%) 33%,
            hsl(0deg 0% 56%) 44%,
            hsl(0deg 0% 44%) 56%,
            hsl(0deg 0% 33%) 67%,
            hsl(0deg 0% 22%) 78%,
            hsl(0deg 0% 22%) 89%,
            hsl(0deg 0% 22%) 100%
          )`,
        },
}

export const Header: FC<HeaderProps> = ({ handleLogout }) => {
  const { isAuthorized } = useAuthorizationStatus()
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  return (
    <Box component="header" sx={styles.baseContainer(theme)}>
      {isAuthorized && (
        <Button
          variant="sizeSmall"
          onClick={handleLogout}
          fullWidth
          disableElevation
          sx={{
            fontSize: '1rem',
            fontWeight: 500,
            ':hover': {
              backgroundColor: '#E8AA00',
            },
            textTransform: 'none',
            padding: '0px 16px',
            height: '23px',
            color: theme.palette.mode === 'dark' ? 'inherit' : '#000',
          }}>
          Выход
        </Button>
      )}
      <Box
        component="nav"
        sx={{ display: 'flex', flex: 1, justifyContent: 'space-around' }}>
        {!isAuthorized && (
          <>
            <MuiLink component={Link} to={AppRoute.SignIn}>
              Вход
            </MuiLink>
            <MuiLink component={Link} to={AppRoute.SignUp}>
              Регистрация
            </MuiLink>
          </>
        )}

        <MuiLink component={Link} to={AppRoute.Index}>
          Главная
        </MuiLink>
        <MuiLink component={Link} to={AppRoute.Briefing}>
          Правила
        </MuiLink>
        <MuiLink component={Link} to={AppRoute.Headquarters}>
          Штаб
        </MuiLink>
        <MuiLink component={Link} to={AppRoute.Upgrade}>
          Исследования
        </MuiLink>
        <MuiLink component={Link} to={AppRoute.Deck}>
          Мой отряд
        </MuiLink>
        <MuiLink component={Link} to={AppRoute.Leaderboard}>
          Лучшие из лучших
        </MuiLink>
        <MuiLink component={Link} to={AppRoute.Forum}>
          Форум
        </MuiLink>
        <IconButton
          sx={{ w: '23px', h: '23px', p: 0 }}
          onClick={colorMode.toggleColorMode}
          color="inherit">
          {theme.palette.mode === 'dark' ? (
            <AcUnitIcon sx={{ width: '23px', height: '23px' }} />
          ) : (
            <WbSunnyIcon
              sx={{
                width: '23px',
                height: '23px',
                color: '#404040',
                boxShadow: '0 0 5px 5px #d9d9d9',
                borderRadius: '50%',
                background: '#d9d9d9',
              }}
            />
          )}
        </IconButton>
      </Box>
    </Box>
  )
}
