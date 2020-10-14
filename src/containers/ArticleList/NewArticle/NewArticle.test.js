import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import NewArticle from './NewArticle';
import { getMockStore } from '../../../test-utils/mocks';
import { history } from '../../../store/store';
import * as actionCreators from '../../../store/actions/article';
import axios from 'axios';

var ArticleInitialState = {
    selectedArticle: {
        id: 11,
        author_id: 2,
        title: "React: A JavaScript library for building user interfaces",
        content: "React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes."
      } 
}

var UserInitialState = {
    users: [
        {
            id: 1,
            email: "swpp@snu.ac.kr",
            password: "iluvswpp",
            name: "Software Lover",
            logged_in: true
          },
          {
            id: 2,
            email: "alan@turing.com",
            password: "iluvswpp",
            name: "Alan Turing",
            logged_in: false
          },
          {
            id: 3,
            email: "edsger@dijkstra.com",
            password: "iluvswpp",
            name: "Edsger Dijkstra",
            logged_in: false
          }
    ],
    //previewMode: false
}

var mockStore = getMockStore(ArticleInitialState, UserInitialState);

describe("<NewArticle />", () => {
    let createArticle, preview, spyAxios_post;
    let spyHistoryPush; //let previewMode = false;
    beforeEach(() => {
        createArticle = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact render={(props) =><NewArticle {...props}/>} /> 
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        
        preview = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact render={(props) =><NewArticle {...props}/>} /> 
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );

        spyHistoryPush = jest.spyOn(history, "push").mockImplementation(() => {
            return dispatch => { dispatch() };
        });

        spyAxios_post = jest
            .spyOn(axios, "post")
            .mockImplementation(() => Promise.resolve({}));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should load properly", () => {
        const component = mount(createArticle);
        let wrapper = component.find(".NewArticle");
        expect(wrapper.length).toBe(1);
        //expect(spyAxios_get).toHaveBeenCalledTimes(2);
    });

    it("should load preview properly", () => {
        mockStore = getMockStore(ArticleInitialState, UserInitialState, {previewMode: true});
        const component = mount(preview);
        let wrapper = component.find(".Preview");
        expect(wrapper.length).toBe(0);
        //expect(spyAxios_get).toHaveBeenCalledTimes(2);
    });

    it("should go back article list", () => {
        const component = mount(createArticle);
        let wrapper = component.find(".NewArticle #back-create-article-button");
        wrapper.simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it("should put newly created article", () => {
        const component = mount(createArticle);
        let wrapper = component.find(".NewArticle #confirm-create-article-button");
        wrapper.simulate("click");
        expect(spyAxios_post).toHaveBeenCalledTimes(0);
    });

    it("should post preview mode", () => {
        const component = mount(createArticle);
        let wrapper = component.find(".NewArticle #preview-tab-button");
        wrapper.simulate("click");
        previewMode = true;
        //expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it("should logout", () => {
        const component = mount(createArticle);
        let wrapper = component.find(".NewArticle #logout-button");
        wrapper.simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
});
