import { useForm } from 'react-hook-form'

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  })
  const onSubmit = (data: Record<string, string>) => {
    console.log(data)
    reset()
  }

  return (
    <div>
      <h1>Регистрация</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Ваше имя:
          <input
            {...register('firstName', {
              required: 'Поле обязательно к заполнению!',
              minLength: {
                value: 4,
                message: 'Минимум 4 символа',
              },
            })}></input>
        </label>
        <div>
          {errors?.firstName && (
            <p>
              {String(errors?.firstName?.message) || 'Поле заполнено не верно!'}
            </p>
          )}
        </div>

        <label>
          NickName:
          <input
            {...register('nickName', {
              required: 'Поле обязательно к заполнению!',
              minLength: {
                value: 4,
                message: 'Минимум 4 символа',
              },
            })}></input>
        </label>
        <div>
          {errors?.nickName && (
            <p>
              {String(errors?.nickName?.message) || 'Поле заполнено не верно!'}
            </p>
          )}
        </div>

        <label>
          Email:
          <input
            {...register('email', {
              required: 'Поле обязательно к заполнению!',
              minLength: {
                value: 4,
                message: 'Минимум 4 символа',
              },
            })}></input>
        </label>
        <div>
          {errors?.email && (
            <p>
              {String(errors?.email?.message) || 'Поле заполнено не верно!'}
            </p>
          )}
        </div>

        <label>
          Пароль:
          <input
            type={'password'}
            {...register('password', {
              required: 'Поле обязательно к заполнению!',
              minLength: {
                value: 4,
                message: 'Минимум 4 символа',
              },
            })}></input>
        </label>
        <div>
          {errors?.password && (
            <p>
              {String(errors?.password?.message) || 'Поле заполнено не верно!'}
            </p>
          )}
        </div>

        <label>
          Повтор пароля:
          <input
            type="password"
            {...register('passwordRepeat', {
              required: 'Поле обязательно к заполнению!',
              minLength: {
                value: 4,
                message: 'Минимум 4 символа',
              },
            })}></input>
        </label>
        <div>
          {errors?.passwordRepeat && (
            <p>
              {String(errors?.passwordRepeat?.message) ||
                'Поле заполнено не верно!'}
            </p>
          )}
        </div>

        <input type={'submit'} disabled={!isValid}></input>
      </form>
    </div>
  )
}
