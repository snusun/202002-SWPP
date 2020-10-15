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
        {id: 1, email: "swpp@snu.ac.kr", password: "iluvswpp", 
            name: "Software Lover", logged_in: true},
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
    const stubUsers = [
        {id: 1, email: "swpp@snu.ac.kr", password: "iluvswpp", 
            name: "Software Lover", logged_in: true},
        {id: 2, email: "swpp@snu.ac.kr", password: "2", 
            name: "2", logged_in: true},
        {id: 3, email: "swpp@snu.ac.kr", password: "3", 
            name: "3", logged_in: true},
    ];
    const stubInitialState = {
      users: stubUsers,
    }
    const newState = reducer(stubInitialState, {
      type: actionTypes.LOGIN,
      user: stubUsers,
      thisUser: stubUser,
      logged_in: true
    });
    expect(newState).toEqual({
        users: [
          {id: 1, email: "swpp@snu.ac.kr", password: "iluvswpp", 
          name: "Software Lover", logged_in: true},
        {id: 2, email: "swpp@snu.ac.kr", password: "2", 
            name: "2", logged_in: true},
        {id: 3, email: "swpp@snu.ac.kr", password: "3", 
            name: "3", logged_in: true},
        ],
        thisUser: undefined,
        logged_in: true,
    });
  });
  /*
  it('should delete article', () => {
    const stubInitialState = {
      articles: [stubArticle],
      selectedArticle: null,
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.DELETE_ARTICLE,
      targetID: 1,
    });
    expect(newState).toEqual({
      articles: [],
      selectedArticle: null
    });
  });
  */
  it('should logout', () => {
    const stubUsers = [
        {id: 1, email: "swpp@snu.ac.kr", password: "iluvswpp", 
            name: "Software Lover", logged_in: true},
        {id: 2, email: "swpp@snu.ac.kr", password: "2", 
            name: "2", logged_in: true},
        {id: 3, email: "swpp@snu.ac.kr", password: "3", 
            name: "3", logged_in: true},
    ];
    const newState = reducer(undefined, {
      type: actionTypes.LOGOUT,
      thisUser: null,
    });
    expect(newState).toEqual({
        users: [],
        thisUser: null,
        logged_in: false,
    });
  });
})

