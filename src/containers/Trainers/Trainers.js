import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'

import RFI from './scenarios/RFI'

const scenarioOptions = [
  {
    key: 'rfi',
    text: 'Raise First In',
    value: 'rfi',
  },
  {
    key: 'facing-rfi',
    text: 'Facing Raise First In',
    value: 'facing-rfi',
  }
]

const Trainers = () => {
  const [selectedOption, setSelectedOption] = useState('rfi');

  const handleChange = (e, { value }) => {
    console.log(value)
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
    </>
  )
}

export default Trainers
