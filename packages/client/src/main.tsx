import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import browserHistory from './browser-history'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { HistoryRouter } from './components/HistoryRouter/HistoryRouter'
import { store } from './store'
import { getUserThunk } from './store/api-thunks'

store.dispatch(getUserThunk())

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <ErrorBoundary>
      <HistoryRouter history={browserHistory}>
        <Provider store={store}>
          <App />
        </Provider>
      </HistoryRouter>
    </ErrorBoundary>
  </React.StrictMode>
)
