const redux = require('redux');
const createStore = redux.createStore;

const initialState = { number: 0 };
const reducer = (state = initialState, action) => {
  if (action.type == 'ADD') {
    return ({ ...state, number: state.number + 1 });
  } else if (action.type == 'ADD_VALUE') {
    return ({ ...state, number: state.number + action.value });
  } else {
    return state;
  }
}

const store = createStore(reducer);
console.log(store.getState());

store.subscribe(() => {
  console.log('[Subscription]', store.getState());
});

store.dispatch({ type: 'ADD' });
store.dispatch({ type: 'ADD_VALUE', value: 5 });