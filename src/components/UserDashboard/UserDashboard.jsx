import React, { useEffect, useState } from "react";
import ParticleBackground from '../ParticleBackground/ParticleBackground';
import { useHistory } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ReactCardFlip from "react-card-flip";
import CssBaseline from "@material-ui/core/CssBaseline";
import FlipCard from "../FlipCard/FlipCard";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { withStyles } from "@material-ui/core/styles";
import './UserDash.css'
import {
  AppBar,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
  Toolbar,
} from "@material-ui/core";
// on click filter all chips by ingredient .name and takes user to all cocktails displaying cocktails containing that ingredient.
// create searchBar for cocktails.
function UserDashboard() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const [myCocktails, setMyCocktails] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const cocktails = useSelector((store) => store.cocktailReducer);
  const classes = useStyles();
 

  useEffect(() => {
    dispatch({ type: "FETCH_USER_COCKTAILS" });
  }, []);
  const handleNext = () => {
    history.push("/allcocktails");
  };
  const handleSearchClick = () => {
    history.push("cocktails/:id");
  };
  
  return (
    <>
    <div> 
      <ParticleBackground/>
      <div className="container">
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
              className="typographyText"
                component="h1"
                variant="h5"
                align="center"
                gutterBottom
              >
                Welcome, {user.username}!
              </Typography>
              <Typography
              className = "typographyText"
                variant="h6"
                align="center"
                paragraph
              >
                My Cocktails
              </Typography>
              <Autocomplete
                className = "typographyText"
                id="size-small-outlined"
                size="small"
                label="hello"
                options={cocktails?.filter(
                  (cocktail) => cocktail.user_id === user.id
                )}
                getOptionLabel={(cocktail) => cocktail.name}
                getOptionSelected={(option, value) =>
                  option.name === value.name
                }
                value={myCocktails}
                onChange={(e, value) => {
                  setMyCocktails(value);
                  console.log("selected ingredients:", value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    color ="#DFFF00"
                    label="Search" style ={{backgroundColor: "white", outlineColor: "#DFFF00"}}
                    className = "typographyText"
                    placeholder={user.name}
                  />
                )}
              />
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justifycontent="center">
                  <Grid item alignItem="center"></Grid>
                </Grid>
              </div>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {cocktails
                ?.filter((cocktail) => cocktail.user_id === user.id)
                .map((cocktail) => (
                  <Grid item key={cocktail} className= {classes.cardGrid} xs={12} sm={6} md={4}>
                    <FlipCard cocktail={cocktail}/>
                  </Grid>
                ))}
            </Grid>
          </Container>
        </main>
        <div>
          <Button onClick={handleNext} variant="outlined" color="default">
            All Cocktails
          </Button>
        </div>
      </div>
      </div>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 345,
  },
  typography:{
    color: "#FFFFF",
  fontFamily:
    'Roboto mono'
  },
  // cardGrid: {
  //   paddingTop: spacing(8),
  //   paddingBottom: spacing(8),
  // },
  card: {
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
    CardAvatar: {
      backgroundColor: "#8BCD50",
    },
  },
}));
// this allows us to use <App /> in index.js

export default UserDashboard;
