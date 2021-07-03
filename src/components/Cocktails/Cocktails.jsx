import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Ingredients from "../Ingredients/Ingredients";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";


const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

// get ingredients into search field push
function Cocktails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const {id} = useParams();
  const classes = useStyles();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const ingredient = useSelector((store) => store.ingredientReducer.ingredient);
  const editIngredient = useSelector((store) => store.edit);
  const cocktail = useSelector((store) => store.cocktailReducer.Cocktail);
  const [myIngredients, setMyIngredients] = useState([]);
  const [newCocktail, setNewCocktail] = useState({
    name: "",
    ingredients: "",
    description: "",
    glassware: "",
    instruction: "",
  });

  useEffect(() => {
    dispatch({ type: "FETCH_INGREDIENT", payload: id });
  }, []);

  const handleIngredients = () => {
    setMyIngredients( [...myIngredients, event.target.value ]);
    console.log(myIngredients);
  };
  //array for our
  const nameArray = ingredient.map((item) => {
    return { name: item.name };
  });
  console.log(nameArray);
  return (
    <div style={{ width: 300 }}>
      <Autocomplete
        multiple
        id="ingredient-tags"
        options={nameArray}
        // options={ingredients}
        disableCloseOnSelect
        getOptionLabel={(option) => option.name}
        getOptionSelected={(option, value) => option.name === value.name }
        onChange={(event, myIngredients) => {
            setMyIngredients(...myIngredients, event.target.value);
            console.log(myIngredients);
        }}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
              //onClick = {handleIngredients}
             
            />
            {option.name}
          </React.Fragment>
        )}
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Ingredients"
            margin="normal"
            variant="outlined"
             
          />
        )}
      />
    </div>
  );
}

export default Cocktails;
