import React from 'react';
import { shallow } from 'enzyme';
import Todo from './Todo';

describe('<Todo />', () => {
  it('should render without errors', () => {
    const component = shallow(<Todo />);
    const wrapper = component.find('.Todo');
    expect(wrapper.length).toBe(1);
  });
});
