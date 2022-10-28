import { SubmitHandler, useForm } from 'react-hook-form'
import './signIn.scss' 

export interface ISignInData {
  login: string
  password: string
}

export const SignIn = () => {

  const title = 'Вход'

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
      <form className='ya-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='ya-form__container ya-form__container_shadow'>
          <div className="ya-form__title">
            {title}
          </div>
          <div className="ya-form__fields">
            <div className=" ya-form__field ya-field">
              <input 
                className='ya-field__input'
                id='idInput'
                {...register('login', {
                  required: 'Это обязательное поле',
                  pattern: {
                    value: /^(?=.*[a-z])[a-zA-Z0-9_-]{3,20}$/,
                    message:
                      'Логин должен содержать от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчеркивание',
                  },
                })}
                type="text"
              />
              <label className='ya-field__label' htmlFor='idInput'>
                Логин
              </label>
              {errors?.login && (
                <div className='ya-field__error'>{errors.login.message}</div>
              )}
            </div>
            <div className="ya-field ya-form__field">
              <input className='ya-field__input'
                {...register('password', {
                  required: 'Это обязательное поле',
                })}
                type="password"
              />
              <label className='ya-field__label' htmlFor='idInput'>
                Пароль
              </label>
              {errors?.password && (
                <div className='ya-field__error'>{errors.password.message}</div>
              )}
            </div>
          </div>
          <div className='ya-form__footer'>
            <button className='ya-btn ya-btn_main ya-form__btn'>Войти</button>
            <button className='ya-btn ya-form__btn'>Регистрация</button>
          </div>
        </div>
      </form>
  )
}
