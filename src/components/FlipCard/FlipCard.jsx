import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import BackCard from './BackCard';
import FrontCard from './FrontCard';

const FlipCard = ({ cocktail, height, width }) => {
    const [isFlipped, setIsFlipped] = useState(false);
  
    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <section style={{ height: 300, width: 300 }}>
            <ReactCardFlip isFlipped={isFlipped}>
                <FrontCard cocktail={cocktail} flip={() => handleClick()} height={height} width={width}/>
                <BackCard flip={() => handleClick()} height={height} width={width}/>
            </ReactCardFlip>
        </section>
    );
};

export default FlipCard;
