import React, { useState, useContext, useCallback } from 'react';
import { Button, Box, Image, Form, Text } from 'grommet/components';

import { INPUT_TYPES } from 'constants/forms';
import { REQUEST_STATUS } from 'constants/network';
import { AuthContext } from 'contexts/auth';
import Logo from 'assets/logo.png';

import Field from 'components/Field';

import { FORM_INPUTS } from './constants';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loginStatus, loginError, resetLoginStatus } = useContext(AuthContext);

  const canSubmit = !loginError && loginStatus !== REQUEST_STATUS.LOADING && email && password;
  const buttonLabel = loginStatus === REQUEST_STATUS.LOADING ? 'Logging in' : 'Login';

  const handleSubmit = useCallback(() => {
    login({ email, password });
  }, [email, password, login]);

  const handleFormChange = useCallback(() => {
    if (loginError) {
      resetLoginStatus();
    }
  }, [loginError, resetLoginStatus]);

  return (
    <Box pad="large" align="center" justify="center" height="100vh">
      <Box width="medium">
        <Box height="small" pad="large">
          <Image fit="contain" src={Logo} />
        </Box>
        <Form onSubmit={handleSubmit} onChange={handleFormChange} validate="blur">
          <Field
            label={FORM_INPUTS.EMAIL.LABEL}
            name={FORM_INPUTS.EMAIL.NAME}
            onChange={event => setEmail(event.target.value)}
            placeholder={FORM_INPUTS.EMAIL.PLACEHOLDER}
            required
            validate={FORM_INPUTS.EMAIL.VALIDATE}
            value={email}
          />
          <Field
            label={FORM_INPUTS.PASSWORD.LABEL}
            name={FORM_INPUTS.PASSWORD.NAME}
            onChange={event => setPassword(event.target.value)}
            placeholder={FORM_INPUTS.PASSWORD.LABEL}
            required
            type={INPUT_TYPES.PASSWORD}
            value={password}
          />
          <Box direction="row" align="center" justify="start" margin={{ top: 'medium', bottom: 'medium' }}>
            <Button type="submit" label={buttonLabel} disabled={!canSubmit} primary />
          </Box>
          {loginError && <Text margin={{ top: 'medium' }} color="status-critical">{loginError}</Text>}
        </Form>
      </Box>
    </Box>
  );
}

export default Login;
