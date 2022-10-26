import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './header.css'

export const Header = () => {
  const [gameId, setGameId] = useState('0')
  const navigate = useNavigate()

  const toGoGame = () => {
    navigate(`game/${gameId}`)
  }

  const goOutGame = () => {
    navigate(`game/result/${gameId}`)
  }

  return (
    <div className="header">
      <nav className="header_nav">
        <Link to="signin">Вход</Link>
        <Link to="signup">Регистрация</Link>

        <Link to="/">Главная</Link>
        <Link to="briefing">Правила</Link>
        <Link to="home">Личное дело</Link>
        <Link to="upgrade">Исследования</Link>
        <Link to="deck">Мой отряд</Link>
        <Link to="leaderboard">Лучшие из лучших</Link>
        <Link to="forum">Форум</Link>
        <Link to="game/start">В бой</Link>
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
    </div>
  )
}
