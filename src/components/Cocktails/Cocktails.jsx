import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./cocktail.css";
import DoughnutChart from "../DoughnutChart/DoughnutChart";
import { Autocomplete } from "@material-ui/lab";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { makeStyles, styled } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
// get ingredients into search field push
function Cocktails() {
  const history = useHistory();
  const dispatch = useDispatch();

  const classes = useStyles();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const ingredients = useSelector(
    (store) => store.ingredientReducer.ingredient
  );
  const { id } = useParams();
  const cocktails = useSelector((store) => store.cocktailReducer);
  const [myName, setMyName] = useState();
  const [myDescription, setMyDescription] = useState();
  const [myInstructions, setMyInstructions] = useState();
  const [myIngredients, setMyIngredients] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const MyButton = styled(Button)({
    boxShadow: "0 3px 5px 2px rgba(0,0,0,0.12)",
    border: 0,
    variant: "outlined",
    color: "white",
    height: 48,
    padding: "0 30px",
    background: "#666666",
  });

  //handle functions⬇

  const handleClick = (event) => {
    event.preventDefault();
    console.log("clicked submit");
    // dispatch to redux⬇
    if (isEditing) {
      Swal.fire({
        icon: "question",
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Save`,
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          dispatch({
            type: "EDIT_USER_COCKTAIL",
            payload: {
              myDescription,
              myInstructions,
              myName,
              myIngredients,
              id,
            },
          });
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else {
      Swal.fire({
        icon: "question",
        title: "ready to post?",
        text: "Are you still working on this cocktail?",
        confirmButtonText: `Post`,
        denyButtonText: `Not Yet`,
        showCloseButton: true,
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch({
            type: "ADD_COCKTAIL",
            payload: { myDescription, myInstructions, myName, myIngredients },
          });
          history.push("/user");
          Swal.fire("Cocktail Created!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
    
  };

  useEffect(() => {
    dispatch({ type: "FETCH_USER_COCKTAILS" });
    dispatch({ type: "FETCH_INGREDIENT" });
  }, []);

  //conditional to repopulate the form by cocktail id if we we are editing ⬇
  useEffect(() => {
    if (id && cocktails?.length) {
      const foundCocktail = cocktails.find((cocktail) => cocktail.id == id);
      if (foundCocktail) {
        setMyName(foundCocktail.name);
        setMyDescription(foundCocktail.description);
        setMyInstructions(foundCocktail.instructions);
        setMyIngredients(foundCocktail.ingredients ?? []);
        setIsEditing(true); // make sure to populate ingredients on cocktails in your redux store!
      } else {
        throw new Error(
          `Cocktail with id ${id} does not exist in the redux store!`
        );
      }
    }
  }, [id, cocktails]);

  return (
    <div className={classes.background}>
      <div className="text">
        <DoughnutChart name={myName} ingredients={myIngredients} />
      </div>

      <div style={{ paddingTop: 20, paddingLeft: 10 }}>
        <TextField
          id="cocktail-name"
          label="Name"
          variant="filled"
          value={myName}
          onChange={(event) => setMyName(event.target.value)}
        />
      </div>

      <div style={{ width: 300, paddingLeft: 10 }}>
        <Autocomplete
          multiple
          id="ingredient-tags"
          options={ingredients}
          disableCloseOnSelect
          getOptionLabel={(option) => option.name}
          getOptionSelected={(option, value) => option.name === value.name}
          value={myIngredients}
          onChange={(e, value) => {
            setMyIngredients(value);
            console.log("selected ingredients:", value);
          }}
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
      </div>

      <div style={{ paddingTop: 10, paddingLeft: 10 }}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Spec:
            </Typography>

            {!myIngredients?.length
              ? null
              : myIngredients.map((ingredient) => (
                  <div key={ingredient.id}>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      spacing={3}
                    >
                      <Grid item xs={6}>
                        <span className="text">{ingredient.name}</span>
                      </Grid>

                      <Grid item xs={3}>
                        <FormControl>
                          <TextField
                            type="number"
                            style={{ width: 100, paddingTop: 15 }}
                            value={ingredient.number}
                            InputProps={{
                              inputProps: {
                                min: 0.25,
                                step: "0.25",
                              },
                            }}
                            onChange={(event) => {
                              const updatedIngredients = [...myIngredients];
                              const index = updatedIngredients.findIndex(
                                (i) => i.id === ingredient.id
                              );
                              updatedIngredients[index].number =
                                event.target.value;
                              setMyIngredients(updatedIngredients);
                            }}
                          />
                          <FormHelperText>Quantity</FormHelperText>
                        </FormControl>
                      </Grid>

                      <Grid item xs={3}>
                        <FormControl>
                          <Select
                            id="demo-simple-select-autowidth"
                            value={
                              ingredient.measurement_type
                                ? ingredient.measurement_type
                                : ""
                            }
                            style={{ width: 100, paddingTop: 15 }}
                            onChange={(event) => {
                              const updatedIngredients = [...myIngredients];
                              const index = updatedIngredients.findIndex(
                                (i) => i.id === ingredient.id
                              );
                              updatedIngredients[index].measurement_type =
                                event.target.value;
                              setMyIngredients(updatedIngredients);
                            }}
                          >
                            <MenuItem value=""></MenuItem>
                            <MenuItem value="ounces">oz</MenuItem>
                            <MenuItem value="ml">ml</MenuItem>
                            <MenuItem value="dash">dash</MenuItem>
                            <MenuItem value="barspoon">barspoon</MenuItem>
                          </Select>
                          <FormHelperText>Unit</FormHelperText>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </div>
                ))}
          </CardContent>
        </Card>
      </div>

      <div style={{ paddingTop: 20, paddingLeft: 10 }}>
        <TextField
          id="cocktail-steps"
          label="Steps:"
          placeholder="Follow these steps to create this cocktail..."
          variant="filled"
          multiline
          rows="4"
          rowsMax="50"
          style={{
            width: "40ch",
          }}
          value={myInstructions}
          onChange={(event) => setMyInstructions(event.target.value)}
        />
      </div>

      <div style={{ paddingTop: 20, paddingLeft: 10 }}>
        <TextField
          id="cocktail-description"
          label="Description"
          placeholder="Describe this drink, recommend brands ect"
          variant="filled"
          multiline
          rows="4"
          rowsMax="10"
          style={{
            width: "40ch",
          }}
          value={myDescription}
          onChange={(event) => setMyDescription(event.target.value)}
        />
      </div>

      <div style={{ paddingTop: 20, paddingLeft: 10 }}>
        <Button color="secondary" onClick={handleClick}>
          Save
        </Button>
      </div>
    </div>
  );
}

// material-UI styles, themes⬇

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    minWidth: 275,
    "& > * + *": {
      marginTop: theme.spacing(3),
      background: "#333333",
      flexGrow: 1,
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
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  },
}));

export default Cocktails;
