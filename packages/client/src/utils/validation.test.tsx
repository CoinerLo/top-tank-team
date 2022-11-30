import {
  loginValidation,
  passwordValidation,
  emailValidation,
  firstNameValidation,
  secondNameValidation,
  displayNameValidation,
  phoneValidation,
} from './validation'

type ValidationTestCase = {
  describe: string
  validData: string
  invalidData: string
  validationFn: (value: string) => string | true
}

const validations: ValidationTestCase[] = [
  {
    describe: 'Login',
    validData: 'validlogin',
    invalidData: 'в 4321 _м- ё@>alert()',
    validationFn: loginValidation.validate,
  },
  {
    describe: 'Password',
    validData: 'ValidPassword123_',
    invalidData: 'no',
    validationFn: passwordValidation.validate,
  },
  {
    describe: 'Email',
    validData: 'valid@email.com',
    invalidData: 'invalidEmail;',
    validationFn: emailValidation.validate,
  },
  {
    describe: 'First name',
    validData: 'First',
    invalidData: '12345678',
    validationFn: firstNameValidation.validate,
  },
  {
    describe: 'Second name',
    validData: 'Second',
    invalidData: '12345678',
    validationFn: secondNameValidation.validate,
  },
  {
    describe: 'Display name',
    validData: 'Display',
    invalidData: '12345678',
    validationFn: displayNameValidation.validate,
  },
  {
    describe: 'Phone',
    validData: '+71234567890',
    invalidData: 'Телефон',
    validationFn: phoneValidation.validate,
  },
]

validations.forEach(validationConfig => {
  describe(`${validationConfig.describe} validation`, () => {
    it('returns true if valid', () => {
      expect(validationConfig.validationFn(validationConfig.validData)).toEqual(
        true
      )
    })
    it('returns message if not valid', () => {
      const notValid = validationConfig.validationFn(
        validationConfig.invalidData
      ) as string

      expect(typeof notValid).toEqual('string')
    })
    it('validation message is not empty', () => {
      const notValid = validationConfig.validationFn(
        validationConfig.invalidData
      ) as string

      expect(notValid.length).toBeGreaterThan(0)
    })
  })
})
