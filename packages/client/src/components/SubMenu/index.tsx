import Box from '@mui/material/Box/Box'

export const SubMenu = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        padding: '20px 80px',
        border: '1px solid #373936',
        borderRadius: '5px',
        backgroundColor: '#373936',
      }}>
      <Box marginRight="40px">монеты</Box>
      <Box marginLeft="40px">опыт</Box>
    </Box>
  )
}
