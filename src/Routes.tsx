import React from 'react';
import { Route, Switch } from 'react-router-dom';
import P4MultiplayerPage from './components/fourInARow/P4MultiplayerPage';
import Puissance4Page from './components/fourInARow/Puissance4Page';

export enum RoutePath {
  root = '/',
  p4Multiplayer = '/P4Multiplayer',
}

const Routes = () => (
  <Switch>
    <Route path={RoutePath.root} exact component={Puissance4Page} />
    <Route path={RoutePath.p4Multiplayer} exact component={P4MultiplayerPage} />
    <Route path={RoutePath.root} component={() => <h1>You don&apos;t have to be here!</h1>} />
  </Switch>
);

export default Routes;
