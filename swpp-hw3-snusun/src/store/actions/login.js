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

export const login_ = (user) => {
    return { type: actionTypes.LOGIN, /*logged_in: true,*/
        user:user};
}

export const login = () => {
    return dispatch => {
        return axios.put('/api/user/1', {id: 1, email: "swpp@snu.ac.kr", password: "iluvswpp", name: "Software Lover", logged_in: true})
        .then(user => dispatch(login_(user)))
        .then(dispatch(push('/articles')));
    }
}

export const logout_ = () => {
    return { type: actionTypes.LOGOUT, logged_in: false };
};

export const logout = () => {
    return dispatch => {
        dispatch(logout_());
        dispatch(push('/login'));
    }
}
