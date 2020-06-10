import React, { useContext, useCallback, useMemo } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Anchor, Box, Heading, Text } from 'grommet/components';
import { LinkPrevious } from 'grommet-icons';
import styled from 'styled-components';

import { MAIL_ROUTES } from 'constants/routes';
import { MailContext } from 'contexts/mail';
import MailService from 'services/MailService';
import useServiceCall from 'hooks/useServiceCall';

const StyledText = styled(Text)`
  white-space: pre-wrap;
`;

// TODO: Check performance.
function View() {
  const history = useHistory();
  const { id } = useParams();
  const { state: detail } = useServiceCall(MailService.getEmailById, id);
  const { pending } = useContext(MailContext);

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const newDetail = useMemo(() => {
    if (!detail.data) {
      return {
        ...detail,
        data: pending.view.find(pendingElement => pendingElement.id === id),
      };
    }

    return detail;
  }, [pending.view, detail, id]);

  return (
    <Box border={{ size: 'xsmall' }} flex={{ grow: 1, shrink: 1 }} height="100vh" margin="medium">
      {newDetail && newDetail.data
        ? (
          <>
            <Box border={{ size: 'xsmall', side: 'bottom' }} flex={{ grow: 0, shrink: 0 }} pad="medium">
              <Anchor onClick={handleGoBack} pad="medium" margin={{ left: 'xsmall' }} align="center">
                <LinkPrevious size="medium" /><Text margin={{ left: 'small' }} >Go back</Text>
              </Anchor>
              <Heading level="2" margin="xsmall">{`${newDetail.data.subject}`}</Heading>
              <Heading level="4" margin="xsmall">{`${newDetail.data.sender.email} to ${newDetail.data.recipient.email }`}</Heading>
            </Box>
            <Box margin="xsmall" overflow="auto" flex={{ grow: 1, shrink: 1 }} pad="medium">
              <StyledText>
                {newDetail.data.text}
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
