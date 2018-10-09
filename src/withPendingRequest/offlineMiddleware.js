import React from 'react';
import {
    connect
} from 'react-redux';
import getRequest from '../models/getRequest';
import clearRequest from '../models/clearRequest';

const offlineMiddleWare = store => next => action => {
    if(action.error) {
        getRequest(store, action);
    }
    if(action.type.includes("SUCCESS")) {
        clearRequest(store, action);
    }
    next(action);
}

export default offlineMiddleWare;