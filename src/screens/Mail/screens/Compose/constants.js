const EMAIL_REGEXP = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const MIN_SUBJECT_LENGTH = 2;
const MAX_SUBJECT_LENGTH = 100;

export const FORM_INPUTS = {
  RECIPIENT: {
    NAME: 'recipient',
    LABEL: 'To',
    PLACEHOLDER: 'email@test.com',
    VALIDATE: [
      email => EMAIL_REGEXP.test(email) ? undefined : 'Not a valid email!'
    ]
  },
  SENDER: {
    NAME: 'sender',
    LABEL: 'From',
  },
  SUBJECT: {
    NAME: 'subject',
    LABEL: 'Subject',
    PLACEHOLDER: 'Subject',
    VALIDATE: [
      subject => subject.length < MIN_SUBJECT_LENGTH ? 'Too short!' : undefined,
      subject => subject.length >= MAX_SUBJECT_LENGTH ? 'Too long!' : undefined
    ]
  },
  BODY: {
    NAME: 'body',
    LABEL: 'Body',
    PLACEHOLDER: 'Type your message here...'
  },
};
