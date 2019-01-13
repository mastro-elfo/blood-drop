import React from 'react';
import { Route, Switch } from 'react-router-dom';
import View from './View';
import Edit from './Edit';
import New from './New';

export default function Router(props) {
  return (
    <Switch>
      <Route path="/donation/view/:id" component={View} />
      <Route path="/donation/edit/:id" component={Edit} />
      <Route path="/donation/new" component={New} />
    </Switch>
  );
}
