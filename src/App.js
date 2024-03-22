import React, { useState } from 'react'

import Trainers from './containers/Trainers/Trainers'

import './App.css';

function App() {
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)

  const [checkedPositions, setCheckedPositions] = useState({
    utg: false,
    utg1: false,
    utg2: false,
    lj: false,
    hj: false,
    co: false,
    bn: false
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <div style={{ margin: '30px 0px', fontSize: '16px' }}>
          Raise First In Trainer
        </div>
        <Trainers 
          checkedPositions={checkedPositions} 
          setCheckedPositions={setCheckedPositions}
          correct={correct}
          setCorrect={setCorrect}
          incorrect={incorrect}
          setIncorrect={setIncorrect}
        />
      </div>
    </div>
  );
}

export default App;
