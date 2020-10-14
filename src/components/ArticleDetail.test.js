import React from 'react';
import { shallow } from 'enzyme';
import ArticleDetail from './ArticleDetail';

describe('<ArticleDetail />', () => {
    it('should render without errors', () => {
      const component = shallow(<ArticleDetail />);
      const wrapper = component.find('.ArticleDetail');
      expect(wrapper.length).toBe(1);
    });
  
    it('should render Article title', () => {
      const component = shallow(<ArticleDetail 
        title={'TEST_TITLE'} />);
      let wrapper = component.find('.title');
      expect(wrapper.text()).toEqual('TEST_TITLE');
    });
  });
  