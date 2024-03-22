import React, { useState, useEffect } from 'react';
import PlayingCard  from '../PlayingCard/PlayingCard';
import PokerTable from '../PokerTable/PokerTable';

import { Button } from 'semantic-ui-react'

const Action = ({ possibleAction, handRange, correct, setCorrect, setHeroPosition, getRandomPosition }) => {
  const indexToValueMap = {
    0: 'A',
    1: 'K',
    2: 'Q',
    3: 'J',
    4: 'T',
    5: '9',
    6: '8',
    7: '7',
    8: '6',
    9: '5',
    10: '4',
    11: '3',
    12: '2',
  }

  const indexToSuitMap = {
    0: 'S', 
    1: 'C', 
    2: 'D', 
    3: 'H'
  }

  const suitIndexArray = [0, 1, 2, 3]

  const [hand, setHand] = useState([])
  const [answered, setAnswered] = useState(false)

  const getNewHand = () => {
    const index1 = Math.floor(Math.random() * 13)
    const index2 = Math.floor(Math.random() * 13)

    if (index1 < index2 || index1 === index2) {
      const suitIndex1 = Math.floor(Math.random() * suitIndexArray.length);
      let suitIndex2 = Math.floor(Math.random() * suitIndexArray.length);
      while ( suitIndex2 === suitIndex1) {
        suitIndex2 = Math.floor(Math.random() * suitIndexArray.length);
      }

      const suit1 = indexToSuitMap[suitIndex1];
      const suit2 = indexToSuitMap[suitIndex2];

      const cards = [
        {
          index: index1,
          value: indexToValueMap[index1],
          suit: suit1
        },
        {
          index: index2,
          value: indexToValueMap[index2],
          suit: suit2
        }
      ]

      return cards

    } else {
      const suitIndex = Math.floor(Math.random() * suitIndexArray.length);
      const suit = indexToSuitMap[suitIndex];

      const cards = [
        {
          index: index1,
          value: indexToValueMap[index1],
          suit: suit
        },
        {
          index: index2,
          value: indexToValueMap[index2],
          suit: suit
        }
      ]

      return cards
    } 
  }

  const validateAction = (action) => {
    setAnswered(true)

    if (handRange[[hand[0].index, hand[1].index]] && action === 'raise') {
      setCorrect(true)
      setTimeout(() => {
        setHand(getNewHand())
        setAnswered(false)
      }, 500)
      setHeroPosition(getRandomPosition());
    } else if (!handRange[[hand[0].index, hand[1].index]] && action === 'fold') {
      setCorrect(true)
      setTimeout(() => {
        setHand(getNewHand())
        setAnswered(false)
      }, 250)
      setHeroPosition(getRandomPosition());
    } else {
      setCorrect(false)
    }
  }

  useEffect(() => {
    setHand(getNewHand())
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '50px' }}>
        {/* <div>
          <PokerTable heroPosition="bn" dealerPositionIndex={2} />
        </div> */}
      <div>
        <div style={{ marginTop: '35px' }}>
          {hand && hand.map((card, index) => (
            <>
              <PlayingCard value={card.value} suit={card.suit} />
            </>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
          {possibleAction.map((action, index) => (
            <Button onClick={() => validateAction(action.action)}>
              {action.text}
            </Button>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
          { answered && correct && (
            <div>Correct</div>
          )}
          { answered && !correct && (
            <div>Incorrect</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Action;