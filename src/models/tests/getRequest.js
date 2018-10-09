import React from 'react';
import {
    shallow,
    mount
} from 'enzyme';
import 'jsdom-global/register';
import getRequest from '../getRequest';

describe('Test on getRequest', () => {
    const pendingRequest = [{
        type: 'TEST',
        pending: false
    }, {
        type: 'TEST1_ERROR',
        pending: false
    }, {
        type: 'TEST2',
        pending: true
    }];
    const state = {
        getState: jest.fn(() => ({
            orders: {
                pendingRequest
            }
        })),
        dispatch: jest.fn()
    }
    const payload = {
        config: {
            url: 'www.test.com/posts'
        }
    }
    const action = {
        type: 'TEST_ERROR',
        payload: payload
    };
    
    it('should render ', () => {
        global.navigator = {
            onLine: false
        };
        localStorage.setItem('requests', JSON.stringify(pendingRequest));
        getRequest(state, action);
        expect(localStorage.getItem('requests')).toBeDefined();
        localStorage.removeItem('requests');
    });

    it('should run without localStorage', () => {
        global.navigator = {
            onLine: false
        };
        getRequest(state, action);
        expect(localStorage.getItem('requests')).toBeDefined();
        localStorage.removeItem('requests');
    });

    it('should render ', () => {
        global.navigator = {
            onLine: true
        };
        getRequest(state, action);
        expect(localStorage.getItem('requests')).toBeNull();
    });
});