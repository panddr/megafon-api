import React from 'react';
import { Route, IndexRoute } from 'react-router';

import PulseApp from './containers/PulseApp';
import Home from './containers/Home';
import Nasedkin from './containers/Nasedkin';
import Badanina from './containers/Badanina';
import Login from './containers/Login';
import Project from './containers/Project';

export default (
  <Route path='/' component={PulseApp}>
    <IndexRoute components={{home: Home}} />
    <Route path='nasedkin' components={{nasedkin: Nasedkin}} />
    <Route path='badanina' components={{badanina: Badanina}} />
    <Route path='login' components={{login: Login}} />
    <Route path='project/:slug' components={{project: Project}} />
  </Route>
);
