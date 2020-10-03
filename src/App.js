import React, { Component }from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'; 
import { connect } from 'react-redux';

import Login from './containers/Login/Login';
import ArticleList from './containers/ArticleList/ArticleList';
import NewArticle from './containers/ArticleList/NewArticle/NewArticle';
import ArticleDetail from './components/ArticleDetail';
import RealDetail from './containers/ArticleList/RealDetail/RealDetail';

import * as actionCreators from './store/actions/index';

//import { withRouter } from 'react-router';


class App extends React.Component {
  componentDidMount() {
    if(!this.props.logged_in) {
      this.props.history.push('/login')
    }
  }

  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <div className="App">
          { this.props.logged_in ? (
          <Switch>
            <Route path='/articles' exact render={() => <ArticleList title="ARTICLES!" />} />
            <Route path='/articles/create' exact render={(props) =><NewArticle {...props}/>}/>
            <Route path='/articles/:id' exact render={(props) =><RealDetail {...props}/>} />
            <Route render={ () => <h1>Not Found</h1>} />
            </Switch>
          ) : (
            <Switch>
              <Redirect exact from='/' to='/login' />
              <Route path='/login' exact component={Login} />
            </Switch>
          )
          }  
          </div>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    logged_in: state.user.logged_in,
  }
};

const mapDispatchToProps = dispatch => {
  // return { 
  //   inLogin: () => {
  //     dispatch(actionCreators.login())
  //   }
  // };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);