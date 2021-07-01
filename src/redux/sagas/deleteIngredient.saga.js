import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* deleteIngredient (action) {
    try {
        yield axios.delete(`/ingredient/${action.payload.id}`);
        yield put ({ type: "FETCH_INGREDIENT"})
    }catch (error) {
        console.error(`${error}in DELETE `);
      }
}

function* deleteIngredientSaga () {
    yield takeLatest("DELETE_INGREDIENT", deleteIngredient)
}

export default deleteIngredientSaga