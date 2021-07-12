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
    <Card key={cocktail.id}  boxShadow={2}
    m={1}
    p={1}
    style={{ width: '8rem', height: '5rem' }}style={{ height: '100%', maxHeight: '100%', width: '100%', maxWidth: '100%' }}>
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

      <CardMedia 
        title={cocktail.name}
        className={classes.media}
        image={cocktail.url? cocktail.url : "images/death.jpeg"}
      />

      <CardContent classes={{ root: classes.contentRoot }}> 
        <Typography
          variant="body2" 
          color="textSecondary" 
          component="p"
          className={classes.description}>
          {cocktail.description}
        </Typography>
      </CardContent>
      
      <CardActionArea>
        <CardActions disableSpacing>
          <IconButton area-label="Flip Over" onClick={flip}>
            <SwapHorizIcon  />
          </IconButton>
          <IconButton aria-label="Edit" onClick={() => handleEdit(cocktail)}>
            <EditIcon  />
          </IconButton>
          <IconButton aria-label="Delete" onClick={() => handleDelete(cocktail)}>
            <DeleteIcon  />
          </IconButton>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  media: {
    height: 175,
  },
  headerContent: {
    overflow: 'hidden'
  },
  contentRoot: {
    overflow: 'auto',
    height: 89,
    maxHeight: 89,
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

export default FrontCard;
