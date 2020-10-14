import axios from 'axios';
// import * as router from 'connected-react-router';

import * as actionCreators from './login';
import store from '../store';

var stubUser = {
  id: 0, 
  email: "swpp@snu.ac.kr", 
  password: "iluvswpp", 
  name: "Software Lover", 
  logged_in: true
};

describe('ActionCreators', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })
  
  // Implementation using `spyOn` API
  it(`'getUsers' should fetch users correctly`, (done) => {
    const stubUserList = [stubUser]; // Fake HTTP response

    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubUserList
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.getUsers()).then(() => {
      const newState = store.getState();
      expect(newState.user.users).toBe(stubUserList);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });


  it(`'getUser' should fetch user correctly`, (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubUser
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.getUser()).then(() => {
      const newState = store.getState();
      expect(newState.user.thisUser).toBe(stubUser);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'login' should login correctly`, (done) => {
    const spy = jest.spyOn(axios, 'put')
      .mockImplementation(() => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubUser
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.login(stubUser)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  
  it(`'logout' should logout correctly`, (done) => {
    /*
    const spy = jest.fn(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubUser,
          };
          resolve(result);
        });
      })
     */ 
    const spy = jest.spyOn(axios, 'put')
      .mockImplementation(() => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubUser
          };
          resolve(result);
        });
      })
    
    store.dispatch(actionCreators.logout()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
