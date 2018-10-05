import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './models';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import { customMiddleWare } from './withPendingRequest/listener';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  version: 0,
  storage
}

const createStoreWithMiddleware = composeEnhancers(
  applyMiddleware(
    thunkMiddleware,
    promiseMiddleware({ promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR'] }),
    customMiddleWare,
  )
);

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default function configureStore() {
  const store = createStore(persistedReducer, createStoreWithMiddleware);
  const  persistor = persistStore(store);
  // console.log('persistor:', persistor);
  return { store, persistor };
}