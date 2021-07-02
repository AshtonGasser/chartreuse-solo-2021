import { combineReducers } from 'redux';

const ingredient = (state = [], action) => {
    switch (action.type) {
        case 'SET_INGREDIENT':
            return action.payload;
        default:
            return state;
    }
}
const newIngredient = (state = [], action) => {
    switch (action.type) {
        case 'ADD_INGREDIENT':
            return action.payload;
            default:
                return state;
    }
}

export default combineReducers({ingredient, newIngredient})