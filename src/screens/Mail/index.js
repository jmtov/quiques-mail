import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Box, Main } from 'grommet/components';

import { MAIL_ROUTES } from 'constants/routes';
import MailContextProvider from 'contexts/mail';

import Sidebar from 'components/Sidebar';

function Mail() {
  return (
    <MailContextProvider>
      <Box direction="row" height={{ min: '100%' }}>
        <Sidebar flex={{ shrink: 0, grow: 1 }} />
        <Main direction="column" fill flex={{ shrink: 1, grow: 1}} height={{ max: '100vh' }}>
          <Switch>
            <Route path="/mail" exact>
              <Redirect to={MAIL_ROUTES.INBOX.path} />
            </Route>
            {Object.values(MAIL_ROUTES).map((route) => (
              <Route key={route.id} {...route} />
            ))}
          </Switch>
        </Main>
      </Box>
    </MailContextProvider>
  );
}

export default Mail;
