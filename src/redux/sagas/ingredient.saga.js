import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";


//GET INGREDIENT SAGA
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

    //POST INGREDIENT SAGA 

function* addIngredient(action) {
    try{
        yield axios.post('api/ingredients',action.payload);
        yield put({type: "FETCH_INGREDIENT"})
    }catch (error) {
        console.error(`${error} in POST`);
      }
}

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

//DELETE INGREDIENT SAGAS
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
    //END DELETE INGREDIENT SAGAS


function* ingredientSaga(){
    yield takeLatest("ADD_INGREDIENT", addIngredient)
    yield takeLatest("EDIT_INGREDIENT", editIngredient)
    yield takeLatest("FETCH_INGREDIENT", fetchIngredient)
    yield takeLatest("DELETE_INGREDIENT", deleteIngredient)
    yield takeLatest("DELETE_INGREDIENTS", deleteIngredients)
}

export default ingredientSaga