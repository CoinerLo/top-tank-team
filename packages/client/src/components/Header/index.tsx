import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppRoute } from '../../typings'
import './header.css'

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
    <header className="header">
      <nav className="header_nav">
        <Link to={AppRoute.SignIn}>Вход</Link>
        <Link to={AppRoute.SignUp}>Регистрация</Link>

        <Link to={AppRoute.Index}>Главная</Link>
        <Link to={AppRoute.Briefing}>Правила</Link>
        <Link to={AppRoute.Home}>Личное дело</Link>
        <Link to={AppRoute.Upgrade}>Исследования</Link>
        <Link to={AppRoute.Deck}>Мой отряд</Link>
        <Link to={AppRoute.Leaderboard}>Лучшие из лучших</Link>
        <Link to={AppRoute.Forum}>Форум</Link>
        <Link to={`${AppRoute.Game}/${AppRoute.StartGame}`}>В бой</Link>
      </nav>
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
    </header>
  )
}
