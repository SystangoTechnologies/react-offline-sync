import React from 'react';
import { shallow, mount } from 'enzyme';

import Post from '../index';

describe('Test on post component', () => {
    it('should render html elements', () => {
        const props = {
            title: 'title'
        }
        const wrapper = shallow(<Post {...props}/>);
        expect(wrapper.find('div')).toHaveLength(2);
    });
});