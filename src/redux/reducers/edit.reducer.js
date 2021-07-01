

const edit = (state = {}, action) => {
  switch (action.type) {
    case "SET_EDIT_INGREDIENT":
      return action.payload;
    case "SET_EDIT_COCKTAIL":
      return [...state, action.payload];
    case "EDIT_ONCHANGE":
      return [...state, action.payload];
      case "EDIT_CLEAR":
          return {ingredients: '' }
    default:
      return state;
  }
};
export default edit;
