export const MuiTextField = {
  styleOverrides: {
    root: {
      '& label.Mui-focused': {
        color: '#EAE3CC',
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: '#EAE3CC',
        },
      },
      '& input:-internal-autofill-selected': {
        WebkitTextFillColor: '#EAE3CC !important',
        WebkitBackgroundClip: 'text',
      },
    },
  },
}
