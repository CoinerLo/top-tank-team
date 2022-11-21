import { useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { mainTheme } from './assets/mainTheme'
import { Routes, Route } from 'react-router-dom'
import { Headquarters } from './pages/Headquarters'
import { Error404 } from './pages/Error404'
import { Briefing } from './pages/Briefing'
import { Home } from './pages/Home'
import { LeaderBoard } from './pages/Leaderboard'
import { Upgrade } from './pages/Upgrade'
import { Deck } from './pages/Deck'
import { Forum } from './pages/Forum'
import { GameStart } from './pages/GameDesk/GameStart'
import { GameDesk } from './pages/GameDesk'
import { GameResult } from './pages/GameDesk/GameResult'
import { AppRoute, AuthorizationStatus } from './utils/consts'
import { PostPage } from './pages/Forum/Post'
import { SignInContainer } from './containers/SignInContainer'
import { SignUpContainer } from './containers/SignUpContainer'
import { HeaderContainer } from './containers/HeaderContainer'
import { useAppselector } from './hooks'
import { PrivateRoute } from './hocs/PrivateRoute/PrivateRoute'
import { LoadingScreen } from './components/LoadingScreen/LoadingScreen'

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

  const { authorizationStatus } = useAppselector(({ USER }) => USER)

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <LoadingScreen />
  }

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <HeaderContainer />
      <Routes>
        <Route path={AppRoute.Index} element={<Home />} />
        <Route path={AppRoute.SignIn} element={<SignInContainer />} />
        <Route path={AppRoute.SignUp} element={<SignUpContainer />} />
        <Route path={AppRoute.Briefing} element={<Briefing />} />
        <Route
          path={AppRoute.Headquarters}
          element={
            <PrivateRoute>
              <Headquarters />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Upgrade}
          element={
            <PrivateRoute>
              <Upgrade />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Deck}
          element={
            <PrivateRoute>
              <Deck />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Leaderboard}
          element={
            <PrivateRoute>
              <LeaderBoard />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Forum}>
          <Route index element={<Forum />} />
          <Route path={AppRoute.ForumPost} element={<PostPage />} />
        </Route>

        <Route path={AppRoute.Game}>
          <Route
            path={AppRoute.StartGame}
            element={
              <PrivateRoute>
                <GameStart />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.GameId}
            element={
              <PrivateRoute>
                <GameDesk />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.ResultGame}>
            <Route
              path={AppRoute.GameId}
              element={
                <PrivateRoute>
                  <GameResult />
                </PrivateRoute>
              }
            />
          </Route>
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
