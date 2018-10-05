import { getForm } from "../actions/actionGetOrders";

const initialState = {
    pendingRequest: [],
    success: false,
    name: [],
    isLoading: false,
    id: ''
}

export default function (state = initialState, action={}) {
    switch (action.type) {		
        case `GET_POSTS_LOADING`:
            return {
                ...state,
                isLoading: true,
                success: false,
            };

        case `GET_POSTS_SUCCESS`:
            return {
                ...state,
                isLoading: false,
                success: true,
                postsData: action.payload.data.slice(0,4),
                error: false
            };

        case `GET_POSTS_ERROR`:
            return {
                ...state,
                onlineStatus: false,
                error: true
            };
        case `GET_LIST_LOADING`:
            return {
                ...state,
                isLoading: true,
                success: false,
            };
        case `GET_LIST_SUCCESS`:
        return {
            ...state,
            isLoading: false,
            success: true,
            listData: action.payload.data.slice(0,4),
            error: false,
        };
        case `GET_LIST_ERROR`:
            return {
                ...state,
                error: true
            };
        case `REMOVE_PENDING_REQUEST`:
        const request = state.pendingRequest;
        request.filter((index) => {
            if(index.pending == false){
                request.pop(index);
            }
        });
            return {
                ...state,
                isLoading: false,
                success: true,
                error: false,
                pendingRequest: request,
            };
        case `ADD_FORM_LOADING`:
            return {
                ...state,
                isLoading: true,
                error: false
            };
        case `ADD_FORM_SUCCESS`:
            return {
                ...state,
                isLoading: false,
                success: true,
                error: false,
                id: action.payload.data.name
            };
        case `ADD_FORM_ERROR`:
            return {
                ...state,
                error: true
            };
        case `GET_FORM_LOADING`:
            return {
                ...state,
                isLoading: true,
                success: false
            };
        case `GET_FORM_SUCCESS`:
        const localId = action.payload.data.filter((index)=> index == id);
        console.log('GET_FORM_SUCCESS', localId);
            return {
                ...state,
                isLoading: false,
                success: true,
                name: action.payload.data,
                error: false,
            };
        case `GET_FORM_ERROR`:
            return {
                ...state,
                error: true
            };
        case `ADD_REQUEST`:
            return {
                ...state,
                pendingRequest: action.oldRequest
            };
        case `REMOVE_REQUEST`:
        // const req = action.oldRequest;
        // const newRequest = state.pendingRequest;
        // newRequest.pop()  
        // console.log('in reducer remove request:', action.oldRequest);
            return {
                ...state,
                pendingRequest: action.oldRequest
            };
        default:
            return {
                ...state,
            };
    }
}