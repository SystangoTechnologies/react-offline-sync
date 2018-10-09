import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import 'jsdom-global/register';
import { default as withPendingRequest } from '../index';
import { toast } from "react-toastify";

describe('Test on HOC', () => {
    const mockStore = configureStore();
    const store = mockStore({
        orders: {
            pendingRequest: [{
                type: 'TEST',
                pending: false
            }, {
                type: 'TEST1_ERROR',
                pending: false
            }, {
                type: 'TEST2',
                pending: true,
                url: 'www.test.com/list'
            }, {
                type: 'TEST3',
                pending: true,
                url: 'www.test.com/posts'
            }],
            error: '',
            success: true
        },
        getPendingRequest: jest.fn(),
        clearPendingRequest: jest.fn()
    });
    const props = { 
        store, 
        pendingRequest: [{
            type: 'TEST',
            pending: false
        }, {
            type: 'TEST1_ERROR',
            pending: false
        }, {
            type: 'TEST2',
            pending: true,
            url: 'www.test.com/list',
            data: {}
        }, {
            type: 'TEST3',
            pending: true,
            url: 'www.test.com/posts',
            data: {}
        }],
        clearPendingRequest: jest.fn(), 
        getPendingRequest: jest.fn() 
    };

    it('should render wrapped component', () => {
        const WrappedComponent = <h1>Testing on HOC</h1>
        const WrapComponent = withPendingRequest(WrappedComponent);
        const wrapper = shallow(<WrapComponent {...props} />);
        expect(wrapper).toHaveLength(1);
    });
    
    it('should call clearRequest on component update', () => {
        const WrappedComponent = <h1>Testing on HOC</h1>
        const WrapComponent = withPendingRequest(WrappedComponent);
        const wrapper = shallow(<WrapComponent.WrappedComponent {...props} />);
        wrapper.setProps(props.pendingRequest);
    });

    it('should call event listener when online', () => {
        const addEventListener = window.addEventListener;
        window.addEventListener = jest.fn(addEventListener);
        localStorage.setItem("requests", JSON.stringify(props.pendingRequest));
        global.navigator = { onLine: true };
        const WrappedComponent = <h1>Testing on HOC</h1>;
        const WrapComponent = withPendingRequest(WrappedComponent);
        const wrapper = shallow(<WrapComponent.WrappedComponent {...props} />);
        wrapper.instance().listener();
        expect(window.addEventListener).toHaveBeenCalled();
        expect(props.getPendingRequest).toBeCalledTimes(2);
        expect(props.clearPendingRequest).toBeCalledTimes(6);
        toast.success('test', {});
    });

    it('should call event listener when offline', () => {
        const addEventListener = window.addEventListener;
        window.addEventListener = jest.fn(addEventListener);
        localStorage.setItem("requests", JSON.stringify(props.pendingRequest));
        global.navigator = { onLine: false };
        const WrappedComponent = <h1>Testing on HOC</h1>;
        const WrapComponent = withPendingRequest(WrappedComponent);
        const wrapper = shallow(<WrapComponent.WrappedComponent {...props} />);
        wrapper.instance().listener();
        expect(window.addEventListener).toHaveBeenCalled();
        toast.success('test', {});
    });
});