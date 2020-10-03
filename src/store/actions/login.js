import * as actionTypes from './actionTypes';
import axios from 'axios';
import { push } from 'connected-react-router';

export const getUsers_ = (users) => {
  return { type: actionTypes.GET_USERS, users: users };
};

export const getUsers = () => {
  return dispatch => {
    return axios.get('/api/user')
      .then(res => dispatch(getUsers_(res.data)));
  };
};

export const getUser_ = (user) => {
    return { type: actionTypes.GET_USER, target: user };
  };
  
export const getUser = () => {
    return dispatch => {
        return axios.get('/api/user/1')
            .then(res => dispatch(getUser_(res.data)));
    };
};

export const login = (user) => {
    return dispatch => {
        dispatch(login_(user));
        dispatch(push('/articles'));
    }
}

export const login_ = (user) => {
    return { type: actionTypes.LOGIN, logged_in: true,
        targetEmail: user.email, targetPassword: user.password};
}

export const logout = () => {
    return { type: actionTypes.LOGOUT, logged_in: false };
};
