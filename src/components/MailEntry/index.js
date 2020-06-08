import React from 'react';
import { Box, Text } from 'grommet/components';
import { mailPropTypes } from 'propTypes/mail';

function MailEntry({ body, id, name, onClick, subject }) {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <Box onClick={handleClick} flex={{ shrink: 0 }} border={{ side: 'bottom', size: 'xsmall'}} pad="medium" focusIndicator>
      <Box direction="row-responsive">
        <Text margin={{ bottom: 'xsmall', right: 'xsmall' }} weight="bold">{subject}</Text>
        <Text margin={{ bottom: 'xsmall' }} color="dark-3">{`${name.first} ${name.last}`}</Text>
      </Box>
      <Text truncate>{body}</Text>
    </Box>
  );
}

MailEntry.propTypes = mailPropTypes;

export default MailEntry;
