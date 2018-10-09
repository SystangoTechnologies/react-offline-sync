import React from 'react';
import {
    shallow,
    mount
} from 'enzyme';
import HomeContainer from '../index';
import {
    Container,
    Row,
    Col,
    Button
} from 'reactstrap';
import Post from '../../Post';
import {
    PulseLoader
} from 'react-spinners';
import configureStore from 'redux-mock-store';
import 'jsdom-global/register';

describe('Test on Home Container', () => {
    const mockStore = configureStore();
    const store = mockStore({
        orders: {
            postsData: [{},{}],
            listData: [{},{}],
            name: 'test',
            isLoading: false
        }
    });
    const props = {
        getPost: jest.fn(),
        getList: jest.fn(),
        addForm: jest.fn(),
        getForm: jest.fn(),
        name: 'test'
    };
    it('should render reactstrap elements',() => {
        const wrapper = mount(shallow(<HomeContainer {...props} store={store}/>).get(0));
        expect(wrapper.find(Container)).toHaveLength(1);
        expect(wrapper.find(Button)).toHaveLength(3);
        expect(wrapper.find(Row)).toHaveLength(5);
        expect(wrapper.find(Col)).toHaveLength(10);
        expect(wrapper.find(Post)).toHaveLength(4);
    });

    it('should call event on html elements', () => {
        const event = {
            target: {
                value: ''
            }
        };
        const wrapper = mount(shallow(<HomeContainer {...props} store={store} />).get(0));
        wrapper.find(Button).at(0).props().onClick(props.getPost());
        wrapper.find(Button).at(1).props().onClick(props.getList());
        wrapper.find(Button).at(2).props().onClick(props.addForm());
        expect(props.getPost).toHaveBeenCalled();
        expect(props.getList).toHaveBeenCalled();
        expect(props.addForm).toHaveBeenCalled();
        expect(wrapper.find('input').props().onChange(event));
    });

    it('should render elements with isLoading false',() => {
        const store = mockStore({
            orders: {
                isLoading: true,
                pendingRequest: []
            }
        });
        const props = {
            getPost: jest.fn(),
            getList: jest.fn(),
            addForm: jest.fn(),
            getForm: jest.fn()
        };
        const wrapper = mount(shallow(<HomeContainer {...props} store={store} />).get(0));
        wrapper.setProps({ id: 'test1'});
        wrapper.props().getForm();
        expect(wrapper.find(PulseLoader)).toHaveLength(1);
        expect(wrapper.find('h3')).toHaveLength(2);
    }); 
});