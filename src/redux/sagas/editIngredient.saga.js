import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import Ingredients from "../../components/Ingredients/Ingredients";

function* editIngredient(action) {
    console.log('in edit ingredients');
    try{
        const update= yield axios.put(`api/ingredients/${action.payload.id}`)
        yield put({type: "EDIT_ONCHANGE", payload: ingredients.data})
    }catch (error) {
        console.error(`${error} in get editIngredient`);
      }
}

function* editIngredientSaga(){
    yield takeLatest("EDIT_INGREDIENT", editIngredient)
}

export default editIngredientSaga