import { CacheProvider } from '@emotion/react'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import createEmotionCache from './createEmotionCache'
import createEmotionServer from '@emotion/server/create-instance'
import { Provider } from 'react-redux'
import { rootReducer } from './store/root-reducer'
import { configureStore } from '@reduxjs/toolkit'

export function render(url: string) {
  const cache = createEmotionCache()
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache)

  const store = configureStore({
    reducer: rootReducer,
  })

  const html = renderToString(
    <React.StrictMode>
      <CacheProvider value={cache}>
        <StaticRouter location={url}>
          <Provider store={store}>
            <App />
          </Provider>
        </StaticRouter>
      </CacheProvider>
    </React.StrictMode>
  )

  const preloadedState = store.getState()

  const emotionChunks = extractCriticalToChunks(html)
  const emotionCss = constructStyleTagsFromChunks(emotionChunks)

  return { html, css: emotionCss, store: preloadedState }
}
