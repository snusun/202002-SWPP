import React from 'react';

import reducer from './article';
import * as actionTypes from '../actions/actionTypes';

const stubArticle = {id: 1, author_id: 0, title: 'I love', content: 'SWPP'};

describe('Article Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({
        articles: [],
        selectedArticle: null,
        clickCreate: false,
    });
  });

  it('should add article', () => {
    const newState = reducer(undefined, {
      type: actionTypes.ADD_ARTICLE,
      id: stubArticle.id,
      author_id: stubArticle.author_id,
      title: stubArticle.title,
      content: stubArticle.content
    });
    expect(newState).toEqual({
      articles: [stubArticle],
      clickCreate: false,
      selectedArticle: null
    });
  });

  it('should delete article', () => {
    const stubInitialState = {
      articles: [stubArticle],
      selectedArticle: null,
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.DELETE_ARTICLE,
      targetID: 1,
    });
    expect(newState).toEqual({
      articles: [],
      selectedArticle: null
    });
  });

  it('should get article', () => {
    const stubSelectedArticle = {id: 1, author_id: 0, title: 'title', content: 'content'};
    const newState = reducer(undefined, {
      type: actionTypes.GET_ARTICLE,
      target: stubSelectedArticle,
    });
    expect(newState).toEqual({
      articles: [],
      clickCreate: false,
      selectedArticle: stubSelectedArticle
    });
  });

  it('should get all articles', () => {
    const stubArticles = [
      {id: 1, author_id: 0, title: '1', content: '1'},
      {id: 2, author_id: 0, title: '2', content: '2'},
      {id: 3, author_id: 0, title: '3', content: '3'},
    ];
    const newState = reducer(undefined, {
      type: actionTypes.GET_ALL,
      articles: stubArticles,
    });
    expect(newState).toEqual({
      articles: stubArticles,
      clickCreate: false,
      selectedArticle: null,
    });
  });
})

