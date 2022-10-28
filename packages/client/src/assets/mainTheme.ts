import { createTheme, Theme, ThemeOptions } from '@mui/material/styles'
import { MuiButton } from './components/MuiButton'

export const mainTheme: Theme = createTheme(<ThemeOptions>{
  palette: {
    primary: {
      darkest: '#0A824F',
      dark: '#10A064',
      main: '#00B956',
      light: '#CBF2DE',
      lightest: '#EDFCF4',
    },
    secondary: {
      dark: '#6D736D',
      main: '#6C6C6C',
      light: '#9DA6B0',
      lightest: '#F6F6F6',
    },
    customGray: {
      gray1: '#EDEDED',
      gray2: '#AFAFAF',
    },
    error: {
      main: '#F62434',
      light: '#FFE6E7',
    },
    success: {
      main: '#00B956',
      light: '#EDFCF4',
    },
    warning: {
      main: '#FFA717',
      light: '#FFF8EC',
    },
    info: {
      main: '#1991AB',
      light: '#E5F2FF',
    },
    common: {
      black: '#000000',
      white: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: '#6C6C6C',
    },
  },
  typography: {
    h1: {
      fontSize: '24px',
      fontStyle: 'normal',
      fontWeight: 800,
      lineHeight: '28px',
      color: '#333333',
    },
    h2: {
      fontSize: '20px',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '24px',
      color: '#333333',
    },
    h3: {
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '20px',
      color: '#6C6C6C',
    },
  },
  // Global style overrides
  components: {
    MuiButton,
  },
})
