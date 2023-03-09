import React from 'react';

const PlayingCard = ({ value, suit }) => {
  let cardImage;

  // Map card values to their corresponding image file names
  const cardValues = {
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    'T': 'T',
    'J': 'jack',
    'Q': 'queen',
    'K': 'king',
    'A': 'ace'
  };

  // Map card suits to their corresponding image file names
  const cardSuits = {
    'C': 'clubs',
    'D': 'diamonds',
    'H': 'hearts',
    'S': 'spades'
  };

  // Construct the card image file name
  if (value in cardValues && suit in cardSuits) {
    cardImage = `/cards/${cardValues[value]}_of_${cardSuits[suit]}.svg`;
  } else {
    cardImage = `/cards/back.svg`;
  }

  return (
      <img 
        src={cardImage} 
        alt={`${value} of ${suit}`} 
        style={{ display: 'inline-block', height: '140px', margin: '3px' }} />
  );
};

export default PlayingCard;