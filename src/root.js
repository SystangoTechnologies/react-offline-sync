import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import {routes} from './routes/index';
import {hashHistory} from 'react-router';

export default React.Component ({
  propTypes: {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    devTools: PropTypes.bool
  },
  render () {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <Router history={hashHistory}>
          {routes}
        </Router>
      </Provider>
    );
  }
});
