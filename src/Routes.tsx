import React from 'react';
import { Route, Switch } from 'react-router-dom';
import P4MultiplayerPage from './components/fourInARow/P4MultiplayerPage';
import Puissance4Page from './components/fourInARow/Puissance4Page';
import MainMenuPage from './components/MainMenu/MainMenuPage';

export enum RoutePath {
  root = '/',
  p4Online = '/P4Multiplayer',
  p4Local = '/P4Local',
}

const Routes = () => (
  <Switch>
    <Route path={RoutePath.root} exact component={MainMenuPage} />
    <Route path={RoutePath.p4Online} exact component={P4MultiplayerPage} />
    <Route path={RoutePath.p4Local} exact component={Puissance4Page} />
    <Route path={RoutePath.root} component={() => <h1>You don&apos;t have to be here!</h1>} />
  </Switch>
);

export default Routes;
