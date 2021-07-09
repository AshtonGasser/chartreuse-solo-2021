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
import Typography from '@material-ui/core/Typography';
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Ingredients from "../Ingredients/Ingredients";
import Chip from '@material-ui/core/Chip';


const BackCard = ({ cocktail, flip, height, width }) => {
    const user = useSelector((store) => store.user);
    const cocktails = useSelector((store) => store.cocktailReducer);
  const classes = useStyles();

  return (
    <Card key ={cocktail.id} className={classes.root} style={{height: height, width: width}}>
        <CardHeader
            avatar={
                <Avatar aria-label={cocktail.id}>
                    {user.username}
                </Avatar>
            }
            action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
            }
            title={cocktail.name}
            
        />
      
        <CardMedia title={cocktail.name}/>
        <CardContent>
        <Typography
         variant="body2" color="textSecondary" component="p">{cocktail.instructions}</Typography>
         </CardContent>
        <CardActions disableSpacing>
            <IconButton area-label="Flip Over">
                <SwapHorizIcon onClick={flip}/>
            </IconButton>
        </CardActions>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      maxWidth: 345,
    },
    typography:{
      color: "#FFFFF",
    fontFamily:
      'Roboto mono'
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
      CardAvatar: {
        backgroundColor: "#8BCD50",
      },
    },
  }));

export default BackCard;
