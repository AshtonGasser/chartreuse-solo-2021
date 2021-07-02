import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* deleteIngredient (action) {
    try {
        yield axios.delete(`/api/ingredients/${action.payload.id}`);
        yield put ({ type: "FETCH_INGREDIENT" })
    }catch (error) {
        console.error(`${error} in DELETE ingredient`);
      }
}

function* deleteIngredients (action) {
    try {
        const body = {
            ids: action.payload.ids
        };
        yield axios.post('/api/ingredients/delete-ingredients', body);
        yield put ({ type: "FETCH_INGREDIENT" })
    } catch (error) {
        console.error(`${error} in DELETE ingredients`);
    }
}

function* deleteIngredientSaga () {
    yield takeLatest("DELETE_INGREDIENT", deleteIngredient)
    yield takeLatest("DELETE_INGREDIENTS", deleteIngredients)
}

export default deleteIngredientSaga