import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RequestLoan from '../pages/RequestLoan';
import Navigation from './Navigation';

const Routes = () => (
  <BrowserRouter>
    <>
      <Navigation />
      <Switch>
        <Route exact path="/" component={RequestLoan} />
      </Switch>
    </>
  </BrowserRouter>
);

export default Routes;
