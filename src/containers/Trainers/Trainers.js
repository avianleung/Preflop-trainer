import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'

import RFI from './scenarios/RFI'
import Practice from './scenarios/Practice'

const scenarioOptions = [
  {
    key: 'rfi',
    text: 'Charts',
    value: 'rfi',
  },
  {
    key: 'practice',
    text: 'Practice',
    value: 'practice',
  }
]

const Trainers = ({ checkedPositions, setCheckedPositions, correct, setCorrect, incorrect, setIncorrect }) => {
  const [selectedOption, setSelectedOption] = useState('rfi');

  const handleChange = (e, { value }) => {
    setSelectedOption(value);
  };

  return (
    <>
      <Dropdown
        style={{ marginBottom: '30px' }}
        placeholder='Select Scenario'
        selection
        options={scenarioOptions}
        onChange={handleChange}
        value={selectedOption}
      />
      { selectedOption === 'rfi' && (
        <div>
          <RFI />
        </div>
      )}
      { selectedOption === 'practice' && (
        <div>
          <Practice 
            checkedPositions={checkedPositions} 
            setCheckedPositions={setCheckedPositions}
            correct={correct}
            setCorrect={setCorrect}
            incorrect={incorrect}
            setIncorrect={setIncorrect}
          />
        </div>
      )}
    </>
  )
}

export default Trainers
