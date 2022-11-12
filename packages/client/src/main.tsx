import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import browserHistory from './browser-history'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { HistoryRouter } from './components/HistoryRouter/HistoryRouter'
import './index.css'
import { store } from './store'

import { getUserAction } from './store/api-actions'

store.dispatch(getUserAction())

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
