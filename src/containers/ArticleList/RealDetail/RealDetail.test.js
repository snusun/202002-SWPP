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
  users: [
      {id: 1, email: "swpp@snu.ac.kr", password: "1", 
        name: "1", logged_in: true},
      {id: 2, email: "swpp@snu.ac.kr", password: "2", 
        name: "2", logged_in: true},
      {id: 3, email: "swpp@snu.ac.kr", password: "3", 
        name: "3", logged_in: true}
  ],
  selectedComment: [{
    id: 1,
    article_id: 1,
    author_id: 1,
    content: "HI"
  }]
};

const mockStore = getMockStore(stubInitialState);

describe('<RealDetail />', () => {
  let realDetail, spyGetArticle, spyHistoryPush;
  beforeEach(() => {
    realDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact render={(props) =><RealDetail {...props}/>} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetArticle = jest.spyOn(actionCreators, 'getArticle')
        .mockImplementation(id => { return dispatch => {}; });
    
    spyHistoryPush = jest.spyOn(history, "push").mockImplementation(() => {
        return dispatch => { dispatch() };
    });
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
          <Route path='/' exact render={(props) =><RealDetail {...props}/>} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const wrapper = component.find('.ArticleDetail');
    expect(wrapper.at(0).text()).toBe('');
    expect(wrapper.at(1).text()).toBe('');
  });

  it("should delete article", () => {
    const component = mount(realDetail);
    let wrapper = component.find("#delete-article-button");
    wrapper.simulate("click");
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });
});