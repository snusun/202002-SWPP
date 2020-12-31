import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes';
import * as actionCreators from '../../../store/actions/index';
import RealDetail from '../RealDetail/RealDetail';

class NewArticle extends Component {
  state = {
    author_id: 1,
    title: '',
    content: '',
    submitted: false,
    previewMode: false
  }
  
  postArticleHandler = (art) => {
    if(!(this.state.title === '' || this.state.content === '')) {
      art = this.props.selectedArticle;
      this.props.onStoreArticle(this.state.title, this.state.content, this.state.author_id);
      this.setState( {submitted: true} );
    }
   }

  handleBackButton = () => {
    this.props.history.push('/articles');
  }

  handleLogoutButton = () => {
    this.props.logout();
  }

  handleWriteButton = () => {
    this.setState({ previewMode: false });
  } 

  handlePreviewButton = () => {
    this.setState({ previewMode: true });
  } 

  render() {
    return (
      (!this.state.previewMode) ? (
        <div className="NewArticle"> 
          <h1>Add a Article</h1>
          <div>
              <label>Title </label>
              <input type="text" id='article-title-input' value={this.state.title}
                  onChange={(event) => this.setState({ title: event.target.value })} />
          </div>
          <div>
              <label>Content </label>
              <textarea id='article-content-input' rows="4" type="text" value={this.state.content}
              onChange={(event) => this.setState({ content: event.target.value })} />
          </div>
          <div>
            <button id='back-create-article-button' onClick={() => this.handleBackButton()}>back</button>
            <button id='confirm-create-article-button' onClick={(art) => this.postArticleHandler(art)} 
              disabled={(this.state.title === '' || this.state.content === '')}>confirm</button>
            <button id='preview-tab-button' onClick={() => this.handlePreviewButton() } >preview</button>
            <button id='write-tab-button'>write</button>
          </div>
          <div>
            <button id='logout-button' onClick={ () => this.handleLogoutButton() }>logout</button>
          </div>
        </div>
      ) : (
        <div className="Preview"> 
          <h1>Preview</h1>
        <div>
          <p id='article-author'>Author: {(this.props.users.find(user => (user.id === this.state.author_id))).name}</p>
          <p id='article-title'>Title: {this.state.title}</p>
          <p id='article-content'>Content: {this.state.content}</p>
        </div>
        <div>
          <button id='back-create-article-button' onClick={() => this.handleBackButton()}>back</button>
          <button id='confirm-create-article-button' onClick={(art) => this.postArticleHandler(art)} 
            disabled={(this.state.title === '' || this.state.content === '')}>confirm</button>
          <button id='preview-tab-button'>preview</button>
          <button id='write-tab-button' onClick={() => this.handleWriteButton() }>write</button>
        </div>
        <div>
          <button id='logout-button' onClick={ () => this.handleLogoutButton() }>logout</button>
        </div>
        <div></div>
      </div>
      )
    )
  }
}


const mapStateToProps = state => { //get info from store
    return {
        selectedArticle: state.art.selectedArticle,
        users: state.user.users,
    };
}

const mapDispatchToProps = dispatch => {  //put info to store
  return {
    onStoreArticle: (title, content, author_id) =>
      dispatch(actionCreators.postArticle({title: title, content: content, author_id: author_id})),
    logout: () => dispatch(actionCreators.logout()),  
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle);