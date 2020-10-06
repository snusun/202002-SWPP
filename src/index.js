import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import articleReducer from './store/reducers/article';
import userReducer from './store/reducers/login';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
const rootReducer = combineReducers({
    art: articleReducer,
    user: userReducer,
    router: connectRouter(history),
});

const composeEnhancers = window.__REDUX__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;

const logger = store => {
  return next => {
    return action => {
      console.log('[Middleware] Dispatching', action);
      const reusult = next(action);
      console.log('[Middleware] Next State', store.getState());
      return reusult;
    }
  }
}

const store = createStore(rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk, routerMiddleware(history))));

ReactDOM.render(
    <Provider store={store}>
      <App history={history}/>
    </Provider>,
    document.getElementById('root')
);

/*
const store = createStore(rootReducer, applyMiddleware(thunk, routerMiddleware(history)));
ReactDOM.render(<Provider store={store}><App history={history} /></Provider>, document.getElementById('root'));
*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
