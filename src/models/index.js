import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import ordersReducer from './getOrdersReducer';
import pendingRequestReducer from './clearRequestReducer';

const rootReducer = combineReducers({
    routing: routerReducer,
    orders: ordersReducer,
    clearRequest: pendingRequestReducer 
});

export default rootReducer;
