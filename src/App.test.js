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

var mockStore = getMockStore(initialState);

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
      expect(component.find("App".length).toBe(1)); 
  })

  /*
  it('should be redirected to error page', () => {
    history.push('/aaa');
    const component = mount(app);
    expect(component.find('h1').text()).toBe('Not Found');
  })
  */

  /*
  it("should be login page", () => {
    history.push("/");
    const component = mount(app);
    expect(component.find("h1").text()).toBe("Login Page"); //edit
  });

  it("should be redirected to login page", () => {
    history.push("/login");
    const component = mount(app);
    expect(component.find("h1").text()).toBe("Login Page"); //edit
  });
  */
});
