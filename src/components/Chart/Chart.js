import React from 'react';
import ChartItem from './ChartItem'

const Chart = ({ position, handRange, setHandRange }) => {
  const cardArray = [ 'A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2',]

  return (
    <div>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {cardArray && cardArray.map((card1, index1) => (
        <div>
          {cardArray && cardArray.map((card2, index2) => (
            <div style={{ padding: '3px' }}>
              <ChartItem
                index1={index1} 
                card1={card1} 
                index2={index2} 
                card2={card2}
                position={position}
                handRange={handRange}
                setHandRange={setHandRange}
              / >
            </div>
          ))}
        </div>
      ))}
    </div>
    </div>
  )
}

export default Chart;