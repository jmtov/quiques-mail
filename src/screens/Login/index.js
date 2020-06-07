import React, { useState, useContext, useCallback } from 'react';
import { Button, Box, Image, FormField, Form, Text, TextInput } from 'grommet/components';

import { INPUT_TYPES } from 'constants/forms';
import { REQUEST_STATUS } from 'constants/network';
import { AuthContext } from 'contexts/auth';
import { AuthService } from 'services/AuthService';
import Logo from 'assets/logo.png';

import { FORM_INPUTS } from './constants';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [sentStatus, setSentStatus] = useState(REQUEST_STATUS.NOT_REQUESTED);
  const {setCurrentUser} = useContext(AuthContext);

  const canSubmit = sentStatus !== REQUEST_STATUS.LOADING && email && password;
  const buttonLabel = sentStatus === REQUEST_STATUS.LOADING ? 'Logging in' : 'Login';

  const handleSubmit = useCallback(() => {
    const data = { email, password };
    setSentStatus(REQUEST_STATUS.LOADING);

    AuthService.login(data)
      .then((userData) => {
        setSentStatus(REQUEST_STATUS.DONE);
        setCurrentUser(userData);
      })
      .catch(err => {
        setSentStatus(REQUEST_STATUS.ERROR);
        setError(err.message);
      });
  }, [email, password, setCurrentUser]);

  const handleFormChange = useCallback(() => {
    if (error) setError(null);
  }, [error]);

  return (
    <Box pad="large" align="center" justify="center">
      <Box width="medium">
        <Box height="small" pad="large">
          <Image fit="contain" src={Logo} />
        </Box>
        <Form onSubmit={handleSubmit} onChange={handleFormChange} validate="blur">
          <FormField label={FORM_INPUTS.EMAIL.LABEL} name={FORM_INPUTS.EMAIL.NAME} validate={FORM_INPUTS.EMAIL.VALIDATE} required>
            <TextInput
              name={FORM_INPUTS.EMAIL.NAME}
              onChange={event => setEmail(event.target.value)}
              placeholder={FORM_INPUTS.EMAIL.PLACEHOLDER}
              required
              validate={FORM_INPUTS.EMAIL.VALIDATE}
              value={email}
            />
          </FormField>
          <FormField label={FORM_INPUTS.PASSWORD.LABEL} name={FORM_INPUTS.PASSWORD.NAME} required>
            <TextInput
              name={FORM_INPUTS.PASSWORD.NAME}
              onChange={event => setPassword(event.target.value)}
              placeholder={FORM_INPUTS.PASSWORD.LABEL}
              required
              type={INPUT_TYPES.PASSWORD}
              value={password}
            />
          </FormField>
          <Box direction="row" align="center" justify="start" margin={{ top: 'medium' }}>
            <Button type="submit" label={buttonLabel} disabled={!canSubmit} margin={{ right: 'medium' }} primary />
            {error && <Text color="status-critical">{error}</Text>}
          </Box>
        </Form>
      </Box>
    </Box>
  );
}

export default Login;
