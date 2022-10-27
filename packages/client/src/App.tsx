import { useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { mainTheme } from './assets/mainTheme'
import './App.css'

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
      <div className="App">Вот тут будет жить ваше приложение :)</div>
    </ThemeProvider>
  )
}

export default App
