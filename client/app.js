import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route } from 'react-router';

import { getLogin } from './GetLogin';
import { getOrSetUserLogin } from './Login';
import { setupRealtime } from './Realtime';

import routes from '../universal/routes';
import store from '../universal/store';
import * as actions from '../universal/actions/PulseActions';

import Root from '../universal/containers/root';

import '../style/main.scss';
import 'normalize.css';


ReactDOM.render(
  <Root store={store} routing={routes} />,
  document.getElementById('app')
);

// Now that we have rendered...
setupRealtime(store, actions);

// lets mutate state and set UserID as key from local storage
store.dispatch(actions.getLogin(getLogin()));

// store.dispatch(actions.submitLogin(getOrSetUserLogin()));
