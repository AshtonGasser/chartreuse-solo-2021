import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

//material-UI theme
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
  //material-UI dropdown style
  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

function Ingredients() {
  const history = useHistory();
  const dispatch = useDispatch();
  const ingredient = useSelector((store) => store.ingredientReducer.ingredient);
  
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    ingredient_type: "",
    value: "",
    description: "",
    user_id: null
});

  useEffect(() => {
    dispatch({ type: "FETCH_INGREDIENT", payload: { id } });
  }, []);
    const { id } = useParams();

    const handleClick = (event) => {
      event.preventDefault()
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
  // data grid table
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 180,
      editable: true,
    },

    {
      field: "ingredient_type",
      headerName: "type",
      value: "text",
      editable: true,
    },

    {
      field: "description",
      headerName: "Description",
      type: "character varying(500)",
      width: 220,
      editable: true,
    },
    {
      field: "created",
      headerName: "Date Created",
      type: "date",
      width: 180,
      editable: true,
    },
  ];
  const classes = useStyles();
  //end of data grid setup 
  return (
      <>
      <form className={classes.root} noValidate autoComplete="off">
          <TextField
           id="filled-basic"
           label="Name"
           variant="filled"
           onChange={(event) => handleTextFields("name", event.target.value)} />
           <TextField
           id="filled-basic"
           label="Type"
           variant="filled"
           onChange={(event) => handleTextFields("ingredient_type", event.target.value)} />
        <button onClick = {handleClick}>Add Ingredient</button>
     </form>
     <section>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{ height: 600, width: "100%" }}>
            <DataGrid rows={ingredient} columns={columns} />
          </div>
        </div>
      </div>
   </section>
    </>
  );
}

export default Ingredients;
