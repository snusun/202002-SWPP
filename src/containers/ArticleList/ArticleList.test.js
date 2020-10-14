import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import ArticleList from './ArticleList';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/article';

jest.mock('../../components/Article/Article', () => {
    return jest.fn(props => {
      return (
        <div className="spyArticle">
            <div>article id: {props.id}</div>
            <div className='title' onClick={props.clicked}>
                title: {props.title}
            </div>
                author: {props.name}
            </div>);
    });
  });

const stubInitialState = {
    articles: [
        {id: 1, author_id: 0, title: 'ARTICLE_TEST_TITLE_1', content: 'ARTICLE_TEST_CONTENT_1'},
        {id: 2, author_id: 1, title: 'ARTICLE_TEST_TITLE_2', content: 'ARTICLE_TEST_CONTENT_2'},
        {id: 3, author_id: 2, title: 'ARTICLE_TEST_TITLE_3', content: 'ARTICLE_TEST_CONTENT_3'},
    ],
    selectedArticle: null,
    clickCreate: false,
    users: [{id: 1, email: "swpp@snu.ac.kr", password: "1", 
        name: "1", logged_in: true},
      {id: 2, email: "swpp@snu.ac.kr", password: "2", 
        name: "2", logged_in: true},
      {id: 3, email: "swpp@snu.ac.kr", password: "3", 
        name: "3", logged_in: true}
    ],
  };

const mockStore = getMockStore(stubInitialState);


describe('<ArticleList />', () => {
  let articleList, spyGetArticles;

  beforeEach(() => {
    articleList = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact
            render={() => <ArticleList title="ARTICLELIST_TEST_TITLE" />} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetArticles = jest.spyOn(actionCreators, 'getArticles')
      .mockImplementation(() => { return dispatch => {}; });
  })

  it('should render Articles', () => {
    const component = mount(articleList);
    const wrapper = component.find('.spyArticle');
    expect(wrapper.length).toBe(3);
    expect(wrapper.at(0).text()).toBe('TODO_TEST_TITLE_1');
    expect(wrapper.at(1).text()).toBe('TODO_TEST_TITLE_2');
    expect(wrapper.at(2).text()).toBe('TODO_TEST_TITLE_3');
    expect(spyGetArticles).toBeCalledTimes(1);
  });

  it(`should call 'clickArticleHandler'`, () => {
    const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation(path => {});
    const component = mount(articleList);
    const wrapper = component.find('.spyArticle .title').at(0);
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  /*
  it("Test click event", () => {
    const mockCallBack = jest.fn();
    const button = shallow(<button onClick={mockCallBack} />);
    button.find("button").simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
  */
});

