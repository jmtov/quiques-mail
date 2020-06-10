import React from 'react';
import { Image, Text } from 'grommet/components';
import styled from 'styled-components';

import Logo from 'assets/logo.png';
import StyledBox from 'components/Styled/Box';

const StyledImage = styled(Image)`
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: rotate;
  animation-iteration-count: infinite;
  width: 70px;
  height: 70px;
`;

function Loading() {
  return (
    <StyledBox align="center" justify="center" flex={{ grow: 1, shrink: 1 }} height="100vh" width="100vw">
      <StyledImage src={Logo} margin={{ bottom: 'medium'}}/>
      <Text>Loading</Text>
    </StyledBox>
  );
}

export default Loading;
