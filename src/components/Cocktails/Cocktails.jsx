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
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

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
  // const { id } = useParams(); // for use later when we implement EDIT
  const classes = useStyles();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const ingredient = useSelector((store) => store.ingredientReducer.ingredient);
  const editIngredient = useSelector((store) => store.edit);

  const [myName, setMyName] = useState();
  const [myDescription, setMyDescription] = useState();
  const [myInstructions, setMyInstructions] = useState();
  const [myIngredients, setMyIngredients] = useState([]);

  const MyButton = styled(Button)({
    boxShadow: "0 3px 5px 2px rgba(0,0,0,0.12)",
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    background: "#666666",
  });

  useEffect(() => {
    dispatch({ type: "FETCH_INGREDIENT" });
    // later when we edit a cocktail, we will also need to get the cocktail from the database here as well
  }, []);

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
          {/*<MyButton
            color="primary"
            onClick={() => setMyIngredients("ingredients", myIngredients)}
            className="myButton"
          >
            Submit
          </MyButton>
          </div>*/}
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

              {!myIngredients?.length
                ? null
                : myIngredients.map((ingredient) => (
                    <div key={ingredient.id}>
                      <span>{ingredient.name}</span>

                      <TextField
                        type="number"
                        InputProps={{
                          inputProps: {
                            min: 1,
                            step: "0.25"
                          },
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      ></TextField>

                      <FormControl className={classes.formControl}>
                        <InputLabel id="measurement_type">Unit</InputLabel>
                        <Select
                          labelId="Measurement"
                          id="demo-simple-select-autowidth"
                          value={ingredient.measurement_type}
                          onChange={(event) => {
                            // myIngredients (state for all ingredients)
                            // ingredient (current ingredient)
                            // TODO: for this ingredient id, update the unit for only that ingredient in myIngredients onChange
                          }}
                          autoWidth
                        >
                          <option aria-label="none" value="" />
                          <option value="ounces">Oz</option>
                          <option value="ml">ml</option>
                          <option value="dash">dash</option>
                          <option value="ml">Barspoon</option>
                        </Select>
                        <FormHelperText>Measurement</FormHelperText>
                      </FormControl>
                    </div>
                  ))}
            </CardContent>
            {/*<CardActions>
            <MyButton
             color="secondary"
             size="small">
               Submit
            </MyButton>
          </CardActions>*/}
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
        <div>
          <textarea
            placeholder="Steps"
            rows="6"
            cols="50"
            onChange={(event) => setMyInstructions(event.target.value)}
          />
        </div>

        <TextField
          id="filled-basic"
          label="Description"
          variant="filled"
          multiline
          rows="4"
          rowsMax="20"
          onChange={(event) => setMyDescription(event.target.value)}
        />
      </div>
    </>
  );
}

export default Cocktails;
