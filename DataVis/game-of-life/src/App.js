import React  from 'react';

import './App.css';

//Helper function to initialize matrix.
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

//Helper function to initialise state for the main component
//when page loads. This has the value of all the live cells in 
//the board. Returns an array 
//WORKS PERFECTLY , commenting for testing.
const firstGeneration = (rows,cols) => {
  let randomRows = generateRandom(rows,rows-10);
  let randomCols = generateRandom(cols,cols-10);
  let liveCells = [];
  randomRows.forEach ( v => 
     randomCols.forEach ( k =>     liveCells.push( v+""+k ) )
    )
  return liveCells;
  }

//Helper function to generate random values , returns an array 
// with the random values.
const generateRandom = (num,length) => {
  let randomArray = [];
 while(randomArray.length < length) {
   let val =  Math.floor(Math.random() * num);
  if(randomArray.includes(val))
    continue;
  else
    randomArray.push(val)
 }
return randomArray;
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      small:Matrix(30,50), 
      medium:Matrix(70,50),
      large:Matrix(100,80),
      shown:"small",
      liveCells: ["1425","1426","1427"]
    }
  }



  render() {
    return (
      <div className="App">
        <div className="wrapper">
      {this.state[this.state.shown].map( (r,i) =>  {
        return(

      <div className = "row" key = {i} id={i}>
      {r.map( (e,j) => <div className= {this.state.liveCells.includes(i+""+j)?"cell live":"cell dead"} key={i+""+j} id={i+""+j}></div>)}
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
