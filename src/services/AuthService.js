import { PATHS } from '../constants/api';

import { fakeFetch } from 'MOCK/API';

// TODO: Optimize service calls
export const AuthService = {
  async login(data) {
    const response = await fakeFetch(PATHS.LOGIN, data);

    if (response.status !== 200) {
      throw response;
    }

    return response.data;
  },
};
