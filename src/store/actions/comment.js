import * as actionTypes from './actionTypes';
import axios from 'axios';
import { push } from 'connected-react-router';
import { compose } from 'redux';

export const getComments_ = (comments, article_id) => {
    debugger;
  return { type: actionTypes.GET_COMMENTS, comments: comments, article_id: article_id };
};

export const getComments = (article_id) => {
  return dispatch => {
    return axios.get('/api/comments')
      .then(res => dispatch(getComments_(res.data, article_id)));
  };
};

export const postComment_ = (com) => {
    return {
      type: actionTypes.ADD_COMMENT,
      id: com.id,
      article_id: com.article_id,
      author_id: com.author_id,
      content: com.content
    };
  };

  /*
"id": 1,
      "article_id": 0,
      "author_id": 2,
      "content": "What do you mean wow?"
*/
  
  export const postComment = (com) => {
    return (dispatch) => {
      return axios.post('/api/comments/', com)
        .then(res => {
          dispatch(postComment_(res.data));
          //debugger;
          //dispatch(push(`/articles/${res.data.id}`));
          //debugger;
        });
    };
  };

  
  export const deleteComment_ = (id) => {
    return {
      type: actionTypes.DELETE_COMMENT,
      targetID: id
    };
  };
  
  export const deleteComment = (id) => {
    return dispatch => {
      return axios.delete('/api/comments/' + id)
        .then(() => dispatch(deleteComment_(id)));
    };
  };
  
  /*
  export const getComment_ = (com) => {
    return { type: actionTypes.GET_COMMENT, target: com };
  };
  
  export const getComment = (id) => {
    return dispatch => {
      return axios.get('/api/comments/' + id)
        .then(res => {
          dispatch(getComment_(res.data))
        });
    };
  };
  */
 export const getComment_ = (com) => {
  return { type: actionTypes.GET_COMMENT, target: com };
};

export const getComment = (id) => {
  return dispatch => {
    return axios.get('/api/comments/' + id)
      .then(res => {
        dispatch(getComment_(res.data))
      });
  };
};