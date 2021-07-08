import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ReactCardFlip from 'react-card-flip';
import FrontCard from '../FrontCard/FrontCard';
class FlipCard extends React.Component {
    constructor() {
      super();
        this.state = {
        isFlipped: false
      };
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick(e) {
      e.preventDefault();
      this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }
  
    render() {
      return (
        <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
          <FrontCard>
            This is the front of the card.
            <button onClick={this.handleClick}>Click to flip</button>
          </FrontCard>
  
          <Card>
            This is the back of the card.
            <button onClick={this.handleClick}>Click to flip</button>
          </Card>
        </ReactCardFlip>
      )
    }
  }
  export default FlipCard


// class FlipCard extends React.Component {
//   //wrapper of card flip npm package
//   static propTypes = {
//    cocktail: PropTypes.node, 
//   }

//   constructor(props) {
//     super(props);
//     this.state = {
//       isFlipped: false,
//     };
//     this.handleMouseEnter = this.handleMouseEnter.bind(this);
//     this.handleMouseLeave = this.handleMouseLeave.bind(this);
//   }

//   handleMouseEnter(e) {
//     e.preventDefault();
//     this.setState({
//       isFlipped: true,
//     });
//   }

//   handleMouseLeave(e) {
//     e.preventDefault();
//     this.setState({
//       isFlipped: false,
//     });
//   }

//   render() {
//     return (
//       <ReactCardFlip
//         flipSpeedFrontToBack={0.1}
//         isFlipped={this.state.isFlipped}
//         flipDirection="horizontal"
//       >
//         <div onMouseEnter={this.handleMouseEnter}>
//           This is the front of the card.
//           <DoughnutChart cocktail={this.props.cocktail} />
//         </div>
//         <div onMouseLeave={this.handleMouseLeave}>
//           <h1>{this.props.cocktail.name}</h1>
//           <h2>{this.props.cocktail.description}</h2>
//           <h3>{this.props.cocktail.instructions}</h3>
//         </div>
//       </ReactCardFlip>
//     );
//   }
// }

// export default FlipCard;