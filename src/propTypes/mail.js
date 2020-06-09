import { number, shape, string } from 'prop-types';

export const userPropTypes = {
  name: shape({
    first: string,
    last: string,
    full: string,
  }),
  email: string
};

export const mailPropTypes = {
  id: string,
  index: number,
  picture: string,
  sender: shape(userPropTypes),
  recipient: shape(userPropTypes),
  subject: string,
  preview: string,
  timestamp: number,
  sent: string,
};
