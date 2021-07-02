import { combineReducers } from 'redux';

const cocktail = (state = [], action) => {
    switch (action.type) {
        case 'SET_COCKTAIL':
            return action.payload;
        default:
            return state;
    }
}
const newCocktail = (state = [], action) => {
    switch (action.type) {
        case 'ADD_COCKTAIL':
            return action.payload;
            default:
                return state;
    }
}

export default combineReducers({cocktail, newCocktail})