import React from 'react';
import {
    shallow,
    mount
} from 'enzyme';
import 'jsdom-global/register';
import clearRequest from '../clearRequest';

describe('Test on clearRequest', () => {
    const pendingRequest = [{
        type: 'TEST',
        pending: false
    }, {
        type: 'TEST1',
        pending: false
    }, {
        type: 'TEST2',
        pending: true
    }];
    const state = {
        getState: jest.fn(() => ({orders: { pendingRequest } })),
        dispatch: jest.fn()
    }
    const payload = {
        config: {
            url:'www.test.com/posts'
        }
    }

    it('should run when action includes success', () => {
        const action = {
            type: 'TEST_SUCCESS',
            payload: payload
        };
        localStorage.setItem('requests', JSON.stringify(pendingRequest));
        clearRequest(state, action);
        expect(localStorage.getItem('requests')).toBeDefined();
        localStorage.removeItem('requests');
    });

    it('should run when action includes error', () => {
        const action = {
            type: 'TEST_ERROR',
            payload: payload
        };
        localStorage.setItem('requests', JSON.stringify(pendingRequest));
        clearRequest(state, action);
        expect(localStorage.getItem('requests')).toEqual(JSON.stringify(pendingRequest));
        localStorage.removeItem('requests');
    });
});