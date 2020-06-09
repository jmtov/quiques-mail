import React from 'react';
import { element } from 'prop-types';
import { Box, Main } from 'grommet/components';

import Sidebar from 'components/Sidebar';



function Layout({ children }) {
  return (
    <Box direction="row" height={{ min: '100%' }}>
      <Sidebar flex={{ shrink: 0, grow: 1 }}/>
      <Main direction="column" flex={{ shrink: 1, grow: 1}} height={{ max: '100vh' }} pad={{ horizontal: 'medium' }} width="100%">
        {children}
      </Main>
    </Box>
  );
}

Layout.propTypes = {
  children: element
};

export default Layout;
