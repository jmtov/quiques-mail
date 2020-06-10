import { arrayOf, number, shape, string } from 'prop-types';

export const serviceCallStatePropTypes = {
  status: number.isRequired,
  data: arrayOf(shape({})),
  error: string
};
