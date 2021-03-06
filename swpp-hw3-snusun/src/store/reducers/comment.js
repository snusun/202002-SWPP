import * as actionTypes from '../actions/actionTypes';

const initialState = {
    comments: [],
    selectedComment: [],
    clickedComment: null,
    comment: null,
};

/*
"id": 1,
      "article_id": 0,
      "author_id": 2,
      "content": "What do you mean wow?"
*/

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_COMMENT:
            const newComment = {
                id: state.comments.length + 1,
                article_id: action.article_id, author_id: action.author_id, content: action.content, 
            };
            return {...state, comments: [...state.comments, newComment]}; 
        case actionTypes.DELETE_COMMENT:
            const deleted = state.comments.filter(com => { return com.id !== action.targetID});
            return {...state, comment: deleted}
        case actionTypes.GET_COMMENTS:
            debugger;
            const filtered = action.comments.filter( com => com.article_id === action.article_id ) 
            return {...state, comments: action.comments, selectedComment: filtered };
        /*
            case actionTypes.GET_COMMENT:
            return {...state, selectedComment: action.target };
            */
        case actionTypes.GET_COMMENT:
            return {...state, clickedComment: action.target };
        case actionTypes.EDIT_COMMENT:
            return {...state, comment: action.target}
    }
        
    return state;
}
export default reducer;