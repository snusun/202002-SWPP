import React from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'; 

import Login from './containers/Login/Login';
import ArticleList from './containers/ArticleList/ArticleList';
import NewArticle from './containers/ArticleList/NewArticle/NewArticle';
import ArticleDetail from './components/ArticleDetail';
import RealDetail from './containers/ArticleList/RealDetail/RealDetail';

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App">
        <Switch>
          <Route path='/login' exact component={Login} />
          <Route path='/articles' exact render={() => <ArticleList title="ARTICLES!" />} />
          <Route path='/articles/create' exact render={(props) =><NewArticle {...props}/>}/>
          <Route path='/articles/:id' exact render={(props) =><RealDetail {...props}/>} />
          <Redirect exact from='/' to='/login' />
          <Route render={ () => <h1>Not Found</h1>} />
          </Switch>
        </div>
    </ConnectedRouter>
  );
}

export default App;
