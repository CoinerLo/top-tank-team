import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Box from '@mui/material/Box/Box'

export const ReadyFight = () => (
  <Box
    sx={{
      width: '157px',
      textAlign: 'center',
      fontSize: '24px',
      lineHeight: 1,
    }}>
    <CheckCircleIcon sx={{ mr: '5px', color: '#64CB3E' }} />
    Готов
  </Box>
)
