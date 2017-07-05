import { Router, Route, browserHistory } from 'react-router';
import { App } from '../containers';
import React from 'react';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App} />
  </Router>
)
