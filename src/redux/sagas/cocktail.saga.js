import { put, takeLatest, select } from "redux-saga/effects";
import axios from "axios";

// GET ALL COCKTAILS FOR USER
function* fetchUserCocktails() {
    console.log('in fetch user cocktails');
    try{
        const cocktails = yield axios.get(`/api/cocktails/`);
        yield put({ type: "SET_USER_COCKTAILS", payload: cocktails.data })
    } catch {
        console.log("ERROR in fetchCocktail Saga");
    }
}

// COCKTAIL POST FUNCTION
function* addCurrentCocktail(action) {
  console.log('in addCurrent Cocktail');
    try {
      yield axios.post("api/cocktails", action.payload);
      yield put({ type: "FETCH_USER_COCKTAILS"});
    } catch (error) {
      console.error(`${error} in POST current cocktail`);
    }
}

function* deleteCocktail(action) {
  try {
    yield axios.delete(`api/cocktails/${action.payload.id}`);
    yield put({ type: "FETCH_USER_COCKTAILS" });
  } catch (error) {
    console.error(`${error} in POST`);
  }
}

function* cocktailSaga() {
    yield takeLatest("FETCH_USER_COCKTAILS", fetchUserCocktails);
    yield takeLatest("ADD_COCKTAIL", addCurrentCocktail);
    yield takeLatest("DELETE_COCKTAIL", deleteCocktail);
}

export default cocktailSaga