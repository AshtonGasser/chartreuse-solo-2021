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
import DeleteIcon from "@material-ui/icons/Delete";
import Swal, {
  SweetAlertIcon,
  SweetAlertOptions,
  SweetAlertResult,
} from "sweetalert2";

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
  const ingredient = useSelector((store) => store.ingredientReducer.ingredient);
  const editIngredient = useSelector((store) => store.edit);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [newIngredient, setNewIngredient] = useState({
    name: "",
    ingredient_type: "",
    quality: "",
    description: "",
  });

  useEffect(() => {
    dispatch({ type: "FETCH_INGREDIENT" });
  }, []);
  // items persist on refresh

  //handle functions⬇
  const handleClick = (event) => {
    event.preventDefault();
    // checking to see what is logged⬇
    console.log("clicked add ingredient", newIngredient);
    // dispatch the new ingredient to redux⬇
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
    console.log("clicked delete");
    Swal.fire({
      icon: "warning",
      title: "Warning",
      text: "Are you sure you want to delete?",
      showCloseButton: true,
      showCancelButton: true,
      footer: '<a href="">Why do I have this issue?</a>',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "DELETE_INGREDIENTS",
          payload: { ids: selectedIngredients },
        });
        Swal.fire("ingredients Deleted!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    
  };

  const handleEditClick = async ({ id, field, props }, event) => {
    dispatch({
      type: "EDIT_INGREDIENT",
      payload: {
        id: id,
        field: field,
        value: props.value,
      },
    });
  };

  // data grid table

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 180, editable: true },
    { field: "ingredient_type", headerName: "type", width: 150, value: "text" },
    { field: "quality", headerName: "Quality", width: 150, value: "text" },
    {
      field: "description",
      headerName: "Description",
      // type: "character varying(500)",
      editable: true,
      width: 220,
    },

    { field: "created", headerName: "Date Created", type: "date", width: 180 },
  ];

  //end of data grid setup
  console.log("in selectedIngredients", selectedIngredients);
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
            <option value="wine">Wine</option>
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>
      </div>
      <div>
        <FormControl>
          <InputLabel htmlFor="ingredient_type-native-required">
            Quality
          </InputLabel>
          <Select
            native
            value={ingredient.quality}
            onChange={(event) =>
              handleTextFields("quality", event.target.value)
            }
            name="Quality"
          >
            <option aria-label="None" value="" />
            <option value="acid">Acid</option>
            <option value="amaro">Amaro</option>
            <option value="amaro-apéritif">amaro-apéritif</option>
            <option value="amaro-digestif">amaro-digestif</option>
            <option value="aromatic">Aromatic</option>
            <option value="beer">Beer</option>
            <option value="bitters">Bitters</option>
            <option value="bubbles">Bubbles</option>
            <option value="brandy">Brandy</option>
            <option value="decorative">Decorative</option>
            <option value="edible">Edible</option>
            <option value="fortified-wine">Fortified Wine</option>
            <option value="gin">gin</option>
            <option value="ice">Ice</option>
            <option value="Mezcal">Mezcal</option>
            <option value="powder">Powder</option>
            <option value="protein">Protein</option>
            <option value="rum">Rum</option>
            <option value="salt">Salt</option>
            <option value="spirit">Spirit</option>
            <option value="Sugar">Sugar</option>
            <option value="Tincture">Tincture</option>
            <option value="whiskey">Whiskey</option>
            <option value="wine">wine</option>
            <option value="vodka">Vodka</option>
          </Select>
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
      <Button variant="contained" color="Primary" onClick={handleClick}>
        Add Ingredient
      </Button>
      <DeleteIcon color="secondary" onClick={handleDelete} />
      <section>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <div style={{ height: 500, width: "100%" }}>
              <DataGrid
                onSelectionModelChange={(e) =>
                  setSelectedIngredients(e.selectionModel)
                }
                onEditCellChangeCommitted={handleEditClick}
                rows={ingredient}
                columns={columns}
                checkboxSelection
              />
            </div>
            {/* <EditIcon onClick={handleEditClick} /> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default Ingredients;
