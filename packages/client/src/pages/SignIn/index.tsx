import { Box, Button, Container, TextField, Typography } from '@mui/material'
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import AuthController from '../../controllers/AuthController'
import { ISignInData } from '../../typings'
import { loginValidation, passwordValidation } from '../../utils/validation'

export const SignIn = () => {
  const { handleSubmit, control } = useForm<ISignInData>()
  const { errors } = useFormState({
    control,
  })

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<ISignInData> = async data => {
    const res = await AuthController.signin(data)
    if (res?.status == 200) {
      navigate('/deck')
    }
  }

  return (
    <Container>
      <Typography variant="h4">Вход</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="login"
          rules={loginValidation}
          render={({ field }) => (
            <TextField
              label="Логин"
              onChange={e => field.onChange(e)}
              value={field.value}
              fullWidth={true}
              size="small"
              margin="normal"
              className="auth-form__input"
              error={!!errors.login?.message}
              helperText={errors?.login?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={passwordValidation}
          render={({ field }) => (
            <TextField
              label="Пароль"
              onChange={e => field.onChange(e)}
              value={field.value}
              fullWidth={true}
              size="small"
              margin="normal"
              type="password"
              className="auth-form__input"
              error={!!errors?.password?.message}
              helperText={errors?.password?.message}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disableElevation
          sx={{
            marginTop: 2,
          }}>
          Войти
        </Button>
      </form>
      <Box>
        <Typography variant="subtitle1" component="span">
          Нету аккаунта?{' '}
        </Typography>
        <Typography variant="subtitle1" component="span" sx={{ color: 'blue' }}>
          <NavLink to="/signup">Зарегистрируйтесь</NavLink>
        </Typography>
      </Box>
    </Container>
  )
}
