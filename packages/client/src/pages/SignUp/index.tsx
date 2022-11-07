import {
  useForm,
  Controller,
  SubmitHandler,
  useFormState,
} from 'react-hook-form'
import {
  Typography,
  Button,
  Container,
  TextField,
  FormControl,
  Box,
  Link,
} from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  loginValidation,
  passwordValidation,
  emailValidation,
  firstNameValidation,
  secondNameValidation,
  phoneValidation,
} from '../../utils/validation'
import { ISingUpForm } from '../../typings'
import { AppRoute } from '../../utils/consts'
import AuthController from '../../controllers/AuthController'

export const SignUp = () => {
  const { handleSubmit, reset, control } = useForm<ISingUpForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })
  const { errors, isValid } = useFormState({
    control,
  })
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<ISingUpForm> = async data => {
    const res = await AuthController.signup(data)
    if (res?.status == 200) {
      navigate('/headquarters')
    }

    //Понимаю, что здесь это выглядит лишним, но не знаю как отдельно и куда.
    reset({
      first_name: '',
      second_name: '',
      login: '',
      email: '',
      password: '',
      phone: '',
    })
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
        Регистрация
      </Typography>

      <FormControl
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: '30ch' }}>
        <Controller
          control={control}
          name="first_name"
          rules={firstNameValidation}
          render={({ field }) => (
            <TextField
              label="Имя"
              size="small"
              fullWidth={true}
              margin="normal"
              className="auth-form__input"
              onChange={e => field.onChange(e)}
              onBlur={() => field.onBlur()}
              value={field.value ?? ''}
              error={!!errors.first_name?.message}
              helperText={errors?.first_name?.message}
            />
          )}
        />

        <Controller
          control={control}
          rules={secondNameValidation}
          name="second_name"
          render={({ field }) => (
            <TextField
              label="Фамилия"
              size="small"
              fullWidth={true}
              margin="normal"
              className="auth-form__input"
              onChange={e => field.onChange(e)}
              onBlur={() => field.onBlur()}
              value={field.value ?? ''}
              error={!!errors.second_name?.message}
              helperText={errors?.second_name?.message}
            />
          )}
        />

        <Controller
          control={control}
          rules={loginValidation}
          name="login"
          render={({ field }) => (
            <TextField
              label="Логин"
              size="small"
              fullWidth={true}
              margin="normal"
              className="auth-form__input"
              onChange={e => field.onChange(e)}
              onBlur={() => field.onBlur()}
              value={field.value ?? ''}
              error={!!errors.login?.message}
              helperText={errors?.login?.message}
            />
          )}
        />

        <Controller
          control={control}
          rules={emailValidation}
          name="email"
          render={({ field }) => (
            <TextField
              label="Email"
              size="small"
              fullWidth={true}
              margin="normal"
              className="auth-form__input"
              onChange={e => field.onChange(e)}
              onBlur={() => field.onBlur()}
              value={field.value ?? ''}
              error={!!errors.email?.message}
              helperText={errors?.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          rules={passwordValidation}
          name="password"
          render={({ field }) => (
            <TextField
              label="Пароль"
              type="password"
              size="small"
              fullWidth={true}
              margin="normal"
              className="auth-form__input"
              onChange={e => field.onChange(e)}
              onBlur={() => field.onBlur()}
              value={field.value ?? ''}
              error={!!errors.password?.message}
              helperText={errors?.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          rules={phoneValidation}
          name="phone"
          render={({ field }) => (
            <TextField
              label="Телефон"
              size="small"
              fullWidth={true}
              margin="normal"
              className="auth-form__input"
              onChange={e => field.onChange(e)}
              onBlur={() => field.onBlur()}
              value={field.value ?? ''}
              error={!!errors.phone?.message}
              helperText={errors?.phone?.message}
            />
          )}
        />
        <Button
          type="submit"
          variant={'sub'}
          fullWidth
          disableElevation
          disabled={!isValid}
          sx={{
            alignSelf: 'center',
            marginTop: '1rem',
          }}>
          Зарегистрироваться
        </Button>
      </FormControl>
      <Box sx={{ mt: '10px' }}>
        <Typography variant="subtitle1" component="span">
          <Link component={NavLink} to={`/${AppRoute.SignIn}`}>
            Войти
          </Link>
        </Typography>
      </Box>
    </Container>
  )
}
