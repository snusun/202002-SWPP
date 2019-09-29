import axios from 'axios';

import * as actionCreators from './todo';
import store from '../store';

describe('ActionCreators', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  // Implementation using `jest.fn` API
  it(`'getTodo' should fetch todos correctly`, (done) => {
    const stubTodoList = [{
      id: 0,
      title: 'title 1',
      content: 'content 1'
    }, ];

    // Replace axios.get with mock
    axios.get = jest.fn(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubTodoList
        };
        resolve(result);
      })
    });

    store.dispatch(actionCreators.getTodos()).then(() => {
      const newState = store.getState();
      expect(newState.td.todos).toBe(stubTodoList);
      expect(axios.get).toHaveBeenCalledTimes(1);
      done();
    });
  });

  // Implementation using `spyOn` API
  it(`'getTodo' should fetch todos correctly`, (done) => {
    const stubTodoList = [{
      id: 0,
      title: 'title 1',
      content: 'content 1'
    }, ];

    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubTodoList
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.getTodos()).then(() => {
      const newState = store.getState();
      expect(newState.td.todos).toBe(stubTodoList);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
