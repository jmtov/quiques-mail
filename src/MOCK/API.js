import mockedLogin from './login.json';

const DEFAULT_WAIT_TIME = 1000;

const DEFAULT_OK_RESPONSE = {
  status: 200
};

const DEFAULT_ERROR_RESPONSE = {
  status: 400
};

const wait = (timeout = DEFAULT_WAIT_TIME) => new Promise(resolve => setTimeout(() => resolve(), timeout));

const API_ENDPOINTS = {
  LOGIN: {
    URL: '/login',
    CALL({ email, password }) {
      if (email === mockedLogin.check.email && password === mockedLogin.check.password) {
        return { ...DEFAULT_OK_RESPONSE, data: mockedLogin.return };
      }

      return { ...DEFAULT_ERROR_RESPONSE, message: 'Invalid email/password.' };
    }
  }
};


export async function fakeFetch(url, data) {
  await wait();
  if (url === API_ENDPOINTS.LOGIN.URL) {
    return API_ENDPOINTS.LOGIN.CALL(data);
  }

  throw Error();
}
