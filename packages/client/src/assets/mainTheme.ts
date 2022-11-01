import { createTheme, Theme, ThemeOptions } from '@mui/material/styles'
import { MuiContainer } from './components/MuiContainer'
import { MuiButton } from './components/MuiButton'
import { MuiLink } from './components/MuiLink'
import { MuiTextField } from './components/MuiTextField'

export const mainTheme: Theme = createTheme(<ThemeOptions>{
  palette: {
    type: 'dark',
    background: {
      default: '#24252A',
      paper: '#545358',
    },
    text: {
      primary: '#EAE3CC',
      secondary: 'rgba(255,255,255,0.8)',
    },
    primary: {
      main: '#373936',
      dark: '#2A2A2A',
      light: '#313330',
    },
    secondary: {
      main: '#CB7007',
      light: '#E8AA00',
      dark: '#974201',
    },
    info: {
      main: '#ED6204',
      light: '#FFAC37',
      dark: '#D44502',
    },
    error: {
      main: '#FF020A',
    },
    success: {
      main: '#64CB3E',
      dark: '#334D0C',
    },
    warning: {
      main: '#584C34',
      light: '#7D7056',
      dark: '#37301B',
    },
  },

  typography: {
    h1: {
      fontSize: '1.5rem',
      fontStyle: 'normal',
      fontWeight: 800,
      lineHeight: 1.167,
    },
    h2: {
      fontSize: '1.25rem',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '1.125rem',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    body1: {
      fontWeight: 500,
      lineHeight: 1.25,
      color: '#eae3cc',
    },
  },
  // Global style overrides
  components: {
    MuiContainer,
    MuiButton,
    MuiLink,
    MuiTextField,
  },
})
