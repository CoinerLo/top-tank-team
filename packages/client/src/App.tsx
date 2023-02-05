import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { getMainTheme } from './assets/mainTheme'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Headquarters } from './pages/Headquarters'
import { Error404 } from './pages/Error404'
import { Briefing } from './pages/Briefing'
import { Home } from './pages/Home'
import { Upgrade } from './pages/Upgrade'
import { Deck } from './pages/Deck'
import { GameStart } from './pages/GameDesk/GameStart'
import { AppRoute, AuthorizationStatus, Themes } from './utils/consts'
import { PostPage } from './pages/Forum/Post'
import { SignInContainer } from './containers/SignInContainer'
import { SignUpContainer } from './containers/SignUpContainer'
import { HeaderContainer } from './containers/HeaderContainer'
import { PrivateRoute } from './hocs/PrivateRoute/PrivateRoute'
import { GameDeskContainer } from './containers/GameDeskContainer'
import { LoadingScreen } from './components/LoadingScreen/LoadingScreen'
import { useAppDispatch, useAppselector } from './hooks'
import { cache } from './createEmotionCache'
import { CacheProvider } from '@emotion/react'
import { GameResultContainer } from './containers/GameResultContainer'
import { useEffect, useMemo } from 'react'
import { createTheme } from '@mui/material'
import { ColorModeContext } from './context/ColorMode'
import {
  findOrCreateUserThemeInDBThunk,
  updateUserThemeInDBThunk,
} from './store/api-thunks'
import { LeaderboardContainer } from './containers/LeaderboardContainer'
import { ForumContainer } from './containers/ForumContainer'

function App() {
  const dispatch = useAppDispatch()
  const { authorizationStatus, databaseId, theme } = useAppselector(
    ({ USER }) => USER
  )

  useEffect(() => {
    const getUserTheme = async () => {
      dispatch(
        findOrCreateUserThemeInDBThunk({
          ownerId: databaseId,
          theme: Themes.dark,
        })
      )
    }
    if (databaseId > 0) {
      getUserTheme()
    }
  }, [])

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        dispatch(
          updateUserThemeInDBThunk({
            ownerId: databaseId,
            theme: theme === 'dark' ? 'light' : 'dark',
          })
        )
        return undefined
      },
    }),
    [databaseId, theme]
  )

  const mainTheme = useMemo(() => createTheme(getMainTheme(theme)), [theme])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={mainTheme}>
          <CssBaseline />
          <HeaderContainer />
          <Routes>
            <Route path={AppRoute.Index} element={<Home />} />
            <Route path={AppRoute.SignIn} element={<SignInContainer />} />
            <Route path={AppRoute.SignUp} element={<SignUpContainer />} />
            <Route path={AppRoute.Briefing} element={<Briefing />} />
            <Route element={<PrivateRoute />}>
              <Route path={AppRoute.Headquarters} element={<Headquarters />} />
              <Route path={AppRoute.Upgrade} element={<Upgrade />} />
              <Route path={AppRoute.Deck} element={<Deck />} />
              <Route
                path={AppRoute.Leaderboard}
                element={<LeaderboardContainer />}
              />
              <Route path={AppRoute.Game}>
                <Route path={AppRoute.StartGame} element={<GameStart />} />
                <Route path={AppRoute.GameId} element={<GameDeskContainer />} />
                <Route path={AppRoute.ResultGame}>
                  <Route
                    path={AppRoute.GameId}
                    element={<GameResultContainer />}
                  />
                </Route>
                <Route
                  index
                  element={<Navigate to={AppRoute.Headquarters} />}
                />
              </Route>
              <Route path={AppRoute.Forum}>
                <Route index element={<ForumContainer />} />
                <Route path={AppRoute.ForumPost} element={<PostPage />} />
              </Route>
            </Route>

            <Route path="*" element={<Error404 />} />
          </Routes>
          {authorizationStatus === AuthorizationStatus.Unknown && (
            <LoadingScreen />
          )}
        </ThemeProvider>
      </CacheProvider>
    </ColorModeContext.Provider>
  )
}

export default App
