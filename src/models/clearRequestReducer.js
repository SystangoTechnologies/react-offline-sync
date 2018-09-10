import ordersReducer from './getOrdersReducer';

export default function(state = ordersReducer, action = {}) {
    switch (action.type) {		
        case `REMOVE_PENDING_REQUEST_LOADING`:
            return {
                ...state,
              isLoading: true,
              success: false,
            };
        case `REMOVE_PENDING_REQUEST_SUCCESS`:
            return {
                ...state,
                isLoading: false,
                success: true,
                error: false,
                pendingRequest: null,
                pendingError: false
            };
        case `REMOVE_PENDING_REQUEST_ERROR`:
            return {
                ...state,
                isLoading: false,
                error: true,
            };
        default:
            return {
              ...state,
            };
        }
}