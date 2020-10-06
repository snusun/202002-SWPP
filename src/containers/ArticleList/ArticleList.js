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

    handleLogoutButton = () => {
        this.props.logout();
    }


    render() {
        /*
        const name='', author_id=0;
        if(this.props.storedArticles) { //null check
            author_id = this.props.storedArticles.author_id;
            name = (this.props.users.find(user => (user.id === author_id))).name;
        }
        */
        const articles = this.props.storedArticles.map((art) => {
            return ( <Article key={art.id} id={art.id} title={art.title}
                        content={art.content} author_id={art.author_id}
                        name={(this.props.users.find(user => (user.id === art.author_id))).name}
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
                <button id='logout-button' onClick={ () => this.handleLogoutButton() }>logout</button>
            </div>
        );
    }
}

const mapStateToProps = state => { //get info from store
    return {
        selectedArticle: state.art.selectedArticle,
        clickCreate: state.art.clickCreate,
        storedArticles: state.art.articles,
        users: state.user.users,
    };
}


const mapDispatchToProps = dispatch => {
    return {
        onGetAll: () => dispatch(actionCreators.getArticles()),
        logout: () => dispatch(actionCreators.logout()),
    }
}


export default connect(mapStateToProps ,mapDispatchToProps)(withRouter(ArticleList));