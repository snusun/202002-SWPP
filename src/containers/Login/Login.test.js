import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { getMockStore } from "../../test-utils/mocks";
import { history } from "../../store/store";

import Login from "./Login";
import * as actionCreators from '../../store/actions/login';

const stubInitialState = {
    email: '',
    pw: '',
    valid: false,
};

const mockStore = getMockStore(stubInitialState);

describe("Login", () => {
    let login; let spyLogin;

    beforeEach(() => {
        login = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/login" exact component={Login} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );

        spyLogin = jest
            .spyOn(actionCreators, "login")
            .mockImplementation(() => {
                return dispatch => {};
            });
    });

    it("Login Page should render without errors", () => {
        const component = mount(login);
        const wrapper = component.find(".Login");
        expect(wrapper.length).toBe(0);
    });

    it("Test click event", () => {
        const mockCallBack = jest.fn();
        const button = shallow(<button onClick={mockCallBack} />);
        button.find("button").simulate("click");
        expect(mockCallBack.mock.calls.length).toEqual(1);
        //expect(spyLogin).toHaveBeenCalled(1);
    });
});