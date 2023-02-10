import ReactDOM from 'react-dom/client'
import React from 'react'
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
  <ErrorBoundary>
    <HistoryRouter history={browserHistory}>
      <Provider store={store}>
        <App />
      </Provider>
    </HistoryRouter>
  </ErrorBoundary>
)

// Из-за переезда с облака Яндекса на свой арендованный vpn
// некоторые функции приложения пришлось программно отключить
// вернем их в работу при продолжении работ над приложением

// function startServiceWorker() {
//   if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//       navigator.serviceWorker
//         .register('./sw.js')
//         .then(registration => {
//           console.log(
//             'ServiceWorker registration successful with scope: ',
//             registration.scope
//           )
//         })
//         .catch((error: string) => {
//           console.log('ServiceWorker registration failed: ', error)
//         })
//     })
//   }
// }

// startServiceWorker()
