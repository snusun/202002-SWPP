import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import articleReducer from './store/reducers/article';

const rootReducer = combineReducers({
    art: articleReducer,
    //user: userReducer,
});
const store = createStore(rootReducer,/* window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),*/ applyMiddleware(thunk));
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
