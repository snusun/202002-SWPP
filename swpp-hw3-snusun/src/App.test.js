import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import App from './App';
import { getMockStore } from './test-utils/mocks';
import { history } from './store/store';
import axios from 'axios';

const initialState = {
   articles: [], selectedArticle: null, clickCreate: false
}

var mockStore = getMockStore(initialState, { logged_in: false });

/*
jest.mock('./containers/ArticleList/ArticleList', () => {
  return jest.fn(props => {
    return (
      <div className="spyArticleList">
        {props.title}
      </div>);
  });
});
*/

describe('App', () => {
  let app;
  let spyAxios_get;
  let spyHistoryPush;

  beforeEach(() => {
    app = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <App history={history}/>
        </ConnectedRouter>
      </Provider>
    );

    spyAxios_get = jest
            .spyOn(axios, "get")
            .mockImplementation(() =>
                Promise.resolve({ data: { logged_in: true } }),
    );

    spyHistoryPush = jest.spyOn(history, "push").mockImplementation(() => {
            return dispatch => { dispatch() };
        });
  });

  //below all error...
  it('should render', () => {
    const component = mount(app);
    expect(component.find('.App').length).toBe(1);
    expect(spyAxios_get).toHaveBeenCalledTimes(1);
  });

  it('should redirect to browse when logged in', () => {
      mockStore = getMockStore(
        { logged_in: true },
        initialState,
      );
      app = (
        <Provider store={mockStore}>
          <ConnectedRouter history={history}>
            <App history={history}/>
          </ConnectedRouter>
        </Provider>
      ); 
      const component = mount(app);
      expect(component.find('.App').length).toBe(1); 
      expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  })

  it('should redirect to browse when logged out', () => {
    mockStore = getMockStore(
      { logged_in: false },
      initialState,
    );
    app = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <App history={history}/>
        </ConnectedRouter>
      </Provider>
    ); 
    const component = mount(app);
    expect(component.find('.App').length).toBe(1); 
    expect(spyHistoryPush).toHaveBeenCalledTimes(2);
})
});
