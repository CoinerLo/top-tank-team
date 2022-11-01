import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormControl,
  Link,
} from '@mui/material'
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import AuthController from '../../controllers/AuthController'
import { ISignInData } from '../../typings'
import { AppRoute } from '../../utils/consts'
import { loginValidation, passwordValidation } from '../../utils/validation'

export const SignIn = () => {
  const { handleSubmit, control } = useForm<ISignInData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })
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
    <Container
      disableGutters
      sx={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Typography
        variant="h4"
        sx={{ alignSelf: 'center', marginBottom: '25px' }}>
        Вход
      </Typography>
      <FormControl
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: '30ch' }}>
        <Controller
          control={control}
          name="login"
          rules={loginValidation}
          render={({ field }) => (
            <TextField
              label="Логин"
              onChange={e => field.onChange(e)}
              onBlur={() => field.onBlur()}
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
              onBlur={() => field.onBlur()}
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
          variant="sub"
          fullWidth
          disableElevation
          sx={{
            alignSelf: 'center',
            marginTop: '1rem',
          }}>
          Войти
        </Button>
      </FormControl>
      <Box sx={{ mt: '10px' }}>
        <Typography variant="subtitle1" component="span">
          Нету аккаунта?{' '}
        </Typography>
        <Typography variant="subtitle1" component="span">
          <Link component={NavLink} to={`/${AppRoute.SignUp}`}>
            Зарегистрируйтесь
          </Link>
        </Typography>
      </Box>
    </Container>
  )
}
