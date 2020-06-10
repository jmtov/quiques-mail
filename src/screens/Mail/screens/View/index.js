import React, { useContext, useEffect, useCallback } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Anchor, Box, Heading, Text } from 'grommet/components';
import { LinkPrevious } from 'grommet-icons';
import styled from 'styled-components';

import { MailContext } from 'contexts/mail';
import { MAIL_ROUTES } from 'constants/routes';

const StyledText = styled(Text)`
  white-space: pre-wrap;
`;

// TODO: Check performance.
function View() {
  const { detail, getDetail, clearDetail } = useContext(MailContext);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getDetail(id);
  }, [getDetail, id]);

  useEffect(() => {
    return clearDetail();
  }, [clearDetail]);

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <Box border={{ size: 'xsmall' }} flex={{ grow: 1, shrink: 1 }} height="100vh" margin="medium">
      {detail && detail.data
        ? (
          <>
            <Box border={{ size: 'xsmall', side: 'bottom' }} flex={{ grow: 0, shrink: 0 }} pad="medium">
              <Anchor onClick={handleGoBack} pad="medium" margin={{ left: 'xsmall' }} align="center">
                <LinkPrevious size="medium" /><Text margin={{ left: 'small' }} >Go back</Text>
              </Anchor>
              <Heading level="2" margin="xsmall">{`${detail.data.subject}`}</Heading>
              <Heading level="4" margin="xsmall">{`${detail.data.sender.email} to ${detail.data.recipient.email }`}</Heading>
            </Box>
            <Box margin="xsmall" overflow="auto" flex={{ grow: 1, shrink: 1 }} pad="medium">
              <StyledText>
                {detail.data.text}
              </StyledText>
            </Box>
          </>
        ) : (
          <Box fill align="center" justify="center">
            <Heading level="2">No data! :(</Heading>
            <Box wrap direction="row">
              <Anchor onClick={handleGoBack}>Go back</Anchor>
              <Text margin={{ horizontal: 'small' }}>or</Text>
              <Link to={MAIL_ROUTES.INBOX.path}><Text weight="bold" color="control">Go to inbox</Text></Link>
            </Box>
          </Box>
        )
      }
    </Box>
  );
}

export default View;
