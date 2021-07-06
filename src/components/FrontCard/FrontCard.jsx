import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import ReactCardFlip from "react-card-flip";
import FlipCard from "../FlipCard/FlipCard";

function FrontCard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [myCocktails, setMyCocktails] = useState([]);
  const user = useSelector((store) => store.user);
  const cocktails = useSelector((store) => store.cocktailReducer);
  const classes = useStyles();

  useEffect(() => {
    dispatch({ type: "FETCH_USER_COCKTAILS" });
    // later when we edit a cocktail, we will also need to get the cocktail from the database here as well
  }, []);
  return (
    <>
      <div>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label={cocktails.id} className={classes.avatar}>
                {user.username}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={cocktails.name}
            subheader="datecreated"
          />
          <CardMedia className={classes.media} title={cocktails.name} />
          <CardContent>
            {cocktails.map((cocktail) => (
              <div>
                <li key={cocktail.id}>{cocktail.name}</li>
              </div>
            ))}
          </CardContent>
          <CardActions disableSpacing>
            <IconButton area-label="Flip Over">
              <SwapHorizIcon />
            </IconButton>
          </CardActions>
        </Card>
      </div>
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
export default FrontCard;
