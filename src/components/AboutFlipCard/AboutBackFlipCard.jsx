// import Avatar from "@material-ui/core/Avatar";
// import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import CardHeader from "@material-ui/core/CardHeader";
// import CardMedia from "@material-ui/core/CardMedia";
// import IconButton from "@material-ui/core/IconButton";
// import { makeStyles } from "@material-ui/core/styles";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
// import { shadows } from "@material-ui/system";
// import { Typography, CardActionArea } from "@material-ui/core";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import Ingredients from "../Ingredients/Ingredients";
// import Chip from "@material-ui/core/Chip";

// const AboutBackFlipCard = ({ cocktail, flip, height, width }) => {
//   useEffect(() => {
//     dispatch({ type: "FETCH_USER_COCKTAILS" });
//     dispatch({ type: "FETCH_INGREDIENT" });
//   }, []);

//   return (<Card
//     style={{ height: "100%", maxHeight: "100%", width: "100%", maxWidth: "100%" }}
//   >
//     <CardActionArea>
//       <CardHeader/>

//       <CardContent></CardContent>
//       <CardContent>
//         <Typography
//           variant="body1"
//           color="textSecondary"
//           component="ul"
//         ></Typography>
//       </CardContent>
//       <CardContent>
//         <Typography
//           variant="body2"
//           color="textSecondary"
//           component="p"
//         ></Typography>
//       </CardContent>
//       <CardActions disableSpacing>
//         <IconButton area-label="Flip Over" onClick={flip}>
//           <SwapHorizIcon />
//         </IconButton>
//       </CardActions>
//     </CardActionArea>
//   </Card>);
// }

// export default AboutBackFlipCard;
