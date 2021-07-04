import React, { useEffect, useState } from "react";
import "./cocktail.css";
import DoughnutChart from "../DoughnutChart/DoughnutChart";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Ingredients from "../Ingredients/Ingredients";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles, styled } from "@material-ui/core/styles";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { ThemeProvider } from "@material-ui/core/styles/";
import { createMuiTheme } from "@material-ui/core/styles";
import { action } from "commander";
import { Card, ButtonGroup } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    minWidth: 275,
    "& > * + *": {
      marginTop: theme.spacing(3),
      background: "#333333",
      color: "white",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    GroupButtons: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  },
}));

// get ingredients into search field push
function Cocktails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const classes = useStyles();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const ingredient = useSelector((store) => store.ingredientReducer.ingredient);
  const editIngredient = useSelector((store) => store.edit);
  const cocktail = useSelector((store) => store.cocktailReducer.cocktail);
  const [myIngredients, setMyIngredients] = useState([]);
  const [newCocktail, setNewCocktail] = useState({
    name: "",
    ingredients: "",
    description: "",
    glassware: "",
    instruction: "",
  });
  const MyButton = styled(Button)({
    boxShadow: "0 3px 5px 2px rgba(0,0,0,0.12)",
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    background: "#666666",
  });
  useEffect(() => {
    dispatch({ type: "FETCH_INGREDIENT", payload: id });
  }, []);

  const handleSelectIngredientsClick = (event) => {
    event.preventDefault();
    console.log("selected ingredients:", myIngredients);

    dispatch({
      type: "SET_COCKTAIL",
      payload: myIngredients,
    });
  };
  //array for our useState to payload

  //array for our search bar
  const nameArray = ingredient.map((item) => {
    return { name: item.name };
  });

  return (
    <>
      <div className={classes.background}>
        {/* <div>
      <DoughnutChart/>
      </div> */}

        <div style={{ width: 300 }}>
          <Autocomplete
            multiple
            id="ingredient-tags"
            options={nameArray}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            getOptionSelected={(option, value) => option.name === value.name}
            onChange={(event, myIngredients) => {
              setMyIngredients(...myIngredients, event.target.value);
              console.log("selected ingredients:", myIngredients);
            }}
            // onChange={(event) => handleIngredients(...myIngredients, event.target.value)}

            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
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
          <MyButton
            color="primary"
            onClick={handleSelectIngredientsClick}
            className="myButton"
          >
            Submit
          </MyButton>
        </div>
      </div>
      {/* card to append selected ingredients to  */}
      <div>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              ingredient list to post to chart
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Submit</Button>
          </CardActions>
        </Card>
      </div>
      <div className={classes.GroupButtons}>
        <ButtonGroup
          color="secondary"
          aria-label="outlined secondary button group"
        >
          <Button>Save</Button>
          <Button>Load</Button>
          <Button>Delete</Button>
        </ButtonGroup>
      </div>
    </>
  );
}

export default Cocktails;
