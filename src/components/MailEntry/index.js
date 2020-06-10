import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text } from 'grommet/components';
import styled from 'styled-components';

import { mailPropTypes } from 'propTypes/mail';

const StyledLink = styled(Link)`
  color: unset;
  text-decoration: none;
  transition: transform 0.2s;

  &:hover {
    transform: translateX(5px);
  }

  &:active {
    transform: translateX(20px);
  }
`;

function MailEntry({ id, onClick, preview, subtitle, subject, to }) {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <StyledLink to={to}>
      <Box onClick={handleClick} flex={{ shrink: 0 }} border={{ side: 'bottom', size: 'xsmall'}} pad="medium" focusIndicator>
        <Box direction="row-responsive">
          <Text margin={{ bottom: 'xsmall', right: 'xsmall' }} weight="bold">{subject}</Text>
          <Text margin={{ bottom: 'xsmall' }} color="dark-3">{subtitle}</Text>
        </Box>
        <Text truncate>{preview}</Text>
      </Box>
    </StyledLink>
  );
}

MailEntry.propTypes = mailPropTypes;

export default MailEntry;
