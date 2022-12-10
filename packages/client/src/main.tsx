import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import browserHistory from './browser-history'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { HistoryRouter } from './components/HistoryRouter/HistoryRouter'
import './index.css'
import { createStore } from './store'
import {ConnectedRouter} from "connected-react-router";

import { getUserThunk } from './store/api-thunks'
const { store, history } = createStore(window.__INITIAL_STATE__);
store.dispatch(getUserThunk())

declare global {
  interface Window {
    __INITIAL_STATE__: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
)
