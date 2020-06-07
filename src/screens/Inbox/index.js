import React, { useContext } from 'react';
import { Button, Box, Heading, Image } from 'grommet/components';
import { AuthContext } from 'contexts/auth';

function Inbox() {
  const { logout, currentUser } = useContext(AuthContext);

  return (
    <Box justify="start" width="large">
      <Box width="small" height="small">
        <Image src={currentUser.photoURL} fit="contain" />
      </Box>
      <Heading level="1">{`${currentUser.displayName}'s Inbox`}</Heading>
      <Box justify="start" width="small">
        <Button primary label="Logout" onClick={logout} width="small" />
      </Box>
    </Box>
  );
}

export default Inbox;
