import {combineReducers} from 'redux';
import ordersReducer from './getOrdersReducer';
import pendingRequestReducer from './clearRequestReducer';

const rootReducer = combineReducers({
    orders: ordersReducer,
    clearRequest: pendingRequestReducer 
});

export default rootReducer;
