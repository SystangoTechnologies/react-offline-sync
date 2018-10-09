import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './models';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import { default as offlineMiddleWare } from './withPendingRequest/offlineMiddleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = composeEnhancers(
  applyMiddleware(
    thunkMiddleware,
    promiseMiddleware({ promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR'] }),
    offlineMiddleWare,
  )
);

export default function configureStore() {
  const store = createStore(rootReducer, createStoreWithMiddleware);
  return store;
}