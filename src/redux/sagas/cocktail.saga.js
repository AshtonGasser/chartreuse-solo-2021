import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

//cocktail get function

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
    //COCKTAIL POST FUNCTION
    function* addCocktail(action) {
        try {
          yield axios.post("api/cocktail", action.payload);
          yield put({ type: "FETCH_COCKTAIL" });
        } catch (error) {
          console.error(`${error} in POST`);
        }
      }
function* cocktailSaga() {
    yield takeLatest("FETCH_COCKTAIL", fetchCocktail)
    yield takeLatest("ADD_COCKTAIL", addCocktail)
}

export default cocktailSaga