import React  from 'react';

import './App.css';


const Matrix = (rows,cols) => {
  let arr = [];
  for(let i=0 ;i<rows; i++)
    {
    arr[i] = [];
    for(let j=0;j<cols; j++)
      arr[i][j] = -1;
    }
  return arr;
}


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      small:Matrix(30,50),
      medium:Matrix(70,50),
      large:Matrix(100,80),
      shown:"small"
    }
  }
  render() {
    return (
      <div className="App">
        <div className="wrapper">
      {this.state[this.state.shown].map( function(r,i)  {
        return(

      <div className = "row" key = {i}>
      {r.map( (e,j) => <div className="cell" key={i+""+j}></div>)}
      </div> 
              )
        } )
      }
      </div>
      </div>
    );
  }
}

export default App;
