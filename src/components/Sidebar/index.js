import React, { useContext, useMemo } from 'react';
import { Avatar, Button, Nav, Sidebar } from 'grommet';
import { Logout } from 'grommet-icons';

import { AuthContext } from 'contexts/auth';
import { ROUTES } from 'constants/routes';

import SidebarButton from './components/SidebarButton';

function CustomSidebar(props) {
  const { currentUser, logout } = useContext(AuthContext);
  const routesToShow = useMemo(() => Object.values(ROUTES).filter((route) => !route.navbar.hidden), []);

  return (
    <Sidebar
      height={{ min: '100vh' }}
      header={<Avatar src={currentUser.photoURL} />}
      footer={<Button icon={<Logout />} hoverIndicator onClick={logout} />}
      {...props}
    >
      <Nav>
        {routesToShow.map(({ navbar, id, name, path }) => (
          <SidebarButton key={id} to={path} navbar={navbar} hoverIndicator />
        ))}
      </Nav>
    </Sidebar>
  );
}

export default CustomSidebar;
