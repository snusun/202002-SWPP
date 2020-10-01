import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../../store/actions/actionTypes';
import * as actionCreators from '../../../store/actions/index';

class RealDetail extends Component {
    componentDidMount() {
        this.props.onGetArticle(parseInt(this.props.match.params.id));
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
                <div className="row">
                    <div className="left">
                        Title: 
                    </div>
                    <div className="right">
                        {title}
                    </div>
                </div>
                <div className="row">
                    <div className="left">
                        Content: 
                    </div>
                    <div className="right">
                       {content}
                    </div>
                </div>
                <div className="row">
                    <div className="left">
                        AuthorID: 
                    </div>
                    <div className="right">
                        {author_id}
                    </div>
                    <button  onClick={ () => this.handleDeleteButton() }>delete</button> 
                    
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

