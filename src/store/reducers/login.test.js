import React from 'react';

import reducer from './login';
import * as actionTypes from '../actions/actionTypes';

const stubUser = {
    id: 1, 
    email: "swpp@snu.ac.kr", 
    password: "iluvswpp", 
    name: "Software Lover", 
    logged_in: true
  };

describe('Login Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({
        users: [],
        thisUser: null,
        logged_in: false,
    });
  });

  it('should get user', () => {
    const stubUser = {
        id: 1, 
        email: "swpp@snu.ac.kr", 
        password: "iluvswpp", 
        name: "Software Lover", 
        logged_in: true
      };
    const newState = reducer(undefined, {
      type: actionTypes.GET_USER,
      thisUser: stubUser,
    });
    expect(newState).toEqual({
        users: [],
        thisUser: undefined,
        logged_in: false,
    });
  });

  it('should get all users', () => {
    const stubUsers = [
        {id: 1, email: "swpp@snu.ac.kr", password: "1", 
            name: "1", logged_in: true},
        {id: 2, email: "swpp@snu.ac.kr", password: "2", 
            name: "2", logged_in: true},
        {id: 3, email: "swpp@snu.ac.kr", password: "3", 
            name: "3", logged_in: true},
    ];
    const newState = reducer(undefined, {
      type: actionTypes.GET_USERS,
      users: stubUsers,
    });
    expect(newState).toEqual({
        users: stubUsers,
        thisUser: null,
        logged_in: false,
    });
  });

  it('should login', () => {
    const stubUser = {
        id: 1, 
        email: "swpp@snu.ac.kr", 
        password: "iluvswpp", 
        name: "Software Lover", 
        logged_in: true
      };
    const newState = reducer(undefined, {
      type: actionTypes.LOGIN,
      thisUser: stubUser,
      logged_in: true
    });
    expect(newState).toEqual({
        users: [],
        thisUser: undefined,
        logged_in: true,
    });
  });

  it('should logout', () => {
    /*
    const stubUsers = [
        {id: 1, email: "swpp@snu.ac.kr", password: "1", 
            name: "1", logged_in: true},
        {id: 2, email: "swpp@snu.ac.kr", password: "2", 
            name: "2", logged_in: true},
        {id: 3, email: "swpp@snu.ac.kr", password: "3", 
            name: "3", logged_in: true},
    ];*/
    const newState = reducer(undefined, {
      type: actionTypes.LOGIN,
      thisUser: null,
    });
    expect(newState).toEqual({
        users: [],
        thisUser: undefined,
        logged_in: true,
    });
  });
})

