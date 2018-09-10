const initialState = {
  pendingRequest: []
}
export default function (state = initialState, action={}) {
  switch (action.type) {		
  case `GET_ORDERS_LOADING`:
    return {
        ...state,
        isLoading: true,
        success: false,
      };

  case `GET_ORDERS_SUCCESS`:
  const oldRequest = state.pendingRequest;
  oldRequest.find((index) =>{
      if(index.type == 'GET_ORDERS'){index.pending = false }
  })
      return {
        ...state,
        isLoading: false,
        success: true,
        ordersData: action.payload.data.slice(0,4),
        error: false,
        pendingRequest: oldRequest,
      };

  case `GET_ORDERS_ERROR`:
  const onlineStatus = navigator.onLine;
  if(onlineStatus == false){
      const pendingRequest = {
          type: 'GET_ORDERS',
          url: action.payload.config.url,
          pending: true
      };
      const oldRequest = state.pendingRequest.filter((index)=> index.type !== 'GET_ORDERS');
      oldRequest.push(pendingRequest);
      return {
          ...state,
          pendingRequest: oldRequest,
          onlineStatus: false,
          error: true
      };
  }
  case `GET_LIST_LOADING`:
  return {
      ...state,
      isLoading: true,
      success: false,
  };
  case `GET_LIST_SUCCESS`:
  const newRequest = state.pendingRequest;
  newRequest.find((index) =>{
      if(index.type == 'GET_LIST'){index.pending = false }
  })
  return {
      ...state,
      isLoading: false,
      success: true,
      listData: action.payload.data.slice(0,4),
      error: false,
      pendingRequest: newRequest,
  };
  case `GET_LIST_ERROR`:
  const online = navigator.onLine;
  if(online == false){
      const pendingRequest = {
          type: 'GET_LIST',
          url: action.payload.config.url,
          pending: true
      };
      const oldRequest = state.pendingRequest.filter((index)=> index.type !== 'GET_LIST');
      oldRequest.push(pendingRequest);
      return {
          ...state,
          pendingRequest: oldRequest,
          error: true
      };
  }
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
  default:
    return {
      ...state,
    };
}
}