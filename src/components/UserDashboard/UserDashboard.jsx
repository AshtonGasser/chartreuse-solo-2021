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
import FlipCard from "../FlipCard/FlipCard";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
} from "@material-ui/core";

function UserDashboard() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedCocktail, setSelectedCocktail] = useState([]);
  const user = useSelector((store) => store.user);
  const cocktails = useSelector((store) => store.cocktailReducer);
  const classes = useStyles();
  useEffect(() => {
    dispatch({ type: "FETCH_USER_COCKTAILS" });
  }, []);
  //drink card map map through drinks and apend cards by drink name
  //card list mapping
  const handleEdit = (cocktail) => {
    console.log("clicked handle edit");
    history.push(`/cocktails/${cocktail.id}`);
  };

  const handleDelete = (cocktail) => {
    console.log('clicked delete:', cocktail);
    dispatch({
      type: "DELETE_COCKTAIL",
      payload: cocktail.id
    })
  }
  console.log(cocktails);
  return (
    <>
      <div>
        {cocktails?.map((cocktail) => {
          return (
            <Card className={classes.root} key={cocktail.id}>
              <CardHeader
                avatar={
                  <Avatar aria-label={cocktail.id} className={classes.avatar}>
                    {user.username}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={cocktail.name}
                subheader="datecreated"
              />
              <CardMedia className={classes.media} title={cocktail.name} />
              <CardContent></CardContent>
              <CardActions disableSpacing>
                <IconButton area-label="Flip Over">
                  <SwapHorizIcon />
                </IconButton>
                <IconButton aria-label="Edit">
                  <EditIcon onClick={() => handleEdit(cocktail)} />
                </IconButton>
                <IconButton aria-label="Delete">
                  <DeleteIcon onClick={() => handleDelete(cocktail)} />
                </IconButton>
              </CardActions>
            </Card>
          );
        })}
      </div>
      <div>{/* <FlipCard/> */}</div>
      <div className="container">
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
        <LogOutButton className="btn" />
      </div>
      {/* <button onClick = {handleNav}>ingredients</button> */}
      <div></div>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
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
