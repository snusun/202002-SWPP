import React, { Component } from 'react';
import axios from 'axios';

import Todo from '../../components/Todo/Todo';
import TodoDetail from '../../components/TodoDetail/TodoDetail';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

import './TodoList.css';

import * as actionTypes from '../../store/actions/actionTypes';
import * as actionCreators from '../../store/actions/index';

class TodoList extends Component {
  componentDidMount(){
    this.props.onGetAll();
    //axios.get("api/todo");
    //.then(result => console.log(result))
    //.catch(error => console.error('Oops! ${error}'));
  }

  clickTodoHandler = (td) => {
    this.props.history.push('/todos/' + td.id);
  }

  render() {
    const todos = this.props.storedTodos.map((td) => {
      return (
        <Todo
          key={td.id}
          title={td.title}
          done={td.done}
          clickDetail={ () => this.clickTodoHandler(td)}
          clickDone={ () => this.props.onToggleTodo(td.id)}
          clickDelete={ () => this.props.onDeleteTodo(td.id)}
          clicked={() => this.clickTodoHandler(td)}
        />
      );
    });

    let todo = null;
  
    return (
      <div className="TodoList">
        <div className='title'>
          {this.props.title}
        </div>
        <div className='todos'>
          {todos}
        </div>
        {todo}
        <NavLink to='/new-todo' exact>New Todo</NavLink>
      </div>
    )
  }
}

//get info
const mapStateToProps = state => {
  return {
    storedTodos: state.td.todos,
    selectedTodo: state.td.selectedTodo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleTodo: (id) => dispatch({ type: actionTypes.TOGGLE_DONE, targetID: id}),
    onDeleteTodo: (id) => dispatch({ type: actionTypes.DELETE_TODO, targetID: id}),
    onGetAll: () => dispatch(actionCreators.getTodos()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TodoList));
//export default TodoList;