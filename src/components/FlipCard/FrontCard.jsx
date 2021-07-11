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
import Typography from '@material-ui/core/Typography';
import moment from 'moment'
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal, {
  SweetAlertIcon,
  SweetAlertOptions,
  SweetAlertResult,
} from "sweetalert2";
import { ImageSearch } from "@material-ui/icons";
import { CardActionArea } from "@material-ui/core";

const FrontCard = ({ cocktail, flip, height, width }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const classes = useStyles();
  const cocktails = useSelector((store) => store.cocktailReducer);
 const created = moment(cocktail.created).format(("MMM Do YY"))
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
   
    <Card key={cocktail.id} style={{maxHeight: height, maxWidth: width, height: height, width: width }}>
      <CardActionArea>
      <CardHeader
        avatar={<Avatar aria-label={cocktail.id}></Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={cocktail.name}
        subheader= {created}
      />
      <CardMedia title={cocktail.name}

      className={classes.media}
      image={cocktail.url? cocktail.url : "images/death.jpeg"}

    /> 
      {/* <CardContent>
         {cocktail.ingredients}
      </CardContent> */}
      <CardContent> <Typography
         variant="body2" color="textSecondary" component="p">{cocktail.description}</Typography></CardContent>
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
      </CardActionArea>
    </Card>
  );
};

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
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    width: 300,
    maxWidth: 300,
    maxHeight: "100%",
    display: "flex",
    flexDirection: "column",
    // margin: 10
  },
  media: {
    height: 175,
    //paddingTop: "6.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  image: {

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

export default FrontCard;
