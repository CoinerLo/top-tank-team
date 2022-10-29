import { RegExpValidation, RequiredField } from './consts'

export const loginValidation = {
  required: RequiredField.Default,
  validate: (value: string) => {
    if (!value.match(RegExpValidation.Login)) {
      return RequiredField.Login
    }

    return true
  },
}

export const passwordValidation = {
  required: RequiredField.Default,
  validate: (value: string) => {
    if (value.length < 6) {
      return RequiredField.Password
    }

    return true
  },
}
