import React from 'react';
import { addRequest } from '../actions/actionGetOrders';

function getType(action) {
    const pos = action.type.indexOf("ERROR");
    const type = action.type.slice(0, pos-1);
    return type; 
}
const getRequest = (state, action) => {
    const online = navigator.onLine;
    if (online == false) {
        const oldLocalRequests = JSON.parse(localStorage.getItem('requests'));
        const { pendingRequest } = state.getState().orders;
        const type = getType(action);
        const pendingReq = {
            type: type,
            url: action.payload.config.url,
            pending: true,
            data: action.payload.config.data
        };
        const oldRequest = pendingRequest.filter((index) => index.type !== type);
        oldRequest.push(pendingReq);
        if(oldLocalRequests && oldLocalRequests.length > 1 ) {
            const oldReq = oldLocalRequests.filter((index) => index.type !== type);
            oldReq.push(pendingReq);
            localStorage.setItem('requests', JSON.stringify(oldReq));
        }else {
            localStorage.setItem('requests', JSON.stringify(oldRequest));
        }
        state.dispatch(addRequest(oldRequest));
    } else {
        state.dispatch(addRequest([]));
    }
};

export default getRequest;

// const getRequest = (state, action, type) => {
//     console.log('props: ----', state, action, type);
//     // const { state, action, type } = props;
//     const online = navigator.onLine;
//     if (online == false) {
//         const pendingRequest = {
//             type: type,
//             url: action.payload.config.url,
//             pending: true
//         };
//         const oldRequest = state.pendingRequest.filter((index) => index.type !== 'GET_LIST');
//         oldRequest.push(pendingRequest);
//         return oldRequest;
//     } else {
//         return [];
//     }
// };