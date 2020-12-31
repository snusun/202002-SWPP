import * as actionTypes from './actionTypes';
import axios from 'axios';
import { push } from 'connected-react-router';

export const getArticles_ = (articles) => {
  return { type: actionTypes.GET_ALL, articles: articles };
};

export const getArticles = () => {
  return dispatch => {
    return axios.get('/api/articles') //user info is in /api/user
      .then(res => dispatch(getArticles_(res.data)));
  };
};

export const postArticle_ = (art) => {
    return {
      type: actionTypes.ADD_ARTICLE,
      id: art.id,
      title: art.title,
      content: art.content,
      author_id: art.author_id
    };
  };
  
  export const postArticle = (art) => {
    return (dispatch) => {
      return axios.post('/api/articles/', art)
        .then(res => {
          dispatch(postArticle_(res.data));
          //debugger;
          dispatch(push(`/articles/${res.data.id}`));
          //debugger;
        });
    };
  };

  
  export const deleteArticle_ = (art) => {
    return {
      type: actionTypes.DELETE_ARTICLE,
      targetID: art.id
    };
  };
  
  export const deleteArticle = (id) => {
    return dispatch => {
      return axios.delete('/api/articles/' + id)
        .then(res => dispatch(deleteArticle_(id)));
    };
  };
  
  export const getArticle_ = (art) => {
    return { type: actionTypes.GET_ARTICLE, target: art };
  };
  
  export const getArticle = (id) => {
    return dispatch => {
      return axios.get('/api/articles/' + id)
        .then(res => {
          dispatch(getArticle_(res.data))
        });
    };
  };