import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch } from 'react-router-dom';
import { Route,browserHistory } from 'react-router';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Import Main styles for this application
 import '../scss/style.scss';
import '../assets/style/app.scss';

// scenes
import Home from './scenes/Home';

import configureStore from './store';

const store = configureStore();

ReactDOM.render((
  <Provider store={store.store} history={browserHistory}>
  <PersistGate loading={null} persistor={store.persistor}>
    <HashRouter>
      <Switch>
        <Route exact path="/" name="Home" component={Home} />
      </Switch>
    </HashRouter>
    </PersistGate>
  </Provider>
), document.getElementById('root'));