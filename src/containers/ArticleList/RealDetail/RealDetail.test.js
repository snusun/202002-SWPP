import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import RealDetail from './RealDetail';
import { getMockStore } from '../../../test-utils/mocks';
import { history } from '../../../store/store';
import * as actionCreators from '../../../store/actions/article';

const stubInitialState = {
  articles: [],
  selectedArticle: {
    title: 'SELECTED_TODO_TEST_TITLE',
    content: 'SELECTED_TODO_TEST_CONTENT'
  },
};

const mockStore = getMockStore(stubInitialState);

describe('<RealDetail />', () => {
  let realDetail, spyGetArticle;
  beforeEach(() => {
    realDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact component={RealDetail} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetArticle = jest.spyOn(actionCreators, 'getArticle')
        .mockImplementation(id => { return dispatch => {}; });
  })

  it('should render RealDetail', () => {
    const component = mount(realDetail);
    const wrapper = component.find('.ArticleDetail');
    expect(wrapper.length).toBe(1);
  });

  it(`should render SELECTED_ARTICLE`, () => {
    const component = mount(realDetail);
    const wrapper = component.find('.ArticleDetail');
    expect(wrapper.at(0).text()).toBe('SELECTED_TODO_TEST_TITLE');
    expect(wrapper.at(1).text()).toBe('SELECTED_TODO_TEST_CONTENT');
  });

  it(`should not render SELECTED_ARTICLE`, () => {
    const mockInitialStore = getMockStore({articles: [], selectedArticle: null });
    const component = mount(
      <Provider store={mockInitialStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact component={RealDetail} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const wrapper = component.find('.ArticleDetail');
    expect(wrapper.at(0).text()).toBe('');
    expect(wrapper.at(1).text()).toBe('');
  });
});