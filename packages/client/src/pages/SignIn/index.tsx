import { SubmitHandler, useForm } from 'react-hook-form'

export interface ISignInData {
  login: string
  password: string
}

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISignInData>()

  const onSubmit: SubmitHandler<ISignInData> = data => {
    console.log(data)
    reset()
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('login', {
            required: 'Это обязательное поле',
            pattern: {
              value: /^(?=.*[a-z])[a-zA-Z0-9_-]{3,20}$/,
              message:
                'Логин должен содержать от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчеркивание',
            },
          })}
          type="text"
          placeholder="Логин"
        />
        {errors?.login && (
          <div style={{ color: 'red' }}>{errors.login.message}</div>
        )}
        <input
          {...register('password', {
            required: 'Это обязательное поле',
          })}
          type="password"
          placeholder="Пароль"
        />
        {errors?.password && (
          <div style={{ color: 'red' }}>{errors.password.message}</div>
        )}
        <div>
          <button>Войти</button>
        </div>
      </form>
    </div>
  )
}
