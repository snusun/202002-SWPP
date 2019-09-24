import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import './NewTodo.css';

class NewTodo extends Component {
  state = {
    title: '',
    content: '',
    submitted: false
  }

  postTodoHandler = () => {
    const data =
      { title: this.state.title, content: this.state.content }
    alert('submitted' + data.title);
    // this.props.history.push('/todos');
    this.props.history.goBack();
    this.setState({ submitted: true });
  }

  render() {
    let redirect = null;
    if (this.state.submitted) {
      redirect = <Redirect to='/todos' />
    }
    return (
      <div className="NewTodo">
        <h1>Add a New Todo!</h1>
        <label>Title</label>
        <input
          type="text"
          value={this.state.title}
          onChange={(event) => this.setState({ title: event.target.value })}
        ></input>
        <label>Content</label>
        <textarea rows="4" type="text" value={this.state.content}
          onChange={(event) => this.setState({ content: event.target.content })}
        >
        </textarea>
        <button onClick={() => this.postTodoHandler()}>Submit</button>
      </div>
    );
  }
}

export default NewTodo;