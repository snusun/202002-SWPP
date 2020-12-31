import React from 'react';
import { shallow } from 'enzyme';
import Comment from './Comment';

describe('<Comment />', () => {
    it('should render without errors', () => {
      const component = shallow(<Comment />);
      const wrapper = component.find('.Comment');
      expect(wrapper.length).toBe(1);
    });
    
    it('should render author name', () => {
      const component = shallow(<Comment authorName={'TEST_NAME'} />);
      const wrapper = component.find('div').at(1);
      expect(wrapper.text()).toEqual('author name: TEST_NAME');
    });  
  
    it('should render content', () => {
      const component = shallow(<Comment content={'TEST_CONTENT'} />);
      const wrapper = component.find('div').at(2);
      expect(wrapper.text()).toEqual('Content: TEST_CONTENT');
    });  

    it('should handle edit clicks', () => {
      const mockClickDone = jest.fn();
      const component = shallow(<Comment clickedEdit={mockClickDone} />);
      const wrapper = component.find('#edit-comment-button');
      wrapper.simulate('click');
      expect(mockClickDone).toHaveBeenCalledTimes(1);
    });

    it('should handle delete clicks', () => {
      const mockClickDone = jest.fn();
      const component = shallow(<Comment clickedDelete={mockClickDone} />);
      const wrapper = component.find('#delete-comment-button');
      wrapper.simulate('click');
      expect(mockClickDone).toHaveBeenCalledTimes(1);
    });
  });
  