import ReactDOM from 'react-dom/client'
import React from 'react'
import { Provider } from 'react-redux'
import App from './App'
import browserHistory from './browser-history'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { HistoryRouter } from './components/HistoryRouter/HistoryRouter'
import './index.css'
import { store } from './store'

import { getUserThunk } from './store/api-thunks'

store.dispatch(getUserThunk())

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
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
