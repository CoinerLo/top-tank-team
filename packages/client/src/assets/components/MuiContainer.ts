import type { PaletteMode } from '@mui/material'

export const getMuiContainer = (mode: PaletteMode) => ({
  styleOverrides: {
    disableGutters: {
      height: '100vh',
      maxWidth: '100vw!important',
      display: 'flex',
      padding: 0,
      marginRight: 0,
      marginLeft: 0,
      paddingTop: '37px',
      backgroundImage:
        mode === 'dark'
          ? "url('/background.png')"
          : "url('/winterBackground.jpg')",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPositionX: 'center',
    },
  },
})
