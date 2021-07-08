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
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{height: height, width: width}}>
        <CardHeader
            avatar={
                <Avatar>
                    COOLGUY
                </Avatar>
            }
            action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
            }
            title={'COCKTAILLLL'}
        />
        <CardMedia title={'COCKTAILLLL'} />
        <CardContent></CardContent>
        <CardActions disableSpacing>
            <IconButton area-label="Flip Over">
                <SwapHorizIcon onClick={flip}/>
            </IconButton>
            <IconButton aria-label="Edit">
                <EditIcon onClick={() => {}} />
            </IconButton>
            <IconButton aria-label="Delete">
                <DeleteIcon onClick={() => {}} />
            </IconButton>
        </CardActions>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({

}));

export default FrontCard;
