
const defaultState = [];

const cocktailReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_USER_COCKTAILS':
            return action.payload;
        case 'ADD_USER_COCKTAIL':
            return [...state, action.payload];
        default:
            return state;
    }
}

export default cocktailReducer;