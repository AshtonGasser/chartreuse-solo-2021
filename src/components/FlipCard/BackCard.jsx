import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import { shadows } from '@material-ui/system';
import {
  Typography,
  CardActionArea
} from '@material-ui/core';
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Ingredients from "../Ingredients/Ingredients";
import Chip from '@material-ui/core/Chip';
import moment from 'moment';

const BackCard = ({ cocktail, flip, height, width }) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const cocktails = useSelector((store) => store.cocktailReducer);
  const created = moment(cocktail.created).format(("MMM Do YY"))
  const classes = useStyles();
  const [myChips, setMyChips] = useState({})
  useEffect(() => {
    dispatch({ type: "FETCH_USER_COCKTAILS" });
    dispatch({ type: "FETCH_INGREDIENT" });
  }, []);

  console.log(JSON.stringify(cocktail));

  return (
    <Card key ={cocktail.id} style={{ height: '100%', maxHeight: '100%', width: '100%', maxWidth: '100%' }}>
      <CardHeader
        title={cocktail.name}
        titleTypographyProps={{
          noWrap: true,
        }}
        subheader={created}
        avatar={<Avatar aria-label={cocktail.id}></Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        classes={{
          content: classes.headerContent
        }}
      />
      
      <CardContent classes={{ root: classes.contentRoot }}>
        {
          cocktail.ingredients.map((ingredient) => 
            <Chip 
              label={ingredient.name} 
              component="a"
              href="#chip"
              clickable 
              size='small'
              classes={{
                root: classes.chipRoot
              }}
            />
          )
        }

        <Typography
          variant="body2" 
          color="textSecondary" 
          component="p">
          {cocktail.instructions}
        </Typography>
      </CardContent>
      
      <CardActionArea>
        <CardActions disableSpacing>
            <IconButton area-label="Flip Over" onClick={flip}>
                <SwapHorizIcon />
            </IconButton>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  headerContent: {
    overflow: 'hidden'
  },
  chipRoot: {
    marginVertical: 2,
    marginHorizontal: 1
  },
  contentRoot: {
    overflow: 'auto',
    height: 264,
    maxHeight: 264,
    background:
    `linear-gradient(white 30%, rgba(255, 255, 255, 0)), 
    linear-gradient(rgba(255, 255, 255, 0), white 70%) 0 100%,
    radial-gradient(50% 0, farthest-side, rgba(0, 0, 0, .2), rgba(0, 0, 0, 0)), 
    radial-gradient(50% 100%, farthest-side, rgba(0, 0, 0, .2), rgba(0, 0, 0, 0)) 0 100%`,
    background:
    `linear-gradient(white 30%, rgba(255, 255, 255, 0)), 
    linear-gradient(rgba(255, 255, 255, 0), white 70%) 0 100%,
    radial-gradient(farthest-side at 50% 0, rgba(0, 0, 0, .2), rgba(0, 0, 0, 0)), 
    radial-gradient(farthest-side at 50% 100%, rgba(0, 0, 0, .2), rgba(0, 0, 0, 0)) 0 100%`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'transparent',
    backgroundSize: '100% 40px, 100% 40px, 100% 14px, 100% 14px',
    /* Opera doesn't support this in the shorthand */
    backgroundAttachment: 'local, local, scroll, scroll',
    borderBottom: '1px solid lightgrey'
  }
}));

export default BackCard;
