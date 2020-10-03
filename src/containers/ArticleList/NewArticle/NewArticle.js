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
  }
  postArticleHandler = (art) => {
    debugger;
    if(!(this.state.title === '' || this.state.content === '')) {
      art = this.props.selectedArticle;
      this.props.onStoreArticle(this.state.title, this.state.content, this.state.author_id);
      this.setState( {submitted: true} );
    }
   }

  render() {
    return (
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
        <button id='back-create-article-button'>back</button>
        <button id='confirm-create-article-button' onClick={(art) => this.postArticleHandler(art)}>confirm</button>
        <button id='preview-tab-button'>preview</button>
        <button id='write-tab-button'>back</button>
      </div>
    );
  }
}


const mapStateToProps = state => { //get info from store
    return {
        selectedArticle: state.art.selectedArticle,
    };
}

const mapDispatchToProps = dispatch => {  //put info to store
  return {
    onStoreArticle: (title, content, author_id) =>
      dispatch(actionCreators.postArticle({title: title, content: content, author_id: author_id}))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle);