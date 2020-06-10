import { Box } from 'grommet/components';
import styled from 'styled-components';

const StyledBox = styled(Box)`
animation-duration: 0.3s;
animation-fill-mode: both;
animation-name: appear;
color: unset;
text-decoration: none;
transition: transform 0.2s;
-webkit-overflow-scrolling: touch;

&:hover {
  transform: translateX(5px);
}

&:active {
  transform: translateX(20px);
}
`;

export default StyledBox;
