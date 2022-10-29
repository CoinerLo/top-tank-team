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
    if (!value.match(RegExpValidation.Password)) {
      return RequiredField.Password
    }
    return true
  },
}

export const emailValidation = {
  required: RequiredField.Default,
  validate: (value: string) => {
    if (!value.match(RegExpValidation.Email)) {
      return RequiredField.Email
    }
    return true
  },
}

export const firstNameValidation = {
  required: RequiredField.Default,
  validate: (value: string) => {
    if (!value.match(RegExpValidation.FirstName)) {
      return RequiredField.FirstName
    }
    return true
  },
}

export const secondNameValidation = {
  required: RequiredField.Default,
  validate: (value: string) => {
    if (!value.match(RegExpValidation.SecondName)) {
      return RequiredField.SecondName
    }
    return true
  },
}

export const displayNameValidation = {
  required: RequiredField.Default,
  validate: (value: string) => {
    if (!value.match(RegExpValidation.DisplayName)) {
      return RequiredField.DisplayName
    }
    return true
  },
}

export const phoneValidation = {
  required: RequiredField.Default,
  validate: (value: string) => {
    if (!value.match(RegExpValidation.Phone)) {
      return RequiredField.Phone
    }
    return true
  },
}
