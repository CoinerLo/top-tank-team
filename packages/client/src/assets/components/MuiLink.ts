import type { PaletteMode } from '@mui/material'

export const getMuiLink = (mode: PaletteMode) => ({
  styleOverrides: {
    root:
      mode === 'dark'
        ? {
            fontSize: '1rem',
            fontWeight: 500,
            fontStyle: 'normal',
            color: 'inherit',
            lineHeight: 1.43,
          }
        : {
            fontSize: '1rem',
            fontWeight: 600,
            fontStyle: 'normal',
            color: '#000',
            textShadow: '#fff 0 0 10px, #fff 5px 0 10px, #fff 0 5px 10px',
            lineHeight: 1.43,
            ':hover': {
              color: 'red',
            },
          },
  },
})
