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
import ParticleBackground from '../ParticleBackground/ParticleBackground';
import {
  Container,
  Grid,
  IconButton,
  Typography,
  Toolbar,
} from "@material-ui/core";

function AllCocktails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const cocktails = useSelector((store) => store.cocktailReducer);
  const classes = useStyles();

  useEffect(() => {
    dispatch({ type: "FETCH_USER_COCKTAILS" });
  }, []);

  return (
      <div>
      <ParticleBackground/>
    <Container className={classes.cardGrid} maxWidth="md">
      {/* End hero unit */}
      <Grid container spacing={4}>
        {cocktails?.map((cocktail) => (
          <Grid
           item
           key={cocktail.id}
           style={{ paddingBottom: 0 }} 
            xs={12} sm={6} md={4}>
            <FlipCard cocktail={cocktail} />
          </Grid>
        ))}
      </Grid>
    </Container>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: 40,
  }, 
  cardGrid: {
    paddingTop: 15,
    paddingBottom: 15,
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
export default AllCocktails;
