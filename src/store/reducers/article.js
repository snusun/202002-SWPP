import * as actionTypes from '../actions/actionTypes';

const initialState = {
    articles: [],
    selectedArticle: null,
    clickCreate: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ARTICLE:
            const newArticle = {
                id: state.articles.length + 1,
                author_id: action.author_id, title: action.title, content: action.content, 
            };
            return {...state, articles: [...state.articles, newArticle]}; 
        case actionTypes.DELETE_ARTICLE:
            const filtered = state.todos.filter(art => art.id !== action.targetID);
            return {...state, articles: filtered}
        /*case actionTypes.GET_ARTICLE:
            const selectedArticle = state.articles.find(art => art.id === action.targetID); 
            //target = {...state.articles[action.targetID - 1]};
            return {...state, selectedArticle: selectedArticle};
            */
        case actionTypes.GET_ALL:
            return {...state, articles: action.articles };
        case actionTypes.GET_ARTICLE:
            return {...state, selectedArticle: action.target };
    }
        
    return state;
}
export default reducer;