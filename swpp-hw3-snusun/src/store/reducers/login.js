import * as actionTypes from '../actions/actionTypes';

const initialState = {
    users: [],
    thisUser: null,
    logged_in: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USERS:
            return {...state, users: action.users };
        case actionTypes.GET_USER:
            return {...state, thisUser: action.target };
        case actionTypes.LOGIN:
            const loginedUser = state.users.find(user => (user.email === action.user.email && user.password === action.user.password));
            return {...state, thisUser: loginedUser, logged_in: true };
        case actionTypes.LOGOUT:
            return {...state, thisUser: null, logged_in: false };       
    }
        
    return state;
}
export default reducer;