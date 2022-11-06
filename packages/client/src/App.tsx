import { useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { mainTheme } from './assets/mainTheme'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Headquarters } from './pages/Headquarters'
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
import { AppRoute } from './utils/consts'
import { PostPage } from './pages/Forum/Post'

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
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path={AppRoute.Index} element={<Home />} />
        <Route path={AppRoute.SignIn} element={<SignIn />} />
        <Route path={AppRoute.SignUp} element={<SignUp />} />
        <Route path={AppRoute.Briefing} element={<Briefing />} />
        <Route path={AppRoute.Headquarters} element={<Headquarters />} />
        <Route path={AppRoute.Upgrade} element={<Upgrade />} />
        <Route path={AppRoute.Deck} element={<Deck />} />
        <Route path={AppRoute.Leaderboard} element={<LeaderBoard />} />
        <Route path={AppRoute.Forum}>
          <Route index element={<Forum />} />
          <Route path={AppRoute.ForumPost} element={<PostPage />} />
        </Route>

        <Route path={AppRoute.Game}>
          <Route path={AppRoute.StartGame} element={<GameStart />} />
          <Route path={AppRoute.GameId} element={<GameDesk />} />
          <Route path={AppRoute.ResultGame}>
            <Route path={AppRoute.GameId} element={<GameResult />} />
          </Route>
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
