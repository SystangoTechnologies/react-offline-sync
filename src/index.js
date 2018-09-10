import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Redirect} from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import { Route,browserHistory } from 'react-router';
import {Provider} from 'react-redux';


// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss';
// Temp fix for reactstrap
// import '../scss/core/_dropdown-menu-right.scss'

import '../assets/style/app.scss';

// scenes
import Home from './scenes/Home';

import configureStore from './store';

const store = configureStore();

ReactDOM.render((
  <Provider store={store} history={browserHistory}>
    <HashRouter>
      <Switch>
        <Route exact path="/" name="Home" component={Home} />
      </Switch>
    </HashRouter>
  </Provider>
), document.getElementById('root'));