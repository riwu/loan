import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RequestLoan from '../pages/RequestLoan';
import Loans from '../pages/Loans';
import Navigation from './Navigation';

const Routes = () => (
  <BrowserRouter>
    <>
      <Navigation />
      <Switch>
        <Route exact path="/" component={RequestLoan} />
        <Route path="/loans" component={Loans} />
      </Switch>
    </>
  </BrowserRouter>
);

export default Routes;
