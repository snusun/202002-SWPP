import { ConnectedRouter } from 'connected-react-router';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { history } from '../../store/store';
import { getMockStore } from '../../test-utils/mocks';
import TodoCalendar from "./TodoCalendar";
import Calendar from '../../components/Calendar/Calendar';
import * as actionCreators from '../../store/actions/todo';

jest.mock('../../components/Calendar/Calendar', () => {
    return jest.fn(props => {
        return (
            <div>
                <div className = "year">{props.year}</div>
                <div className = "month">{props.month}</div>
                <div>{props.todos}</div>
                <div className = "clickDone" onClick = {props.clickDone}/>
            </div>
        );
    });
});

const stubInitialState = {
    // Same with state from TodoCalendar
    year: 2019,
    month: 10,
}

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
    let todoCalendar;
    beforeEach(() => {
        todoCalendar = (
            <Provider store = {mockStore}>
                <ConnectedRouter history = {history}>
                    <Switch>
                        <Route path = '/' exact render = {() => <TodoCalendar/>}/>
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    });
    
    it('should render TodoCalendar', () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('TodoCalendar');
//        const wrapper = component.find('.TodoCalendar');

        expect(wrapper.length).toBe(1);
    });
    it('should call handleClickPrev', () => {
        const component = mount(todoCalendar);
        //const wrapper = component.find('.clickPrev');
        const wrapper = component.find('button').at(0);
        for(let i=0; i<12; i++)wrapper.simulate('click');
        const year = parseInt(component.find(Calendar).find('.year').text());
        expect(year).toBe(stubInitialState.year - 1);
    });
    it('should call handleClickNext', () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('button').at(1);
        for(let i=0; i<12; i++)wrapper.simulate('click');
        const year = parseInt(component.find(Calendar).find('.year').text());
        expect(year).toBe(stubInitialState.year + 1);
    });
    it('should call clickDone', () => {
        const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
        .mockImplementation(id => { return dispatch => {}; });
        const component = mount(todoCalendar);
        const wrapper = component.find('.clickDone').at(0);
        wrapper.simulate('click');
        expect(spyToggleTodo).toHaveBeenCalledTimes(1);
    });
});