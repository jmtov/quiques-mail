import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Button, Box, Form, Text } from 'grommet/components';
import { Link } from 'react-router-dom';

import { MailContext } from 'contexts/mail';
import { AuthContext } from 'contexts/auth';
import { INPUT_TYPES } from 'constants/forms';
import { REQUEST_STATUS } from 'constants/network';
import { MAIL_ROUTES } from 'constants/routes';

import Field from 'components/Field';
import StyledBox from 'components/Styled/Box';
import StyledTextArea from 'components/Styled/TextArea';

import { FORM_INPUTS } from './constants';

// TODO: Check performance. Finish Draft save.
function Compose() {
  const { sendAction, clearSendAction, sendEmail } = useContext(MailContext);
  const { currentUser } = useContext(AuthContext);
  const [sentPath, setSentPath] = useState('');
  const [subject, setSubject] = useState('');
  const [recipient, setRecipient] = useState('');
  const [body, setBody] = useState('');

  const canSubmit = subject && recipient && body && sendAction.status !== REQUEST_STATUS.LOADING;

  const handleSubmit = useCallback(() => {
    if (canSubmit) {
      sendEmail({ body, recipient, subject, sender: currentUser.email, senderName: currentUser.displayName });
    }
  }, [canSubmit, body, recipient, subject, currentUser, sendEmail]);

  useEffect(() => {
    if (sendAction.status === REQUEST_STATUS.DONE) {
      setSentPath(`${MAIL_ROUTES.SENT.path}?${sendAction.data.id}`);
    }
  }, [sendAction.status, sendAction]);

  useEffect(() => {
    return clearSendAction();
  }, [clearSendAction]);

  return (
    <StyledBox border={{ size: 'xsmall' }} flex={{ grow: 1, shrink: 1 }} height="100vh" margin="medium" overflow="auto">
      <Form onSubmit={handleSubmit} validate="blur">
        <Box border={{ size: 'xsmall', side: 'bottom' }} flex={{ grow: 0, shrink: 1 }} pad="medium">
          <Field
            flex={{ shrink: 0 }}
            label={FORM_INPUTS.RECIPIENT.LABEL}
            name={FORM_INPUTS.RECIPIENT.NAME}
            onChange={event => setRecipient(event.target.value)}
            placeholder={FORM_INPUTS.RECIPIENT.PLACEHOLDER}
            required
            validate={FORM_INPUTS.RECIPIENT.VALIDATE}
            value={recipient}
          />
          <Field
            flex={{ shrink: 0 }}
            label={FORM_INPUTS.SUBJECT.LABEL}
            name={FORM_INPUTS.SUBJECT.NAME}
            onChange={event => setSubject(event.target.value)}
            placeholder={FORM_INPUTS.SUBJECT.LABEL}
            required
            validate={FORM_INPUTS.SUBJECT.VALIDATE}
            value={subject}
          />
        </Box>
        <Box border={{ size: 'xsmall', side: 'bottom' }} flex={{ grow: 1, shrink: 1 }} pad="medium">
          <Field
            label={FORM_INPUTS.BODY.LABEL}
            name={FORM_INPUTS.BODY.NAME}
            onChange={event => setBody(event.target.value)}
            placeholder={FORM_INPUTS.BODY.PLACEHOLDER}
            required
            resize="vertical"
            // TODO: Check why text area is not using all the available space
            component={StyledTextArea}
            type={INPUT_TYPES.TEXT_AREA}
            value={body}
          />
        </Box>
        <Box align="center" direction="row" flex={{ shrink: 0 }} pad="medium">
          <Button type="submit" label='Send' margin={{ right: 'medium' }} disabled={!canSubmit} primary />
          {sendAction.error && <Text color="status-critical">{sendAction}</Text>}
          {sendAction.status === REQUEST_STATUS.LOADING && <Text color="neutral-3">Sending...</Text>}
          {sendAction.status === REQUEST_STATUS.DONE && (
            <Link to={sentPath} style={{ textDecoration: 'none' }}>
              <Text weight="bold" color="status-ok">Sent! You can see it on the Sent email</Text>
            </Link>
          )}
        </Box>
      </Form>
    </StyledBox>
  );
}

export default Compose;
