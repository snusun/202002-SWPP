import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import RealDetail from './RealDetail';
import { getMockStore } from '../../../test-utils/mocks';
import { history } from '../../../store/store';
import * as articleActionCreators from '../../../store/actions/article';
import * as commentActionCreators from '../../../store/actions/comment';
import * as userActionCreators from '../../../store/actions/login';

const stubComment = {
    id: 12,
    article_id: 16,
    author_id: 1,
    content: "I like it"
}

const stubUser = {
  id: 1,
  email: "swpp@snu.ac.kr",
  password: "iluvswpp",
  name: "Software Lover",
  logged_in: true
}

const stubArticle = {
  id: 12,
  author_id: 1,
  title: "Building the New facebook.com with React, GraphQL and Relay",
  content: "Open source projects like React, GraphQL and Relay are powering more and more Facebook services. In this session, we'll discuss how we use the latest features of these technologies, like React Suspense, to help deliver a high quality, modern web experience at Facebook."
}

const ArticleInitialState = {
  selectedArticle: stubArticle,
  users: [stubUser],
  articles: [
      {
          id: 12,
          author_id: 1,
          title: "Building the New facebook.com with React, GraphQL and Relay",
          content: "Open source projects like React, GraphQL and Relay are powering more and more Facebook services. In this session, we'll discuss how we use the latest features of these technologies, like React Suspense, to help deliver a high quality, modern web experience at Facebook."
      },
      {
          id: 13,
          author_id: 1,
          title: "React State with Hooks: useReducer, useState, useContext",
          content: "If you haven't used state management excessively in React Function Components, this tutorial may help you to get a better understanding of how React Hooks -- such as useState, useReducer, and useContext -- can be used in combination for impressive state management in React applications. In this tutorial, we will almost reach the point where these hooks mimic sophisticated state management libraries like Redux for globally managed state. Let's dive into the application which we will implement together step by step."
      }
  ]
}

const UserInitialState = {
  users: [stubUser],
  thisUser: stubUser,
  logged_in: true,
  author: null,
}

const CommentInitialState = {
  selectedComment: [stubComment],
  comment: stubComment,
  clickedComment: stubComment,
}

var mockStore = getMockStore({art: ArticleInitialState, user: UserInitialState, com: CommentInitialState}, { previewMode: false});

describe('<RealDetail />', () => {
  let realDetail, spyGetArticle, spyDeleteArticle, spyLogout, spyGetComments,
    spyStoreComment, spyGetComment, spyDeleteComment, spyEditComment, spyHistoryPush;
  //let articleDetail;
  let match_test = { params: {id: 12}};
  beforeEach(() => {
    realDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact history={history} match={match_test} render={() =><RealDetail/>} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetArticle = jest.spyOn(articleActionCreators, 'getArticle')
        .mockImplementation(id => { return dispatch => {}; });
    
    spyDeleteArticle = jest.spyOn(articleActionCreators, 'deleteArticle')
        .mockImplementation(id => { return dispatch => {}; });

    spyLogout = jest.spyOn(userActionCreators, 'logout')
        .mockImplementation(id => { return dispatch => {}; });

    spyGetComments = jest.spyOn(commentActionCreators, 'getComments')
        .mockImplementation(id => { return dispatch => {}; });
        
    spyStoreComment = jest.spyOn(commentActionCreators, 'postComment')
        .mockImplementation(id => { return dispatch => {}; });
        
    spyGetComment = jest.spyOn(commentActionCreators, 'getComments')
        .mockImplementation(id => { return dispatch => {}; });

    spyDeleteComment = jest.spyOn(commentActionCreators, 'deleteComment')
        .mockImplementation(id => { return dispatch => {}; });

    spyEditComment = jest.spyOn(commentActionCreators, 'editComment')
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
    expect(wrapper.at(0).text()).toBe("Building the New facebook.com with React, GraphQL and Relay");
    expect(wrapper.at(1).text()).toBe("Open source projects like React, GraphQL and Relay are powering more and more Facebook services. In this session, we'll discuss how we use the latest features of these technologies, like React Suspense, to help deliver a high quality, modern web experience at Facebook."
    );
  });

  it('should render SELECTED_COMMENT', () => {
    const component = mount(realDetail);
    const wrapper = component.find('.comments');
    expect(wrapper.length).toBe(1);
  });

  it(`should not render SELECTED_ARTICLE`, () => {
    const mockInitialStore = getMockStore({articles: [], selectedArticle: null, selectedComment: []});
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
    //expect(wrapper.at(0).at(0).text()).toBe('');
    //expect(wrapper.at(1).text()).toBe('');
  });

  it("should edit article", () => {
    const component = mount(realDetail);
    let wrapper = component.find("#edit-article-button");
    wrapper.simulate("click");
  });

  it("should delete article", () => {
    const component = mount(realDetail);
    let wrapper = component.find("#delete-article-button");
    wrapper.simulate("click");
    expect(spyHistoryPush).toHaveBeenCalledWith('/articles');
    expect(spyDeleteArticle).toHaveBeenCalledTimes(1);
  });

  it("should go article list", () => {
    const component = mount(realDetail);
    let wrapper = component.find("#back-detail-article-button");
    wrapper.simulate("click");
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it(`should set comment input`, () =>{
    const content = 'TEST';
    const component = mount(realDetail);
    const wrapper = component.find('textarea');
    wrapper.simulate('change', {target: {value: newCommentContent}})
    const commentInstance = component.find(RealDetail.WrappedComponent).instance();
    expect(commentInstance.state.content).toEqual(content);
  })

  it(`should make new comment`, () => {
    const content = 'TEST';
    const component = mount(realDetail);
    const wrapper = component.find('textarea');
    wrapper.simulate('change', {target: {value: content}})
    const wrapper2 = component.find('#new-comment-content-input');
    wrapper2.simulate('click');
    expect(spyStoreComment).toHaveBeenCalledTimes(1);
    //expect(wrapper.text()).toBe("I like it");
  });
});