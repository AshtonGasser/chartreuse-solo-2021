import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Ingredients from "../Ingredients/Ingredients";


function Cocktails() {
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const ingredient = useSelector((store) => store.ingredientReducer.ingredient);
    const editIngredient = useSelector((store) => store.edit);
    const cocktail = useSelector((store) => store. cocktailReducer.Cocktail)
    const [newCocktail, setNewCocktail] = useState ({
        name: "",
        ingredients: "",
        description:  "",
        glassware: "", 
        instruction: "",
        


    })
    useEffect(() => {
        dispatch({ type: "FETCH_INGREDIENT" }),
        dispatch ({type: "FETCH_COCKTAIL" });
      }, []);    

}




export default Cocktails