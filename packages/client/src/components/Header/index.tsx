import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppRoute } from '../../utils/consts'
import { Box, Container, Link as MuiLink } from '@mui/material'

export const Header = () => {
  const [gameId, setGameId] = useState('0')
  const navigate = useNavigate()

  const toGoGame = () => {
    navigate(`${AppRoute.Game}/${gameId}`)
  }

  const goOutGame = () => {
    navigate(`${AppRoute.Game}/${AppRoute.ResultGame}/${gameId}`)
  }

  return (
    <Container
      maxWidth="xl"
      component="header"
      sx={{
        position: 'absolute',
        display: 'flex',
        justifyContent: 'space-between',
        paddingY: '7px',
        backgroundColor: '#000',
      }}>
      <Box
        component="nav"
        sx={{ display: 'flex', flex: 1, justifyContent: 'space-around' }}>
        <MuiLink component={Link} to={AppRoute.SignIn}>
          Вход
        </MuiLink>
        <MuiLink component={Link} to={AppRoute.SignUp}>
          Регистрация
        </MuiLink>

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
      <div>
        <input
          type="text"
          placeholder="Номер игры"
          value={gameId}
          onChange={e => setGameId(e.currentTarget.value)}
        />
        <button onClick={toGoGame}>go</button>
        <button onClick={goOutGame}>esc</button>
      </div>
    </Container>
  )
}
