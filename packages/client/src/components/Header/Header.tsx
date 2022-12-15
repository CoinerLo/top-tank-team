import React from 'react'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { AppRoute } from '../../utils/consts'
import { Box, Button, Link as MuiLink } from '@mui/material'
import { useAuthorizationStatus } from '../../hooks/useAuthorizationStatus'

interface HeaderProps {
  handleLogout: () => void
}

export const Header: FC<HeaderProps> = ({ handleLogout }) => {
  const { isAuthorized } = useAuthorizationStatus()

  return (
    <Box
      component="header"
      sx={{
        position: 'absolute',
        width: '100vw',
        display: 'flex',
        justifyContent: 'space-between',
        paddingY: '7px',
        zIndex: 100,
        backgroundColor: '#000',
      }}>
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
      </Box>
    </Box>
  )
}
