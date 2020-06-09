import React from 'react';
import { Button } from 'grommet';
import styled from 'styled-components';
import { THEME } from 'constants/theme';

const StyledFAB = styled(FAB)`
  background-color: ${THEME.global.colors.brand};
  border-radius: 80px;
  bottom: 24px;
  padding: 20px;
  position: fixed;
  right: 24px;

  svg {

    fill: blue;
  }
`;

function FAB(props) {
  return (
    <Button {...props} />
  );
}

export default StyledFAB;
