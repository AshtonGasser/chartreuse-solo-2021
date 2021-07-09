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
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DoughnutChart from "../DoughnutChart/DoughnutChart";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal, {
  SweetAlertIcon,
  SweetAlertOptions,
  SweetAlertResult,
} from "sweetalert2";

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
    console.log("clicked delete:", cocktail);
    Swal.fire({
      icon: "warning",
      title: "Warning",
      text: "Are you sure you want to delete?",
      showCloseButton: true,
      showCancelButton: true,
      footer: '<a href="">Why do I have this issue?</a>',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "DELETE_COCKTAIL",
          payload: cocktail,
        });
        Swal.fire("Cocktail Deleted!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <Card key={cocktail.id} style={{ height: height, width: width}} >
      <CardHeader
        avatar={<Avatar aria-label={cocktail.id}>{user.username}</Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={cocktail.name}
        subheader="datecreated"
      />
      <CardMedia title={cocktail.name} />
      {/* <CardContent>
         {cocktail.ingredients}
      </CardContent> */}
      <CardContent>{cocktail.description}</CardContent>
      <CardActions disableSpacing>
        <IconButton area-label="Flip Over">
          <SwapHorizIcon onClick={flip} />
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
};

const useStyles = makeStyles((theme) => ({}));

export default FrontCard;
