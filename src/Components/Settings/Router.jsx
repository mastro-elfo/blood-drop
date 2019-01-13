import React from 'react';
import { Route, Switch } from 'react-router-dom';

import View from './View';

export default function SettingsRouter(props) {
  return (
    <Switch>
      <Route path="/settings" component={View} />
    </Switch>
  );
}
