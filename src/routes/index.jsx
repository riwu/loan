import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <div />} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
