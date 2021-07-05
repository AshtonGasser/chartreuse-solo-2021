import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./cocktail.css";
import DoughnutChart from "../DoughnutChart/DoughnutChart";
import { Autocomplete } from "@material-ui/lab";
import CheckBoxIcon from "@material-ui/icons/CheckBox"
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { makeStyles, styled } from "@material-ui/core/styles";
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
  Typography
} from "@material-ui/core";

// get ingredients into search field push
function Cocktails() {
  const history = useHistory();
  const dispatch = useDispatch();
  // const { id } = useParams(); // for use later when we implement EDIT
  const classes = useStyles();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const ingredients = useSelector((store) => store.ingredientReducer.ingredient);
  const editIngredient = useSelector((store) => store.edit);

  const [myName, setMyName] = useState('');
  const [myDescription, setMyDescription] = useState('');
  const [myInstructions, setMyInstructions] = useState('');
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

  return (
    <div className={classes.background}>
      <div>
        <DoughnutChart name={myName} ingredients={myIngredients}/>
      </div>

      <div style={{ paddingTop: 20, paddingLeft:10 }}>
        <TextField
          id="cocktail-name"
          label="Name"
          variant="filled"
          onChange={(event) => setMyName(event.target.value)}
        />
      </div>

      <div style={{ width: 300, paddingLeft:10 }}>
        <Autocomplete
          multiple
          id="ingredient-tags"
          options={ingredients}
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
      </div>

      <div style={{ paddingTop: 10, paddingLeft:10 }}>
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
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      spacing={3}
                    >

                      <Grid item xs={6}>
                        <span className ="text">
                          {ingredient.name}
                        </span>
                      </Grid>

                      <Grid item xs={3}>
                        <FormControl>
                          <TextField
                            type="number"
                            style={{ width: 100, paddingTop: 15 }}
                            InputProps={{
                              inputProps: {
                                min: 0.25,
                                step: "0.25"
                              },
                            }}
                            onChange={(event) => {
                              const updatedIngredients = [...myIngredients];
                              const index = updatedIngredients.findIndex((i) => i.id === ingredient.id);
                              updatedIngredients[index].quantity = event.target.value;
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
                            value={ingredient.measurement_type ? ingredient.measurement_type : ''}
                            style={{ width: 100, paddingTop: 15 }}
                            onChange={(event) => {
                              const updatedIngredients = [...myIngredients];
                              const index = updatedIngredients.findIndex((i) => i.id === ingredient.id);
                              updatedIngredients[index].measurement_type = event.target.value;
                              setMyIngredients(updatedIngredients);
                            }}
                          >
                            <MenuItem value="">-</MenuItem>
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

      <div style={{ paddingTop: 20, paddingLeft:10 }}>
        <TextField
          id="cocktail-steps"
          label="Steps"
          placeholder="Follow these steps to create this cocktail..."
          variant="filled"
          multiline
          rows="4"
          rowsMax="50"
          style={{
            width: '40ch',
          }}
          onChange={(event) => setMyInstructions(event.target.value)}
        />
      </div>

      <div style={{ paddingTop: 20, paddingLeft:10 }}>
        <TextField
          id="cocktail-description"
          label="Description"
          placeholder="Describe this cocktail..."
          variant="filled"
          multiline
          rows="4"
          rowsMax="10"
          style={{
            width: '40ch',
          }}
          onChange={(event) => setMyDescription(event.target.value)}
        />
      </div>

      <div style={{ paddingTop: 20, paddingLeft:10 }}>
        <ButtonGroup
          color="secondary"
          aria-label="outlined secondary button group"
        >
          <Button>Save</Button>
          <Button>Load</Button>
          <Button>Delete</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    minWidth: 275,
    "& > * + *": {
      marginTop: theme.spacing(3),
      background: "#333333",
      color: "white",
      flexGrow: 1
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
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  },
}));

export default Cocktails;
