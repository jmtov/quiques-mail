import React from 'react';
import { element, func, oneOfType, shape, string } from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Button } from 'grommet';
import { THEME } from 'constants/theme';

const SidebarButton = ({ navbar, to }) => {
  const Icon = navbar.icon;

  return (
    <NavLink to={to} activeStyle={{ color: THEME.global.colors.brand }}>
      <Button icon={<Icon />} hoverIndicator={{ color: 'inherit' }} focusIndicator={false} />
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
