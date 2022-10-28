const REQUIRED_FIELD = 'Обязательно для заполнения!'

export const loginValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (!value.match(/^(?=.*[a-z])[a-zA-Z0-9_-]{3,20}$/)) {
      return 'Логин должен содержать от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчеркивание'
    }

    return true
  },
}

export const passwordValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (value.length < 6) {
      return 'Пароль должен длиннее 6-ти символов'
    }

    return true
  },
}
