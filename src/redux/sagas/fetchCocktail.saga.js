import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
function* fetchCocktail() {
    console.log('in fetch ingredient');
    //get all ingredients from db
    try{
        const cocktail = yield axios.get("/api/cocktail");
        console.log(`in fetchCocktail generator`);
        yield put({type: "SET_COCKTAIL", payload: cocktail.data})
    }catch {
        console.log("ERROR in fetchCocktail Saga");
      }
}

function* cocktailFetchSaga() {
    yield takeLatest("FETCH_COCKTAIL", fetchCocktail)
}

export default cocktailFetchSaga