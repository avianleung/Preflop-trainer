import React from 'react';
import { Card } from 'semantic-ui-react'

import './Chart.css'

const ChartItem = ({ index1, card1, index2, card2, position, handRange, setHandRange }) => {
  const valueToIndexMap = {
    'A': 0, 
    'K': 1, 
    'Q': 2, 
    'J': 3, 
    'T': 4, 
    '9': 5, 
    '8': 6, 
    '7': 7, 
    '6': 8, 
    '5': 9, 
    '4': 10, 
    '3': 11, 
    '2': 12
  }

  const Identifier = (index1, index2) => {
    if (index1 < index2) {
      return 'o'
    } else if (index1 > index2) {
      return 's'
    } else {
      return ''
    }
  }

  function handleClick(hand, action) {
    if (handRange[hand]) {
      const { [hand]: action, ...newHandRange } = handRange
      localStorage.setItem(position, JSON.stringify(newHandRange))
      console.log(newHandRange)
      setHandRange(newHandRange)
    } else {
      const newHandRange = { ...handRange, [hand]: [] }
      localStorage.setItem(position, JSON.stringify(newHandRange))
      console.log(newHandRange)
      setHandRange(newHandRange)
    }
  }

  return (
    <Card onClick={() => handleClick([index1, index2], 'raise')} className='card-grid-item' style={handRange[[index1, index2]] ? {backgroundColor: '#ff6666'} : {}}>
      { valueToIndexMap[card1] < valueToIndexMap[card2] ? (
          <div>{card1}{card2}{Identifier(index1, index2)}</div>
        ) : ( 
        <div>{card2}{card1}{Identifier(index1, index2)}</div>
      )}
    </Card>
  )
}

export default ChartItem;