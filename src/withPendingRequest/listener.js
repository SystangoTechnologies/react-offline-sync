import React from 'react';
import {
    connect
} from 'react-redux';
import getRequest from '../models/getRequest';
import clearRequest from '../models/clearRequest';

export const customMiddleWare = store => next => action => {
    if(action.error) {
        getRequest(store, action);
    }
    // console.log('in middleware', store);
    if(action.type.includes("SUCCESS")) {
        clearRequest(store, action);
    }
    next(action);
}