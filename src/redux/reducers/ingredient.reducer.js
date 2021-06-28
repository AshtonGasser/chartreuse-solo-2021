const ingredientReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_INGREDIENT':
            return action.payload;
        default:
            return state;
    }
}

export default ingredientReducer