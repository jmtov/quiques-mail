import { number, oneOfType, shape, string } from 'prop-types';

export const mailPropTypes = {
  id: oneOfType([number, string]),
  from: string,
  to: string,
  name: shape({
    first: string,
    last: string,
  }),
  subject: string,
  body: string,
};
