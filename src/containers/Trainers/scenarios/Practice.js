import React, { useState, useEffect } from 'react'
import { Menu, Button, Checkbox } from 'semantic-ui-react'

import Grid from '../../../components/Chart/Chart'
import PokerTable from '../../../components/PokerTable/PokerTable'
import Action from '../../../components/Action/Action'

import { defaultUTGRange, defaultUTG1Range, defaultUTG2Range, defaultLJRange, defaultHJRange, defaultCORange, defaultBRange } from './RFI/defaultRanges'
const practicePositions = [
  {
    key: 'utg',
    text: 'UTG'
  },
  {
    key: 'utg1',
    text: 'UTG+1'
  },
  {
    key: 'utg2',
    text: 'UTG+2'
  },
  {
    key: 'lj',
    text: 'Lojack'
  },
  {
    key: 'hj',
    text: 'Hijack'
  },
  {
    key: 'co',
    text: 'Cutoff'
  },
  {
    key: 'bn',
    text: 'Button'
  },
];

const Practice = ({ checkedPositions, setCheckedPositions }) => {
  const [correct, setCorrect] = useState(false)
  const [utgRange, setUtgRange] = useState([])
  const [utg1Range, setUtg1Range] = useState([])
  const [utg2Range, setUtg2Range] = useState([])
  const [ljRange, setLjRange] = useState([])
  const [hjRange, setHjRange] = useState([])
  const [coRange, setCoRange] = useState([])
  const [bRange, setBRange] = useState([])

  useEffect(() => {
    setUtgRange(JSON.parse(localStorage.getItem("UTG")) ?? defaultUTGRange)
    setUtg1Range(JSON.parse(localStorage.getItem("UTG1")) ?? defaultUTG1Range)
    setUtg2Range(JSON.parse(localStorage.getItem("UTG2")) ?? defaultUTG2Range)
    setLjRange(JSON.parse(localStorage.getItem("LJ")) ?? defaultLJRange)
    setHjRange(JSON.parse(localStorage.getItem("HJ")) ?? defaultHJRange)
    setCoRange(JSON.parse(localStorage.getItem("CO")) ?? defaultCORange)
    setBRange(JSON.parse(localStorage.getItem("B")) ?? defaultBRange)
  }, [])

  const positions = {
    'utg': {
      key: 'utg',
      text: 'UTG',
      range: utgRange,
      setRange: setUtgRange
    },
    'utg1': {
      key: 'utg1',
      text: 'UTG+1',
      range: utg1Range,
      setRange: setUtg1Range
    },
    'utg2': {
      key: 'utg2',
      text: 'UTG+2',
      range: utg2Range,
      setRange: setUtg2Range
    },
    'lj':  {
      key: 'lj',
      text: 'Lojack',
      range: ljRange,
      setRange: setLjRange
    },
    'hj': {
      key: 'hj',
      text: 'Hijack',
      range: hjRange,
      setRange: setHjRange
    },
    'co': {
      key: 'co',
      text: 'Cutoff',
      range: coRange,
      setRange: setCoRange
    },
    'bn': {
      key: 'bn',
      text: 'Button',
      range: bRange,
      setRange: setBRange
    }
  }

  const getRandomPosition = () => {
    const checkedKeys = Object.entries(checkedPositions)
      .filter(([key, value]) => value)
      .map(([key]) => key);
    
    const possiblePositions = checkedKeys.length > 0 ? checkedKeys : practicePositions.map(p => p.key);
    const randomIndex = Math.floor(Math.random() * possiblePositions.length);
    console.log(possiblePositions)
    return possiblePositions[randomIndex];
  };

  const [heroPosition, setHeroPosition] = useState('utg');

  const handleCheckboxChange = (positionKey) => {
    setCheckedPositions(prevState => ({
      ...prevState,
      [positionKey]: !prevState[positionKey] // Toggle the checked state
    }));
  };

    return (
      <div>
        <>
          {practicePositions && practicePositions.map((position, index) => (
            <Checkbox
              key={position.key}
              label={position.text}
              style={{ marginRight: '20px' }}
              checked={checkedPositions[position.key]} // Use the checked state
              onChange={() => handleCheckboxChange(position.key)} // Update the checked state on change
            />
          ))}
        </>

        <PokerTable heroPosition={heroPosition} />

        {heroPosition && (
          <Action 
            handRange={positions[heroPosition].range} 
            possibleAction={[{action: 'fold', text: 'Fold'}, {action: 'raise', text: 'Raise'}]} 
            setHeroPosition={setHeroPosition} 
            getRandomPosition={getRandomPosition} 
            correct={correct} 
            setCorrect={setCorrect}
          />
        )}

      </div>
    )
}

export default Practice;