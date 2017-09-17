import React, { Component } from 'react';
import './App.css';

const MATRIX = (rows, cols) => {
    let arr = [];
    for (let i = 0; i < rows; i++) {
        arr[i] = [];
        for (let j = 0; j < cols; j++)
            arr[i][j] = 0;
    }
    return arr;
}

const HALF_MATRIX = (matrix) => {
  let rendered = [];
  for(let i = 4;i<matrix.length;i++)
    rendered[i] = matrix[i];

  return rendered;
}



class Game extends Component {
  constructor(props) {
    super(props);
    this.level = MATRIX(10,30);
    this.rendered = HALF_MATRIX(this.level)
    this.state = {
      level: this.level,
      board: this.rendered
    }
  }
  render() {
    return (
      <div className="wrapper">
        {this.state.board.map ( (r,i) => {
          return (<div className='row'
                    key={i}
                    id={i}>
          {r.map( (v,j) => <div className = 'cell' key ={i+','+j} id ={i+','+j}> </div>)}
        </div>) } ) }
      </div>
    );
  }
}

export default Game;
