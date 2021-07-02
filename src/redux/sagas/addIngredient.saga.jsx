import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* addIngredient(action) {
    try{
        yield axios.post('api/ingredients',action.payload);
        yield put({type: "FETCH_INGREDIENT"})
    }catch (error) {
        console.error(`${error} in POST`);
      }
}

function* postIngredientSaga () {
    yield takeLatest("ADD_INGREDIENT", addIngredient)
}

export default postIngredientSaga;