
import userReducer from "./user.reducer";
import {ingredient, newIngredient} from './ingredient.Reducer' 
//test SET_USER
//test UNSET_USER
//test other action
//test initial value

describe("USER REDUCER TESTS", () => {
  test("SET_USER", () => {
    const action = {
      type: "SET_USER",
      payload: {
        id: 1,
      },
    };
    const state = {};
    expect(userReducer(state, action)).toEqual({id: 1})
  });
  test('UNSET_USER', () => {
      const action = {
          type: "UNSET_USER", 
      }
      const state = {id: 1};
      expect(userReducer(state, action)).toEqual({})
  })
});

// describe("USER REDUCER TESTS", () => {
//     test("SET_USER", () => {
//       const action = {
//         type: "SET_USER",
//         payload: {
//           id: 1,
//         },
//       };
//       const state = {};
//       expect(userReducer(state, action)).toEqual({id: 1})
//     });