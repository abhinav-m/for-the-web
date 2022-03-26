import React from 'react';

import RecipeContainer from './containers/RecipeContainer';
import Signature from './components/Signature';

import './App.css';

const App = () => (
  <div className="App">
    <h1>{'Recipe Box'}</h1>
    <RecipeContainer />
    <Signature />
  </div>
);

export default App;
