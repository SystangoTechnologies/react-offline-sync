const initialState = {
    pendingRequest: [],
    success: false,
    name:'',
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
                error: true,
                isLoading: false
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
                error: true,
                isLoading: false
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
                error: true,
                isLoading: false
            };
        case `GET_FORM_LOADING`:
            return {
                ...state,
                isLoading: true,
                success: false
            };
        case `GET_FORM_SUCCESS`:
        let localRes = [];
        for(let key in action.payload.data) {
            localRes.push({
                ...action.payload.data[key],
                id: key
            });
        }
        let localName = localRes.filter(index => index.id == state.id);
        console.log('GET_FORM_SUCCESS', localName);
            return {
                ...state,
                isLoading: false,
                success: true,
                name: localName[0] ? localName[0].name : state.name,
                error: false,
                id: ''
            };
        case `GET_FORM_ERROR`:
            return {
                ...state,
                error: true,
                isLoading: false
            };
        case `ADD_REQUEST`:
            return {
                ...state,
                pendingRequest: action.oldRequest
            };
        case `REMOVE_REQUEST`:
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