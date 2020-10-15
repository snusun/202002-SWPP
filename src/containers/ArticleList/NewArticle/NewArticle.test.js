import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import NewArticle from './NewArticle';
import { getMockStore } from '../../../test-utils/mocks';
import { history } from '../../../store/store';
import * as articleActionCreators from '../../../store/actions/article';
import * as userActionCreators from '../../../store/actions/login';
import axios from 'axios';

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
    logged_in: true,
    author: null,
    //previewMode: false
}

var mockStore = getMockStore({art: ArticleInitialState, user: UserInitialState});

describe("<NewArticle />", () => {
    let createArticle, spyGetUsers, spyStoreArticle, spyLogout;
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
        
        spyGetUsers = jest.spyOn(userActionCreators, "getUsers").mockImplementation(() => {
            return dispatch => {};
        });

        spyStoreArticle = jest.spyOn(articleActionCreators, "postArticle").mockImplementation(() => {
            return dispatch => {};
        });

        spyLogout = jest.spyOn(userActionCreators, "logout").mockImplementation(() => {
            return dispatch => {};
        });

        spyHistoryPush = jest.spyOn(history, "push").mockImplementation(() => {
            return dispatch => { dispatch() };
        });

        /*
        spyAxios_post = jest
            .spyOn(axios, "post")
            .mockImplementation(() => Promise.resolve({}));
            */
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should load properly", async () => {
        const component = mount(createArticle);
        let wrapper = component.find(".NewArticle");
        expect(wrapper.length).toBe(1);
        await expect(spyGetUsers).toBeCalledTimes(1);
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
        //previewMode = true;
        //expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it("should logout", () => {
        const component = mount(createArticle);
        let wrapper = component.find(".NewArticle #logout-button");
        wrapper.simulate("click");
        //expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
});
