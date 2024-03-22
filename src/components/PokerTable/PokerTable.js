import React, { useState, useEffect } from 'react';
import './PokerTable.css'; // Make sure the CSS file is in the same directory

const initialPositions = ['utg', 'utg1', 'utg2', 'lj', 'hj', 'co', 'bn', 'sb', 'bb'];
const buttonIndex = initialPositions.indexOf('bn');

const PokerTable = ({ heroPosition }) => {
  const [rotatedPositions, setRotatedPositions] = useState([...initialPositions]);

  useEffect(() => {
    // Function to rotate positions so that hero is at index 0
    const rotatePositionsForHero = (positions, heroPos) => {
      const heroIndex = positions.indexOf(heroPos);
      const positionsCopy = positions.slice(heroIndex).concat(positions.slice(0, heroIndex));
      return positionsCopy;
    };

    // Set the new rotated positions with the hero at index 0
    setRotatedPositions(rotatePositionsForHero(initialPositions, heroPosition));
  }, [heroPosition]);

  // This function will calculate the class for each player position
  const getPositionClass = (index) => {
    const heroIndex = 0;
    const positionOffset = (index - heroIndex + rotatedPositions.length) % rotatedPositions.length;
    return `player position-${positionOffset}`;
  };

  const calculatePlayerPosition = (index, totalPlayers) => {
    // Starting at the bottom center of the oval
    const angleOffset = (3/2) * Math.PI; // This offsets the angle to start at the bottom center
    
    const angle = angleOffset - ((index / totalPlayers) * 2 * Math.PI);

    let cornerYOffset = 0
    if ([1, 8].includes(index)) {
      cornerYOffset = -25
    } else if ([3, 6].includes(index)) {
      cornerYOffset = 15
    } else if (index === 0) {
      cornerYOffset = -10
    }
  
    // Assuming the border and padding are included in the dimensions
    const tableWidth = 600; // Full width of the table
    const tableHeight = 300; // Full height of the table
    const offsetX = tableWidth / 2; // Center X position
    const offsetY = tableHeight / 2 ; // Center Y position
  
    // Calculate the x and y positions based on the ellipse formula
    // You may need to adjust the formula if avatars have a significant size to prevent overflow
    const x = offsetX + (offsetX * Math.cos(angle)) - 15; // X position based on angle
    const y = offsetY + (offsetY * Math.sin(angle)) + cornerYOffset; // Y position based on angle
  
    // Adjust with `translate(-50%, -50%)` to center avatars on their points
    // Using `left` and `top` for CSS positions
    return { left: `${x}px`, bottom: `${y - 50}px` };
  };  

  // Calculate the dealer button position more accurately
  const getButtonPosition = (buttonIndex) => {
    const buttonPosition = {
      0 : {
        left: 40,
        bottom: 55,
      },
      1 : {
        left: 40,
        bottom: 40,
      },
      2 : {
        left: 60,
        bottom: -10,
      },
      3 : {
        left: 20,
        bottom: -30,
      },
      4 : {
        left: -20,
        bottom: -25,
      },
      5 : {
        left: -20,
        bottom: -25,
      },
      6 : {
        left: -35,
        bottom: 10,
      },
      7 : {
        left: -30,
        bottom: 40,
      },
      8 : {
        left: 30,
        bottom: 50,
      },
    }

    return { left: `${buttonPosition[buttonIndex].left}px`, bottom: `${buttonPosition[buttonIndex].bottom}px` };
  };

  const getBetPosition = (betIndex) => {
    const buttonPosition = {
      0 : {
        left: 40,
        bottom: 40,
      },
      1 : {
        left: 30,
        bottom: 75,
      },
      2 : {
        left: 60,
        bottom: 30,
      },
      3 : {
        left: 50,
        bottom: 0,
      },
      4 : {
        left: 7.5,
        bottom: -15,
      },
      5 : {
        left: 7.5,
        bottom: -15,
      },
      6 : {
        left: -30,
        bottom: 5,
      },
      7 : {
        left: -40,
        bottom: 30,
      },
      8 : {
        left: 10,
        bottom: 75,
      },
    }

    return { left: `${buttonPosition[betIndex].left}px`, bottom: `${buttonPosition[betIndex].bottom}px` };
  };

  return (
    <div className="poker-table">
      {rotatedPositions.map((position, index) => (
        <div key={position} className={getPositionClass(index)} style={calculatePlayerPosition(index, rotatedPositions.length)}>
          <div className="avatar" style={{ border: index === 0 && '2px solid white', width: index === 0 && '50px', height: index === 0 && '50px'}}>{position}</div>
          {index === rotatedPositions.indexOf('bn') && (
            <div
              className="dealer-button"
              style={getButtonPosition(rotatedPositions.indexOf('bn'))}
            >
              D
            </div>
          )}
          {index === rotatedPositions.indexOf('bn') + 1 && (
            <div class="white-chip-stack" style={getBetPosition(rotatedPositions.indexOf('bn') + 1)}>
              <div class="white-chip"></div>
            </div>
          )}
          {index === rotatedPositions.indexOf('bn') + 2 && (
            <div class="white-chip-stack" style={getBetPosition(rotatedPositions.indexOf('bn') + 2)}>
              <div class="white-chip"></div>
              <div class="white-chip"></div>
            </div>
          )}
          {/* <div className="player-name">{position === heroPosition ? 'Hero' : `Villain ${index + 1}`}</div> */}
        </div>
      ))}
    </div>
  );
};

export default PokerTable;
