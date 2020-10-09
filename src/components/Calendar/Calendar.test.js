import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import { Table } from 'semantic-ui-react'
import Calendar from './Calendar';


it('should render Calendar', () => {
    const component = shallow(<Calendar/>);
    const wrapper = component.find('Table');
    //const wrapper = component.find('.Calendar');
    expect(wrapper.length).toBe(1);
});
it('should build dates properly', () => {
    const component = shallow(Calendar({
        year: 2020,
        month: 10,
        todos: [],
    }));
    const wrapper = component.find('.date');
    expect(wrapper.length).toBe(31);
});
it('should handle clicks for done todos', () => {
    const mockClickDone = jest.fn();
    const component = shallow(Calendar({
        year: 2020,
        month: 10,
        todos: [{id: 1, year: 2020, month: 9, date: 8, done: true,},
                {id: 2, year: 2020, month: 9, date: 8, done: false,},
            ],
        clickDone: mockClickDone,
    }))
    const wrapper = component.find('.done');
    wrapper.simulate('click');
    expect(mockClickDone).toHaveBeenCalledTimes(1);
});
it('should handle clicks for undone todos', () => {
    const mockClickDone = jest.fn();
    const component = shallow(Calendar({
        year: 2020,
        month: 10,
        todos: [{id: 1, year: 2020, month: 9, date: 8, done: true,},
                {id: 2, year: 2020, month: 9, date: 8, done: false,},
            ],
        clickDone: mockClickDone,
    }))
    const wrapper = component.find('.notdone');
    wrapper.simulate('click');
    expect(mockClickDone).toHaveBeenCalledTimes(1);
});