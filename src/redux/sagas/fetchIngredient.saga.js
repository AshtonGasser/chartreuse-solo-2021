import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
function* fetchIngredient() {
    console.log('in fetch ingredient');
    //get all ingredients from db
    try{
        const ingredient = yield axios.get("/api/ingredients");
        console.log(`in fetch ingredient generator`);
        yield put({type: "SET_INGREDIENT", payload: ingredient.data})
    }catch {
        console.log("ERROR in fetchIngredient Saga");
      }
}

function* ingredientFetchSaga() {
    yield takeLatest("FETCH_INGREDIENT", fetchIngredient)
}

export default ingredientFetchSaga