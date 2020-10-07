import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../../store/actions/actionTypes';
import * as actionCreators from '../../../store/actions/index';
import Comment from '../../../components/Comment/Comment';

class RealDetail extends Component {
    state = {
        article_id: parseInt(this.props.match.params.id), 
        author_id: 1,
        content: ''
    }

    componentDidMount() {
        this.props.onGetArticle(parseInt(this.props.match.params.id));
        this.props.onGetComments(parseInt(this.props.match.params.id));
        //this.props.onGetComment(parseInt(this.props.match.params.id));
    }

    handleBackButton = () => {
        this.props.history.push('/articles');
    }

    handleDeleteArticleButton = (art) => {
        art = this.props.selectedArticle;
        this.props.onDeleteArticle(art.id);
        this.props.history.push('/articles');
    }

    handleLogoutButton = () => {
        this.props.logout();
    }

    clickCommentEditHandler = (com, id) => {
        this.props.onGetComments(parseInt(this.props.match.params.id));
        var content = prompt('문자열을 입력하세요', this.props.selectedComment.find(com => id === com.id).content);
        if(content !== null) {
            this.props.onEditComment(com);
        }
        this.props.onGetComments(parseInt(this.props.match.params.id));
    }

    clickCommentDeleteHandler = (id) => {
        this.props.onDeleteComment(parseInt(id));
        this.props.onGetComments(parseInt(this.props.match.params.id));
        
    }

    postCommentHandler = () => {
        this.props.onStoreComment(this.state.article_id, this.state.author_id, this.state.content);
        this.props.onGetComments(parseInt(this.props.match.params.id));
    }

    render() {
        let title='', content='', author_id=1, name='';
        if(this.props.selectedArticle) { //null check
            title = this.props.selectedArticle.title;
            content = this.props.selectedArticle.content;
            author_id = this.props.selectedArticle.author_id;
            name = (this.props.users.find(user => (user.id === author_id))).name;
        }

      //debugger;
        const comments = this.props.selectedComment.map((com) => {
            return ( <Comment key={com.id} id={com.id} content={com.content} author_id={com.author_id}
                        article_id={com.article_id}
                        authorName ={(this.props.users.find(user => (user.id === com.author_id))).name}
                        clickedEdit={ () => this.clickCommentEditHandler(com, com.id)}
                        clickedDelete={ () => this.clickCommentDeleteHandler(com.id) }/> );
        })

        return (
            (author_id === 1) ? (
                <div className="TodoDetail">
                    <div>
                    <p id='article-title'>Title: {title}</p>
                    </div>
                    <div>
                        <p id='article-content'>Content: {content}</p>
                    </div>
                    <div>
                        <p id='article-author'>AuthorName: {name}</p>              
                    </div>
                    <div>
                        <button id='edit-article-button'>edit</button>
                        <button id='delete-article-button' onClick={  (art) => this.handleDeleteArticleButton(art) }>delete</button> 
                        <button id='back-detail-article-button' onClick={ () => this.handleBackButton() }>back</button>
                    </div>
                    <div>
                        <textarea id='new-comment-content-input' type="text" value={this.state.content}
                            onChange={(event) => this.setState({ content: event.target.value})}/>
                    </div>
                    <div>
                        <button id='confirm-create-comment-button' onClick={ () => this.postCommentHandler() }
                            disabled={(this.state.content === '')}>create</button>

                    </div>
                    <div className='comments'>{comments}</div>
                    <div>
                        <button id='logout-button' onClick={ () => this.handleLogoutButton() }>logout</button>
                    </div>

                </div>
            ) : (
                <div className="TodoDetail">
                <div>
                <p id='article-title'>Title: {title}</p>
                </div>
                <div>
                    <p id='article-content'>Content: {content}</p>
                </div>
                <div>
                    <p id='article-author'>AuthorName: {name}</p>              
                </div>
                <div>
                    <button id='back-detail-article-button' onClick={ () => this.handleBackButton() }>back</button>
                </div>
                <div>
                    <textarea id='new-comment-content-input' type="text" value={this.state.content}
                        onChange={(event) => this.setState({ content: event.target.value})}/>
                </div>
                <div>
                    <button id='confirm-create-comment-button' onClick={ () => this.postCommentHandler() }
                        disabled={(this.state.content === '')}>create</button>

                </div>
                <div className='comments'>{comments}</div>
                <div>
                    <button id='logout-button' onClick={ () => this.handleLogoutButton() }>logout</button>
                </div>

            </div>            )
        );
    }
}

const mapStateToProps = state => {
    return {
      selectedArticle: state.art.selectedArticle,
      thisUser: state.user.thisUser,
      users: state.user.users,
      selectedComment: state.com.selectedComment,
      comment: state.com.comment,
      clickedComment: state.com.clickedComment
    };
  };
  
const mapDispatchToProps = dispatch => {
    return {
      onGetArticle: id => { dispatch(actionCreators.getArticle(id))},
      onDeleteArticle: (id) => dispatch(actionCreators.deleteArticle(id)),
      logout: () => dispatch(actionCreators.logout()),
      onGetComments: (id) => dispatch(actionCreators.getComments(id)),
      onStoreComment: (article_id, author_id, content) =>
        dispatch(actionCreators.postComment({article_id: article_id, author_id: author_id, content: content})),
      onGetComment: (id) => { dispatch(actionCreators.getComments(id))},
      onDeleteComment: (id) => dispatch(actionCreators.deleteComment(id)),
      onEditComment: (com) => dispatch(actionCreators.editComment(com, com.id))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(RealDetail);