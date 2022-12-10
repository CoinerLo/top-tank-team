import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { mainTheme } from './assets/mainTheme'
import React from 'react'
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
import { GameResult } from './pages/GameDesk/GameResult'
import { AppRoute, AuthorizationStatus } from './utils/consts'
import { PostPage } from './pages/Forum/Post'
import { SignInContainer } from './containers/SignInContainer'
import { SignUpContainer } from './containers/SignUpContainer'
import { HeaderContainer } from './containers/HeaderContainer'
import { useAppselector } from './hooks'
import { PrivateRoute } from './hocs/PrivateRoute/PrivateRoute'
import { LoadingScreen } from './components/LoadingScreen/LoadingScreen'
import { GameDeskContainer } from './containers/GameDeskContainer'
import { hot } from 'react-hot-loader'

function App() {
  // useEffect(() => {                                    // пока заглушу - пока не возьмемся за бекенд, надоели эти ошибки в консоле постоянные
  //   const fetchServerData = async () => {
  //     const url = `http://localhost:${__SERVER_PORT__}`
  //     const response = await fetch(url)
  //     const data = await response.json()
  //     console.log(data)
  //   }

  //   fetchServerData()
  // }, [])

  // const { authorizationStatus } = useAppselector(({ USER }) => USER)

  // if (authorizationStatus === AuthorizationStatus.Unknown) {
  //   return <LoadingScreen />
  // }

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <HeaderContainer />
      <Routes>
        <Route path={AppRoute.Index} element={<Home />} />
        {/* <Route path={AppRoute.SignIn} element={<SignInContainer />} />
        <Route path={AppRoute.SignUp} element={<SignUpContainer />} />
        <Route path={AppRoute.Briefing} element={<Briefing />} />
        <Route element={<PrivateRoute />}>
          <Route path={AppRoute.Headquarters} element={<Headquarters />} />
          <Route path={AppRoute.Upgrade} element={<Upgrade />} />
          <Route path={AppRoute.Deck} element={<Deck />} />
          <Route path={AppRoute.Leaderboard} element={<LeaderBoard />} />
          <Route path={AppRoute.Game}>
            <Route path={AppRoute.StartGame} element={<GameStart />} />
            <Route path={AppRoute.GameId} element={<GameDeskContainer />} />
            <Route path={AppRoute.ResultGame}>
              <Route path={AppRoute.GameId} element={<GameResult />} />
            </Route>
          </Route>
        </Route>

        <Route path={AppRoute.Forum}>
          <Route index element={<Forum />} />
          <Route path={AppRoute.ForumPost} element={<PostPage />} />
        </Route> */}

        <Route path="*" element={<Error404 />} />
      </Routes>
    </ThemeProvider>
    // <Routes>
    //   <Route index element={<div>hello</div>} />
    // </Routes>
  )
}

export default App
