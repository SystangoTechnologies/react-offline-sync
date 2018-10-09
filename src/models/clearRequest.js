import React from 'react';
import { removeRequest } from '../actions/actionGetOrders';

const clearRequest = (state, action) => {
    const {
         pendingRequest
    } = state.getState().orders;
    const type = getType(action);
    const pendingReq = {
        type: type,
        url: action.payload.config.url,
        pending: false
    };
    if (action.type.includes("SUCCESS")) {
        const requests = JSON.parse(localStorage.getItem('requests'));
        for(let key in requests) {
            if(requests[key].type == type){
                requests.splice(key, 1);
            }
        }
        const oldRequest = pendingRequest;
        oldRequest.filter((reqObj) => { 
            if(reqObj.type == type) {
                reqObj.pending = false;
            }
        });
        // oldRequest.push(pendingReq);
        // console.log('old Request: -- ', oldRequest);
        state.dispatch(removeRequest(oldRequest));
        localStorage.setItem('requests', JSON.stringify(requests));
    }
};

function getType(action) {
    const pos = action.type.indexOf("SUCCESS");
    const type = action.type.slice(0, pos - 1);
    return type;
}
export default clearRequest;