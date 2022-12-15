import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormControl,
  Link,
} from '@mui/material'
import { FC } from 'react'
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form'
import { NavLink, Navigate } from 'react-router-dom'
import { useAuthorizationStatus } from '../../hooks/useAuthorizationStatus'
import { ISignInData } from '../../typings'
import { AppRoute } from '../../utils/consts'
import { loginValidation, passwordValidation } from '../../utils/validation'
import { useAppselector } from '../../hooks'

interface ISignIn {
  handleSubmitSignInData: SubmitHandler<ISignInData>
}

export const SignIn: FC<ISignIn> = ({ handleSubmitSignInData }) => {
  const { handleSubmit, control } = useForm<ISignInData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })
  const { errors } = useFormState({
    control,
  })
  const { isAuthorized } = useAuthorizationStatus()
  const { yandexOAuthId } = useAppselector(({ USER }) => USER)
  const yandexOAuthUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${yandexOAuthId}&redirect_uri=http://localhost:3000/signin`

  if (isAuthorized) {
    return <Navigate to={`/${AppRoute.Headquarters}`} />
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
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ marginRight: '5px' }}>Авторизация через:</Typography>
        <Link href={yandexOAuthUrl}>
          <Box
            component="img"
            src="/yandexLogoOAuth.png"
            alt="HomeLogo"
            sx={{ height: '30px' }}
          />
        </Link>
      </Box>
      <FormControl
        component="form"
        onSubmit={handleSubmit(handleSubmitSignInData)}
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
              value={field.value ?? ''}
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
              value={field.value ?? ''}
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
