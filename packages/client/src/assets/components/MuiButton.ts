import { buttonClasses } from '@mui/material/Button'

export const MuiButton = {
  styleOverrides: {
    root: {
      fontSize: '1rem',
      fontWeight: 700,
      fontStyle: 'normal',
      lineHeight: '1.25rem',
      width: 'max-content',
      padding: '15px 25px',
      boxShadow: 'none',
      borderRadius: '4px',
      letterSpacing: '0.1px',
    },
    sizeSmall: {
      fontSize: '14px',
      fontWeight: 700,
      padding: '3px 16px',
    },
    primary: {
      color: '#EAE3CC',
      backgroundColor: '#343A43',
      [`&.${buttonClasses.disabled}`]: {
        color: '#EAE3CC',
        backgroundColor: '#9DA6B0',
      },
      [`& .${buttonClasses.endIcon}`]: {
        margin: '0',
        marginLeft: '2px',
      },
    },
    secondary: {
      color: '#EAE3CC',
      backgroundColor: '#CB7007',
      ':hover': {
        backgroundColor: '#E8AA00',
      },
      [`&.${buttonClasses.disabled}`]: {
        backgroundColor: '#974201',
      },
    },
    sub: {
      color: '#EAE3CC',
      backgroundColor: '#584C34',
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
    sub: true
  }
}
