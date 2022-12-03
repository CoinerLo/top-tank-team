import { Button, Box, Typography, Container } from '@mui/material'
import React from 'react'
import { AppRoute } from '../../utils/consts'
import { useNavigate } from 'react-router-dom'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '100px',
  },
  mainBtn: {
    marginX: '40px',
    padding: '20px 80px',
    fontSize: '2rem',
  },
}

export const Error404 = () => {
  const navigate = useNavigate()

  const headquarters = () => {
    navigate(`/${AppRoute.Headquarters}`)
  }

  return (
    <Container disableGutters sx={styles.container}>
      <Box
        component="img"
        src="/Erorr404.png"
        alt="HomeLogo"
        sx={{
          height: '350px',
          borderBottom: '4px solid rgba(234,227,204,20%)',
        }}
      />
      <Typography variant="h3" component="span" sx={{ marginTop: '10px' }}>
        Ваш отряд заблудился!
      </Typography>
      <Box
        sx={{
          marginBottom: '5px',

          borderRadius: '5px',
          padding: '20px',
        }}>
        <Typography variant="body1">
          Здесь Вы точно ничего не найдёте, прошу вернуться в свой штаб!
        </Typography>
      </Box>
      <Button onClick={headquarters} variant="secondary" sx={styles.mainBtn}>
        Отыскать своих
      </Button>
      <Typography
        variant="subtitle1"
        component="span"
        sx={{ marginTop: '20px' }}></Typography>
    </Container>
  )
}
