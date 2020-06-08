import React from 'react';
import { element, func, oneOfType, shape, string } from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Button } from 'grommet';

const SidebarButton = ({ navbar, to }) => {
  const Icon = navbar.icon;

  return (
    <NavLink to={to} activeStyle={{ color: '#DF0000'}}>
      <Button icon={<Icon />} hoverIndicator />
    </NavLink>
  );
};

SidebarButton.propTypes = {
  navbar: shape({
    icon: oneOfType([element, func])
  }),
  to: string
};

export default SidebarButton;
