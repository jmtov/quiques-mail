import React from 'react';
import { Grommet } from 'grommet';

import { THEME } from 'constants/theme';
import AuthContextProvider from 'contexts/auth';
import Routes from 'components/Routes';

function App() {
  return (
    <AuthContextProvider>
      <Grommet theme={THEME}>
        <Routes />
      </Grommet>
    </AuthContextProvider>
  );
}

export default App;
