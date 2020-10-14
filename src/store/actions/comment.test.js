import axios from 'axios';
// import * as router from 'connected-react-router';

import * as actionCreators from './comment';
import store from '../store';

const stubComment = {
  id: 0,
  article_id: 0,
  author_id: 0,
  content: 'content 1'
};

describe('ActionCreators', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })
  
  // Implementation using `spyOn` API
  it(`'getComments' should fetch comments correctly`, (done) => {
    const stubCommentList = [stubComment]; // Fake HTTP response

    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubCommentList
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.getComments()).then(() => {
      const newState = store.getState();
      expect(newState.com.comments).toBe(stubCommentList);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });


  it(`'getComment' should fetch comment correctly`, (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubComment
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.getComment()).then(() => {
      const newState = store.getState();
      expect(newState.com.comment).toBe(null);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'postComment' should post comment correctly`, (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, com) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubComment
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.postComment(stubComment)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'deleteComment' should delete comment correctly`, (done) => {
    const spy = jest.spyOn(axios, 'delete')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: null,
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.deleteComment()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'editComment' should edit comment correctly`, (done) => {
    const spy = jest.spyOn(axios, 'put')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubComment,
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.editComment()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

});
