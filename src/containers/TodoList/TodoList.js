import React, { Component } from 'react';
import Todo from '../../components/Todo/Todo';
import './TodoList.css';
import TodoDetail from '../../components/TodoDetail/TodoDetail';
import NewTodo from './NewTodo/NewTodo';
import { NavLink } from 'react-router-dom';


class TodoList extends Component {
    render() {
        const todos = this.state.todos.map((td) => {
            return ( <Todo key={td.id} title={td.title}
            done={td.done} clicked={() => this.clickTodoHandler(td)}/> );
             });

         let todoDetail = null;
         if (this.state.selectedTodo) {
            todoDetail = <TodoDetail title={this.state.selectedTodo.title}
            content={this.state.selectedTodo.content} />
        }

        return (
            <div className="TodoList">
                <div className="title">{this.props.title}</div>
                <div className="todos">{todos}</div>
                {todoDetail}
                <NavLink to='/new-todo' exact>New Todo</NavLink>
                <NewTodo />
            </div>
        );

    }
    
    state = {
        todos: [
        { id: 1, title: 'SWPP', content: 'take swpp class', done: true},
        { id: 2, title: 'Movie', content: 'watch movie', done: false },
        { id: 3, title: 'Dinner', content: 'eat dinner', done: false },
       ],
        selectedTodo: null,
    }

    clickTodoHandler = td => {
        if (this.state.selectedTodo === td) {
         // BAD: this.state.selectedTodo = null; it won't trigger rendering.
         this.setState({selectedTodo: null});
        } else {
         this.setState({selectedTodo: td});
        }
         }
}
export default TodoList;