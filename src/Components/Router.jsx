import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from './Dashboard/Router';
import Donation from './Donation/Router';
import Info from './Info/Router';
import Settings from './Settings/Router';

export default function Router(props) {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/donation" component={Donation} />
      <Route path="/info" component={Info} />
      <Route path="/settings" component={Settings} />
      <Redirect to="/dashboard" />
    </Switch>
  );
}
