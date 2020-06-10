const EMAIL_REGEXP = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const FORM_INPUTS = {
  PASSWORD: {
    NAME: 'password',
    LABEL: 'Password'
  },
  EMAIL: {
    NAME: 'email',
    LABEL: 'Email',
    PLACEHOLDER: 'email@test.com',
    VALIDATE: [
      email => EMAIL_REGEXP.test(email) ? undefined : 'Not a valid email!'
    ]
  }
};
