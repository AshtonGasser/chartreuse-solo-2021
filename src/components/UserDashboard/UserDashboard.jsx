import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ReactCardFlip from "react-card-flip";
import CssBaseline from "@material-ui/core/CssBaseline";
import FlipCard from "../FlipCard/FlipCard";
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
  Typography,
  Toolbar,
} from "@material-ui/core";
// on click filter all chips by ingredient .name and takes user to all cocktails displaying cocktails containing that ingredient. 
// create searchBar for cocktails. 
function UserDashboard() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM

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

  return (
    <>
      <div className="container">
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h4"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Welcome, {user.username}!
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                My Cocktails
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justifycontent="center">
                  <Grid item alignItem="center">
                    <Button variant="contained" color="primary">
                      all Cocktailsrgr
                    </Button>
                  </Grid>
                  <Grid item alignItem="center">
                    <Button
                      onClick={handleNext}
                      variant="outlined"
                      color="primary"
                    >
                      All Cocktails
                    </Button>
                  </Grid>
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
                  <Grid item key={cocktail} xs={12} sm={6} md={4}>
                    <FlipCard cocktail={cocktail} alignItems="stretch" />
                  </Grid>
                ))}
            </Grid>
          </Container>
        </main>
        <div>
          <h2>Welcome, {user.username}!</h2>
          <LogOutButton className="btn" />
        </div>
      </div>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
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
    avatar: {
      backgroundColor: "#8BCD50",
    },
  },
}));
// this allows us to use <App /> in index.js

export default UserDashboard;
