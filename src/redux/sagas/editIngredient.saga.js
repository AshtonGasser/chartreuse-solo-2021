import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* editIngredient(action) {
    console.log('in edit ingredients');
    try{
        const body = {
            field: action.payload.field,
            value: action.payload.value,
        };
        yield axios.put(`api/ingredients/${action.payload.id}`, body);
        yield put ({ type: "FETCH_INGREDIENT" });
    }catch (error) {
        console.error(`${error} in get editIngredient`);
      }
}

function* editIngredientSaga(){
    yield takeLatest("EDIT_INGREDIENT", editIngredient)
}

export default editIngredientSaga