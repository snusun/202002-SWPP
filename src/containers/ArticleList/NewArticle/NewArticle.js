import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes';
import * as actionCreators from '../../../store/actions/index';
import RealDetail from '../RealDetail/RealDetail';

class NewArticle extends Component {
  state = {
    author_id: 0,
    title: '',
    content: '',
    submitted: false,
  }
  postArticleHandler = (art) => {
    const data = { title: this.state.title, content: this.state.content };
    this.props.onStoreArticle(this.state.title, this.state.content, this.state.author_id);
    alert('Submitted\n' + data.title + '\n' + data.content);
    this.setState( {submitted: true} );

    //this.props.history.push('/articles/' + art.id);
   }

  render() {
    
    if (this.state.submitted) {
        return <Redirect to='/articles' />
         }
         
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

/*
const mapStateToProps = state => { //get info from store
    return {
        selectedArticle: state.art.selectedArticle,
        clickCreate: state.art.clickCreate,
        storedArticles: state.art.articles
    };
}*/

const mapDispatchToProps = dispatch => {  //put info to store
  return {
    onStoreArticle: (title, content, author_id) =>
      dispatch(actionCreators.postArticle({title: title, content: content, author_id: author_id}))
  };
};

export default connect(null, mapDispatchToProps)(NewArticle);