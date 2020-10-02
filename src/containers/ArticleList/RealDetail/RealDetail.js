import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../../store/actions/actionTypes';
import * as actionCreators from '../../../store/actions/index';

class RealDetail extends Component {
    componentDidMount() {
        this.props.onGetArticle(parseInt(this.props.match.params.id));
    }

    handleBackButton = () => {
        this.props.history.push('/articles');
    }

    render() {
        let title='', content='', author_id=0;
        if(this.props.selectedArticle) { //null check
            title = this.props.selectedArticle.title;
            content = this.props.selectedArticle.content;
            author_id = this.props.selectedArticle.author_id;
        }

        return (
            <div className="TodoDetail">
                <div>
                   <p id='article-title'>Title: {title}</p>
                </div>
                <div>
                    <p id='article-content'>Content: {content}</p>
                </div>
                <div>
                    <p id='article-author'>AuthorID: {author_id}</p>              
                </div>
                <div>
                    <button id='edit-article-button'>edit</button>
                    <button id='delete-article-button' onClick={ () => this.handleDeleteButton() }>delete</button> 
                    <button id='back-detail-article-button' onClick={ () => this.handleBackButton() }>back</button>
                </div>
                <div>
                    <textarea id='new-comment-content-input' type="text"/>
                </div>
                <div>
                    <button id='confirm-create-comment-button'>create</button>
                    <button id='edit-comment-button'>edit</button> 
                    <button id='delete-comment-button'>delete</button>
                </div>

            </div>
        );
    }
}


/*
<button onClick={props.clickDelete}>Delete</button> <- in render fn

const mapDispatchToProps = dispatch => {
    return {
        onDeleteArticle: (id) => dispatch({ type: actionTypes.DELETE_ARTICLE, tartgetID: id })
    }
}
*/

const mapStateToProps = state => {
    return {
      selectedArticle: state.art.selectedArticle,
    };
  };
  
const mapDispatchToProps = dispatch => {
    return {
      onGetArticle: id => {
        dispatch(actionCreators.getArticle(id))
      }
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(RealDetail);
  

//export default RealDetail;

