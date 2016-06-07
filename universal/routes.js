import React from 'react';
import { Route, IndexRoute } from 'react-router';

import PulseApp from './containers/PulseApp';
import MegafonQuiz from './containers/MegafonQuiz';
import MegafonQuizTablet from './containers/MegafonQuizTablet';
import Nasedkin from './containers/Nasedkin';
import Badanina from './containers/Badanina';
import Login from './containers/Login';
import Project from './containers/Project';

export default (
  <Route path='/' component={PulseApp}>
    <IndexRoute components={{megafonQuiz: MegafonQuiz}} />
    <Route path='tablet' components={{megafonQuizTablet: MegafonQuizTablet}} />
    <Route path='nasedkin' components={{nasedkin: Nasedkin}} />
    <Route path='badanina' components={{badanina: Badanina}} />
    <Route path='login' components={{login: Login}} />
    <Route path='project/:slug' components={{project: Project}} />
  </Route>
);
