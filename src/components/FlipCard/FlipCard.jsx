import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import BackCard from './BackCard';
import FrontCard from './FrontCard';
import { shadows } from '@material-ui/system';

const FlipCard = ({ cocktail, height, width }) => {
    const [isFlipped, setIsFlipped] = useState(false);
  
    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <ReactCardFlip isFlipped={isFlipped} containerStyle={{ height: 400, width: 300 }}>
            <FrontCard cocktail={cocktail} flip={() => handleClick()} />
            <BackCard  cocktail={cocktail} flip={() => handleClick()} />
        </ReactCardFlip>
    );
};

export default FlipCard;
