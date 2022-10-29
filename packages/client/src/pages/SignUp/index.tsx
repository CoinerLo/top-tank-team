import {
  useForm,
  Controller,
  SubmitHandler,
  useFormState,
} from 'react-hook-form'
import { Typography, Button, Container, TextField } from '@mui/material'

interface ISingUpForm {
  login: string
  password: string
}

export const SignUp = () => {
  const { handleSubmit, reset, control } = useForm<ISingUpForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })
  const { errors, isValid } = useFormState({
    control,
  })
  const onSubmit: SubmitHandler<ISingUpForm> = data => {
    console.log(data)
    reset({ login: '', password: '' })
  }

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" align="center">
          Регистрация
        </Typography>
        <Controller
          control={control}
          rules={{
            required: 'Обязательное поле для ввода',
            minLength: { value: 5, message: 'Должно быть больше 5 символов' },
          }}
          name="login"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              label="Логин"
              size="small"
              fullWidth={true}
              margin="normal"
              className="auth-form__input"
              onChange={e => onChange(e)}
              onBlur={() => onBlur()}
              value={value}
              error={!!errors.login?.message}
              helperText={errors?.login?.message}
            />
          )}
        />
        <Controller
          control={control}
          rules={{ required: true }}
          name="password"
          render={({ field }) => (
            <TextField
              label="Пароль"
              size="small"
              type="password"
              onChange={e => field.onChange(e)}
              value={field.value}
            />
          )}
        />
        <Button type="submit" variant={'contained'}>
          Зарегистрироваться
        </Button>

        {/*<label>*/}
        {/*  Ваше имя:*/}
        {/*  <input*/}
        {/*    {...register('firstName', {*/}
        {/*      required: 'Поле обязательно к заполнению!',*/}
        {/*      minLength: {*/}
        {/*        value: 4,*/}
        {/*        message: 'Минимум 4 символа',*/}
        {/*      },*/}
        {/*    })}></input>*/}
        {/*</label>*/}
        {/*<div>*/}
        {/*  {errors?.firstName && (*/}
        {/*    <p>*/}
        {/*      {String(errors?.firstName?.message) || 'Поле заполнено не верно!'}*/}
        {/*    </p>*/}
        {/*  )}*/}
        {/*</div>*/}

        {/*<label>*/}
        {/*  NickName:*/}
        {/*  <input*/}
        {/*    {...register('nickName', {*/}
        {/*      required: 'Поле обязательно к заполнению!',*/}
        {/*      minLength: {*/}
        {/*        value: 4,*/}
        {/*        message: 'Минимум 4 символа',*/}
        {/*      },*/}
        {/*    })}></input>*/}
        {/*</label>*/}
        {/*<div>*/}
        {/*  {errors?.nickName && (*/}
        {/*    <p>*/}
        {/*      {String(errors?.nickName?.message) || 'Поле заполнено не верно!'}*/}
        {/*    </p>*/}
        {/*  )}*/}
        {/*</div>*/}

        {/*<label>*/}
        {/*  Email:*/}
        {/*  <input*/}
        {/*    {...register('email', {*/}
        {/*      required: 'Поле обязательно к заполнению!',*/}
        {/*      minLength: {*/}
        {/*        value: 4,*/}
        {/*        message: 'Минимум 4 символа',*/}
        {/*      },*/}
        {/*    })}></input>*/}
        {/*</label>*/}
        {/*<div>*/}
        {/*  {errors?.email && (*/}
        {/*    <p>*/}
        {/*      {String(errors?.email?.message) || 'Поле заполнено не верно!'}*/}
        {/*    </p>*/}
        {/*  )}*/}
        {/*</div>*/}

        {/*<label>*/}
        {/*  Пароль:*/}
        {/*  <input*/}
        {/*    type={'password'}*/}
        {/*    {...register('password', {*/}
        {/*      required: 'Поле обязательно к заполнению!',*/}
        {/*      minLength: {*/}
        {/*        value: 4,*/}
        {/*        message: 'Минимум 4 символа',*/}
        {/*      },*/}
        {/*    })}></input>*/}
        {/*</label>*/}
        {/*<div>*/}
        {/*  {errors?.password && (*/}
        {/*    <p>*/}
        {/*      {String(errors?.password?.message) || 'Поле заполнено не верно!'}*/}
        {/*    </p>*/}
        {/*  )}*/}
        {/*</div>*/}

        {/*<label>*/}
        {/*  Повтор пароля:*/}
        {/*  <input*/}
        {/*    type="password"*/}
        {/*    {...register('passwordRepeat', {*/}
        {/*      required: 'Поле обязательно к заполнению!',*/}
        {/*      minLength: {*/}
        {/*        value: 4,*/}
        {/*        message: 'Минимум 4 символа',*/}
        {/*      },*/}
        {/*    })}></input>*/}
        {/*</label>*/}
        {/*<div>*/}
        {/*  {errors?.passwordRepeat && (*/}
        {/*    <p>*/}
        {/*      {String(errors?.passwordRepeat?.message) ||*/}
        {/*        'Поле заполнено не верно!'}*/}
        {/*    </p>*/}
        {/*  )}*/}
        {/*</div>*/}

        {/*<input type={'submit'} disabled={!isValid}></input>*/}
      </form>
    </Container>
  )
}
