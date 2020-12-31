import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { getMockStore } from "../../test-utils/mocks";
import { history } from "../../store/store";

import Login from "./Login";
import * as actionCreators from '../../store/actions/login';
import axios from "axios";

var stubInitialState = {
    logged_in: true,
};

var mockStore = getMockStore(stubInitialState);

describe("<Login />", () => {
    let login; let spyHistoryPush;
    let spyAxios_get; let spyAxios_put;
    let spyAlert;
    beforeEach(() => {
        login = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={Login} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );

        spyAxios_put = jest.spyOn(axios, "put")
            .mockImplementation(() => Promise.resolve({}));

        spyAxios_get = jest.spyOn(axios, "get")
            .mockImplementation(() => Promise.resolve({}));
            
        spyHistoryPush = jest.spyOn(history, "push").mockImplementation(() => {
            return dispatch => { dispatch() };
        });

        window.alert = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("should not call 'userLogin' when input is not valid", () => {
        mockStore = getMockStore({ logged_in: false });
        const component = mount(login);
        let wrapper = component.find(".Login");
        wrapper.simulate("click");
    });

    it("Login Page should render without errors", () => {
        const component = mount(login);
        const wrapper = component.find(".Login");
        expect(wrapper.length).toBe(1);
    });

    it("should call 'userLogin' when clicked", () => {
        mockStore = getMockStore({ logged_in: true });
        const component = mount(login);
        component
            .find('#email-input')
            .simulate("change", { target: { value: 'test@snu.ac.kr' } });
        component
            .find('#pw-input')
            .simulate("change", { target: { value: "testpw" } });

        let wrapper = component.find("#login-button");
        wrapper.simulate("click");
        expect(spyAxios_get).toHaveBeenCalledTimes(1);
    });

    it("should redirect to /articles", () => {
        mockStore = getMockStore({ logged_in: true });
        login = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={Login} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        mount(login);
        expect(spyAxios_get).toHaveBeenCalledTimes(1);
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
});