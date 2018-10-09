import React from 'react';
import {
    shallow,
    mount
} from 'enzyme';
import 'jsdom-global/register';
import { default as offlineMiddleware } from '../offlineMiddleware';

describe('Test on middleware', () => {
    const create = () => {
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
        const store = {
            getState: jest.fn(() => ({
                orders: {
                    pendingRequest
                }
            })),
            dispatch: jest.fn(),
        }
        const next = jest.fn();
        const invoke = (action) => offlineMiddleware(store)(next)(action);
        return {
            store,
            next,
            invoke
        }
    }
    it('should call getRequest', () => {
        const { next, invoke } = create();
        const payload = {
            config: {
                url: 'www.test.com/posts'
            }
        }
        const action = {
            type: 'TEST_ERROR',
            payload: payload,
            error: true
        };
        invoke(action);
        expect(next).toHaveBeenCalledWith(action);
    });

    it('should call clearRequest', () => {
        const {
            next,
            invoke
        } = create();
        const payload = {
            config: {
                url: 'www.test.com/posts'
            }
        }
        const action = {
            type: 'TEST_SUCCESS',
            payload: payload
        };
        invoke(action);
        expect(next).toHaveBeenCalledWith(action);
    })
});