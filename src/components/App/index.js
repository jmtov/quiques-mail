import React from 'react';
import { Grommet } from 'grommet';
import { Switch } from 'react-router-dom';

import { THEME } from 'constants/theme';
import { ROUTES } from 'constants/routes';
import AuthContextProvider from 'contexts/auth';
import RouteHandler from 'components/RouteHandler';



function App() {
  return (
    <AuthContextProvider>
      <Grommet theme={THEME}>
        <Switch>
          {Object.values(ROUTES).map((route) => (
            <RouteHandler key={route.id} {...route} />
          ))}
        </Switch>
      </Grommet>
    </AuthContextProvider>
  );
}

export default App;
