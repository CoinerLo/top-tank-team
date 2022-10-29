import {
  useForm,
  Controller,
  SubmitHandler,
  useFormState,
} from 'react-hook-form'
import { Typography, Button, Container, TextField } from '@mui/material'
import { NavLink } from 'react-router-dom'
import {
  loginValidation,
  passwordValidation,
  emailValidation,
  firstNameValidation,
  secondNameValidation,
  phoneValidation,
} from '../../utils/validation'
import { ISingUpForm } from '../../typings'

export const SignUp = () => {
  const { handleSubmit, reset, control } = useForm<ISingUpForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })
  const { errors, isValid } = useFormState({
    control,
  })
  const onSubmit: SubmitHandler<ISingUpForm> = data => {
    //Для проверки (знать что выводится, потом сделаю логику)
    console.log(data)

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
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" align="center">
          Регистрация
        </Typography>

        <Controller
          control={control}
          rules={firstNameValidation}
          name="first_name"
          render={({ field }) => (
            <TextField
              label="Имя"
              size="small"
              fullWidth={true}
              margin="normal"
              className="auth-form__input"
              onChange={e => field.onChange(e)}
              onBlur={() => field.onBlur()}
              value={field.value}
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
              value={field.value}
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
              value={field.value}
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
              value={field.value}
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
              value={field.value}
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
              value={field.value}
              error={!!errors.phone?.message}
              helperText={errors?.phone?.message}
            />
          )}
        />

        <Button
          type="submit"
          variant={'contained'}
          disabled={!isValid}
          sx={{ mt: '10px' }}>
          Зарегистрироваться
        </Button>

        <Typography variant="subtitle1" component="span" sx={{ ml: '10px' }}>
          <NavLink to="/signin">Войти</NavLink>
        </Typography>
      </form>
    </Container>
  )
}
