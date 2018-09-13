import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch } from 'react-router-dom';
import { Route,browserHistory } from 'react-router';
import {Provider} from 'react-redux';

// Import Main styles for this application
 import '../scss/style.scss';
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