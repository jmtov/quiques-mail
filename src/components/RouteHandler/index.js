import React, { useContext } from 'react';
import { bool } from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from 'contexts/auth';
import { GLOBAL_ROUTES } from 'constants/routes';


function RouteHandler({ isPrivate, ...props }) {
  const { currentUser } = useContext(AuthContext);

  if (isPrivate && currentUser) {
    return <Route {...props} />;
  }

  return <Redirect to={GLOBAL_ROUTES.LOGIN.path} />;
}

RouteHandler.propTypes = {
  isPrivate: bool
};

export default RouteHandler;
