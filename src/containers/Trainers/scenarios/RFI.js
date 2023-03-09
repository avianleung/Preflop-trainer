import React, { useState, useEffect } from 'react'
import { Menu, Button } from 'semantic-ui-react'

import Grid from '../../../components/Chart/Chart'
import Action from '../../../components/Action/Action'

const RFI = () => {
  const [practice, setPractice] = useState(false)
  const [activeItem, setActiveItem] = useState('UTG')
  const [utgRange, setUtgRange] = useState([])
  const [utg1Range, setUtg1Range] = useState([])
  const [utg2Range, setUtg2Range] = useState([])
  const [ljRange, setLjRange] = useState([])
  const [hjRange, setHjRange] = useState([])
  const [coRange, setCoRange] = useState([])
  const [bRange, setBRange] = useState([])

  useEffect(() => {
    setUtgRange(JSON.parse(localStorage.getItem("UTG")) ?? [])
    setUtg1Range(JSON.parse(localStorage.getItem("UTG1")) ?? [])
    setUtg2Range(JSON.parse(localStorage.getItem("UTG2")) ?? [])
    setLjRange(JSON.parse(localStorage.getItem("LJ")) ?? [])
    setHjRange(JSON.parse(localStorage.getItem("HJ")) ?? [])
    setCoRange(JSON.parse(localStorage.getItem("CO")) ?? [])
    setBRange(JSON.parse(localStorage.getItem("B")) ?? [])
  }, [])

  const handleItemClick = (e, { name }) => setActiveItem(name)

  const positions = [
    {
      key: 'UTG',
      text: 'UTG',
      range: utgRange,
      setRange: setUtgRange
    },
    {
      key: 'UTG1',
      text: 'UTG+1',
      range: utg1Range,
      setRange: setUtg1Range
    },
    {
      key: 'UTG2',
      text: 'UTG+2',
      range: utg2Range,
      setRange: setUtg2Range
    },
    {
      key: 'LJ',
      text: 'Lojack',
      range: ljRange,
      setRange: setLjRange
    },
    {
      key: 'HJ',
      text: 'Hijack',
      range: hjRange,
      setRange: setHjRange
    },
    {
      key: 'CO',
      text: 'Cutoff',
      range: coRange,
      setRange: setCoRange
    },
    {
      key: 'B',
      text: 'Button',
      range: bRange,
      setRange: setBRange
    }
  ]

    return (
      <div>
        <Menu pointing secondary>
          {positions && positions.map((position, index) => (
            <Menu.Item
              name={position.key}
              active={activeItem === position.key}
              onClick={handleItemClick}
            >
              {position.text}
            </Menu.Item>
          ))}
        </Menu>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <Button 
            size='tiny' 
            primary
            onClick={() => setPractice(!practice)}
          >
            {practice ? 'Modify Chart' : 'Practice'}
          </Button>
        </div>

        {!practice && positions && positions.map((position, index) => (
          <>
            {position.key === activeItem && (
              <Grid 
                position={position.key} 
                handRange={position.range} 
                setHandRange={position.setRange}
              />
            )}
          </>
        ))}

        {practice && positions && positions.map((position, index) => (
          <>
            {position.key === activeItem && (
              <Action handRange={position.range} possibleAction={[{action: 'raise', text: 'Raise'}, {action: 'fold', text: 'Fold'}]} />
            )}
          </>
        ))}

      </div>
    )
}

export default RFI;