import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
function Ingredients () {
    const history = useHistory();
    const dispatch = useDispatch();
    const ingredient = useSelector((store) => store.ingredient)

    useEffect(() => {
        dispatch({ type: "FETCH_INGREDIENT", payload: {id} })
    },[])
    const { id } = useParams()
    const handleClick = () => {
        console.log('clicked add ingredient');
        dispatch({
            type: "SET_INGREDIENT",
            payload: ingredient,
        });
    }

const handleBack = () => {
    console.log('clicked back to dash');
    history.push('/user')
}
return (
    <>
    <div>
        <div>
            <p>testing</p>
        </div>
    <section className ="ingredients">
        {ingredient.map((ingredients => {
            return (
                <div key = {ingredients.id}><ul><li>{ingredients.name}</li></ul></div>
            )
        }))}

    </section>
    </div>
    </>
)


}

export default Ingredients