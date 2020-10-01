import React from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Login from './containers/Login/Login';
import ArticleList from './containers/ArticleList/ArticleList';
import NewArticle from './containers/ArticleList/NewArticle/NewArticle';
import ArticleDetail from './components/ArticleDetail';
import RealDetail from './containers/ArticleList/RealDetail/RealDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/login' exact component={Login} />
          <Route path='/articles' exact render={() => <ArticleList title="ARTICLES!" />} />
          <Route path='/articles/create' exact component={NewArticle}/>
          <Route path='/articles/:id' exact component={RealDetail} />
          <Redirect exact from='/' to='/login' />
          <Route render={ () => <h1>Not Found</h1>} />
        </Switch>
      </div>
    </BrowserRouter>  
  );
}

export default App;
