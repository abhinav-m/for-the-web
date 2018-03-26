import React from 'react';

import DataContainer from '../containers/DataContainer';
import Signature from './Signature';
import '../App.css';

const App = () => (
  <div className="content">
    <h1> FCC LEADERBOARD</h1>
    <DataContainer />
    <Signature />
  </div>
);

export default App;
