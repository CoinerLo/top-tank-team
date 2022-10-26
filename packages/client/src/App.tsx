import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { About } from './pages/About'
import { Error404 } from './pages/Error404'
import { Briefing } from './pages/Briefing'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { LeaderBoard } from './pages/Leaderboard'
import { Upgrade } from './pages/Upgrade'
import { Deck } from './pages/Deck'
import { Forum } from './pages/Forum'
import { GameStart } from './pages/GameDesk/GameStart'
import { GameDesk } from './pages/GameDesk'
import { GameResult } from './pages/GameDesk/GameResult'
import './App.css'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="briefing" element={<Briefing />} />
        <Route path="home" element={<Home />} />
        <Route path="upgrade" element={<Upgrade />} />
        <Route path="deck" element={<Deck />} />
        <Route path="leaderboard" element={<LeaderBoard />} />
        <Route path="forum" element={<Forum />} />

        <Route path="game">
          <Route path="start" element={<GameStart />} />
          <Route path=":gameId" element={<GameDesk />} />
          <Route path="result/:gameId" element={<GameResult />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  )
}

export default App
