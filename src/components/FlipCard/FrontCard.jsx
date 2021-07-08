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
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const FrontCard = ({ cocktail, flip, height, width }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const classes = useStyles();

  const handleEdit = (cocktail) => {
    console.log("clicked handle edit");
    history.push(`/cocktails/${cocktail.id}`);
  };

  const handleDelete = (cocktail) => {
    console.log('clicked delete:', cocktail);
    dispatch({
      type: "DELETE_COCKTAIL",
      payload: cocktail
    });
  }

  return (
      
    <Card key={cocktail.id} style={{height: height, width: width}}>
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
            subheader="datecreated"
        />
        <CardMedia title={cocktail.name} />
        <CardContent>{cocktail.instructions}</CardContent>
        <CardActions disableSpacing>
            <IconButton area-label="Flip Over">
                <SwapHorizIcon onClick={flip}/>
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
}

const useStyles = makeStyles((theme) => ({

}));

export default FrontCard;
