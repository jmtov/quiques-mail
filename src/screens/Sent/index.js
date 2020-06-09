import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { sent } from 'constants/MOCK/quique.json';
import { ROUTES } from 'constants/routes';

import MailListView from 'components/MailListView';
import MailEntry from 'components/MailEntry';

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

function Sent() {
  return (
    <MailListView mails={sent} title="Sent" mailItemRender={(item) => (
      <StyledLink key={item.id} to={`${ROUTES.VIEW.basePath}/${item.id}`}>
        <MailEntry subtitle={`Sent to ${item.recipient.name.full}`} {...item} />
      </StyledLink>
    )}/>
  );
}

export default Sent;
