import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DeleteIcon from '@material-ui/icons/Delete';
//material-UI theme
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Ingredients() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const ingredient = useSelector((store) => store.ingredientReducer.ingredient);

  const [newIngredient, setNewIngredient] = useState({
    name: "",
    ingredient_type: "",
    value: "",
    description: "",
  });

  useEffect(() => {
    dispatch({ type: "FETCH_INGREDIENT",});
  }, []);
  // items persist on refresh
  

  //handles
  const handleClick = (event) => {
    event.preventDefault();
    // checking to see what is logged⬇
    console.log("clicked add ingredient", newIngredient);
    // dispatch the new movie to redux⬇
    dispatch({
      type: "ADD_INGREDIENT",
      payload: newIngredient,
    });
  };
  const handleTextFields = (key, value) => {
    setNewIngredient({ ...newIngredient, [key]: value });
  }; //end handleTextFields

  const handleBack = () => {
    console.log("clicked back to dash");
    history.push("/user");
  };
  const handleDelete = () => {
       console.log('clicked delete' )
      dispatch({type: "DELETE_INGREDIENT", payload: {id:ingredient.id}})
  }



  // data grid table
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 180,
    },

    {
      field: "ingredient_type",
      headerName: "type",
      width: 150,
      value: "text",
    },
    {
      field: "value",
      headerName: "Value",
      width: 150,
      value: "text",
    },

    {
      field: "description",
      headerName: "Description",
      type: "character varying(500)",
      width: 220,
      //editable: true,
    },
    {
      field: "created",
      headerName: "Date Created",
      type: "date",
      width: 180,
      //editable: true,
    },
    {
        field: "",
        headerName: <DeleteIcon color = "secondary"/>, 
        width:  50,

    }
  ];

  //end of data grid setup

  return (
    <>
      <div className={classes.root}>
          <TextField
            id="filled-basic"
            label="Name"
            variant="filled"
            onChange={(event) => handleTextFields("name", event.target.value)}
          />
          </div>
          <div>
        <FormControl className={classes.formControl}>
          {/* //DROP DOWN MENU COMPONENTS  */}
          <InputLabel htmlFor="ingredient_type-native-required">
            Type
          </InputLabel>
          <Select
            native
            value={ingredient.ingredient_type}
            onChange={(event) =>
              handleTextFields("ingredient_type", event.target.value)
            }
            name="type"
            inputProps={{
              id: "ingredient_type-native-required",
            }}
          >
            <option aria-label="None" value="" />
            <option value="bitters">Bitters</option>
            <option value="cordial">Cordial</option>
            <option value="garnish">Garnish</option>
            <option value="ice">Ice</option>
            <option value="mixer">Mixer</option>
            <option value="shrub">Shrub</option>
            <option value="sugar">Sugar</option>
            <option value="spirit">Spirit</option>
            <option value="texture">Texture</option>
          </Select>
          <FormHelperText>Required</FormHelperText>
          </FormControl>
          </div>
          <div>
            <FormControl>
          <InputLabel htmlFor="ingredient_type-native-required">
            Type
          </InputLabel>
          <Select
            native
            value={ingredient.value}
            onChange={(event) =>
              handleTextFields("value", event.target.value)
            }
            name="value"
            inputProps={{
              id: "value-native-required",
            }}
          >
            <option aria-label="None" value="" />
            <option value="acid">Acid</option>
            <option value="amaro-apéritif">amaro-apéritif</option>
            <option value="aromatic">Aromatic</option>
            <option value="bitters">Bitters</option>
            <option value="bubbles">Bubbles</option>
            <option value="decorative">Decorative</option>
            <option value="edible">Edible</option>
            <option value="fortified-wine">Fortified Wine</option>
            <option value="gin">gin</option>
            <option value="ice">Ice</option>
            <option value="protein">Protein</option>
            <option value="rum">Rum</option>
            <option value="salt">Salt</option>
            <option value="spirit">Spirit</option>
            <option value="Sugar">Sugar</option>
            <option value="whiskey">Whiskey</option>
            <option value="wine">wine</option>
            <option value="vodka">Vodka</option>
          </Select>
          <FormHelperText>Required</FormHelperText>
          </FormControl>
          </div>
          <div>
          <TextField
            id="filled-basic"
            label="Description"
            variant="filled"
            multiline
            onChange={(event) =>
              handleTextFields("description", event.target.value)
            }
          />
          </div>
          <button onClick={handleClick}>Add Ingredient</button>
        
      
      <section>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <div style={{ height: 600, width: "100%" }}>
              <DataGrid rows={ingredient} columns={columns} checkboxSelection />
              <DeleteIcon color = "secondary" onClick ={handleDelete}/>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Ingredients;
