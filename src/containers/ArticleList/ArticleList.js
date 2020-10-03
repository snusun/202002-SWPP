import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Article from '../../components/Article/Article';
import ArticleDetail from '../../components/ArticleDetail';
import NewArticle from './NewArticle/NewArticle';
import * as actionCreators from '../../store/actions/index';

class ArticleList extends Component {
    componentDidMount() {
        //axios.get("api/articles").then(result => console.log(result.data));
        this.props.onGetAll();
    }
    
    clickArticleHandler = art => {
        this.props.history.push('/articles/' + art.id);
    }


    handleCreateButton = () => {
        this.props.history.push('/articles/create');
    }

    render() {
        const articles = this.props.storedArticles.map((art) => {
            return ( <Article key={art.id} id={art.id} title={art.title}
                        content={art.content} author_id={art.author_id}
                        clicked={ () => this.clickArticleHandler(art)}/> );
        })
        //debugger;
        return (
            <div className='ArticleList'>
                <div className='title'>{this.props.title}</div>
                <div className='articles'>{articles}</div>
                
                <button
                        id='create-article-button'
                        onClick={ () => this.handleCreateButton() }>Create</button>

            </div>
        );
    }
}

const mapStateToProps = state => { //get info from store
    return {
        selectedArticle: state.art.selectedArticle,
        clickCreate: state.art.clickCreate,
        storedArticles: state.art.articles
    };
}


const mapDispatchToProps = dispatch => {
    return {
        onGetAll: () => dispatch(actionCreators.getArticles()),
    }
}


export default connect(mapStateToProps ,mapDispatchToProps)(withRouter(ArticleList));