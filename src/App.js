import React from 'react'

import Trainers from './containers/Trainers/Trainers'

import './App.css';

function App() {

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <div style={{ margin: '30px 0px', fontSize: '16px' }}>
          Preflop Trainer
        </div>
        <Trainers />
      </div>
    </div>
  );
}

export default App;
