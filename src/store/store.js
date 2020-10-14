import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';                                           
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

//import todoReducer from './reducers/todo';
import articleReducer from './reducers/article';
import userReducer from './reducers/login';
import commentReducer from './reducers/comment';

export const history = createBrowserHistory();
const rootReducer = combineReducers({
  art: articleReducer,
  user: userReducer,
  com: commentReducer,
  router: connectRouter(history),
});
export const middlewares = [thunk, routerMiddleware(history)]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,
  composeEnhancers(
    applyMiddleware(...middlewares)));

export default store;