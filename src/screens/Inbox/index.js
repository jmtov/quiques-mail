import React, { useContext } from 'react';
import { Button, Box, Heading } from 'grommet/components';
import { AuthContext } from 'contexts/auth';

function Inbox() {
  const { logout, currentUser } = useContext(AuthContext);

  return (
    <Box justify="start" width="large">
      <Heading level="1">{`${currentUser.name}'s Inbox`}</Heading>
      <Box justify="start" width="small">
        <Button primary label="Logout" onClick={logout} width="small" />
      </Box>
    </Box>
  );
}

export default Inbox;
