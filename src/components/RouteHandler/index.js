import React, { useContext } from 'react';
import { bool, string } from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from 'contexts/auth';
import { ROUTES } from 'constants/routes';


function RouteHandler({ isPrivate, ...props }) {
  const { currentUser } = useContext(AuthContext);
  const isLoginRoute = props.name === ROUTES.LOGIN.name;

  if (currentUser && isLoginRoute) {
    return <Redirect to={ROUTES.DEFAULT.path} />;
  }

  if (!isPrivate || (isPrivate && currentUser)) {
    return <Route {...props} />;
  }

  return <Redirect to={ROUTES.LOGIN.path} />;
}

RouteHandler.propTypes = {
  isPrivate: bool,
  name: string
};

export default RouteHandler;
