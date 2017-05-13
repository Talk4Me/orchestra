import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Home from './components/Home';
import Title from './components/Title';
import 'materialize-loader';

render(
  <Router history={browserHistory}>
    <Route path="/">
      <IndexRoute component={Home}/>
      <Route path="title" component={Title}/>
    </Route>
  </Router>
, document.getElementById('root'));
