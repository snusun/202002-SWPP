import * as actionTypes from '../actions/actionTypes';
const initialState = {
    todos: [
        { id: 1, title: 'SWPP', content: 'take swpp class', done: true },
        { id: 2, title: 'Movie', content: 'watch movie', done: false },
        { id: 3, title: 'Dinner', content: 'eat dinner', done: false }
      ],
      selectedTodo: null
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TODO:
          const newTodo = {
            id: action.id,
            title: action.title,
            content: action.content,
            done: action.done,
          };
          return { ...state, todos: state.todos.concat(newTodo) };
        case actionTypes.TOGGLE_DONE:
          const modified = state.todos.map((td) => {
            if (td.id === action.targetID) {
              return { ...td, done: !td.done };
            } else {
              return td;
            }
          });
          return { ...state, todos: modified };
        case actionTypes.DELETE_TODO:
            const deletedTodos = state.todos.filter((todo) => {
              return todo.id !== action.targetID;
            });
            return { ...state, todos: deletedTodos };
        case actionTypes.GET_TODO:
          //const target = { ...state.todos[action.targetID - 1] };
          //return { ...state, selectedTodo: target };
          //const selectedTodo = state.todos.find(td => td.id === parseInt(action.targetID));
          return {...state, selectedTodo: action.target};
        //return state; //break;
        case actionTypes.GET_ALL:
                return {...state, todos: action.todos};
        
      }
      return state;
}
export default reducer;