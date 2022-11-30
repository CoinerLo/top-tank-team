import Box from '@mui/material/Box/Box'
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms'

export const TimerBox = () => {
  return (
    <Box
      sx={{
        marginY: '15px',
        paddingY: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.3)',
      }}>
      <AccessAlarmsIcon sx={{ color: 'rgba(255, 255, 255, 0.3)' }} />
    </Box>
  )
}
