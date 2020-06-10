import React, { useContext } from 'react';
import { bool, string } from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';

import { AuthContext } from 'contexts/auth';
import { GLOBAL_ROUTES } from 'constants/routes';
import RouteHandler from 'components/RouteHandler';

function Routes() {
  const { currentUser } = useContext(AuthContext);

  return (
    <Switch>
      <Route path={GLOBAL_ROUTES.LOGIN.path} exact>
        {
          currentUser
            ? <Redirect to={GLOBAL_ROUTES.MAIL.path} />
            : <GLOBAL_ROUTES.LOGIN.component />
        }
      </Route>
      <RouteHandler isPrivate path={GLOBAL_ROUTES.MAIL.path} component={GLOBAL_ROUTES.MAIL.component} />
      <Route path={GLOBAL_ROUTES.DEFAULT.path}>
        {
          currentUser
            ? <Redirect to={GLOBAL_ROUTES.MAIL.path} />
            : <Redirect to={GLOBAL_ROUTES.LOGIN.path} />
        }
      </Route>
    </Switch>
  );
}

Routes.propTypes = {
  isPrivate: bool,
  name: string
};

export default Routes;
