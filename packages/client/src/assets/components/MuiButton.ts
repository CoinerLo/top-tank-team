import { buttonClasses } from '@mui/material/Button'

export const MuiButton = {
  styleOverrides: {
    root: {
      fontSize: '16px',
      fontWeight: 700,
      fontStyle: 'normal',
      lineHeight: '20px',
      width: 'max-content',
      padding: '10px 16px',
      boxShadow: 'none',
      textTransform: 'none',
      borderRadius: '20px',
    },
    sizeSmall: {
      fontSize: '14px',
      fontWeight: 700,
      padding: '3px 16px',
    },
    primary: {
      color: '#FFFFFF',
      backgroundColor: '#00B956',
      ':hover': {
        backgroundColor: '#10A064',
      },
      [`&.${buttonClasses.disabled}`]: {
        color: '#FFFFFF',
        backgroundColor: '#9DA6B0',
      },
      [`& .${buttonClasses.endIcon}`]: {
        margin: '0',
        marginLeft: '2px',
      },
    },
    secondary: {
      color: '#10A064',
      backgroundColor: '#EDFCF4',
      ':hover': {
        backgroundColor: '#CBF2DE',
      },
      [`&.${buttonClasses.disabled}`]: {
        color: '#9DA6B0',
        backgroundColor: '#F6F6F6',
      },
    },
    cancel: {
      color: '#333333',
      backgroundColor: '#F6F6F6',
      ':hover': {
        backgroundColor: '#CECECE',
      },
      [`&.${buttonClasses.disabled}`]: {
        color: '#9DA6B0',
        backgroundColor: '#F6F6F6',
      },
    },
  },
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    secondary: true
    primary: true
    cancel: true
  }
}
