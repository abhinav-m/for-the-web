import React, { Component } from 'react';
import './App.css';

const MATRIX = (rows, cols) => {
    let arr = [];
    for (let i = 0; i < rows; i++) {
        arr[i] = [];
        for (let j = 0; j < cols; j++)
            arr[i][j]  = Math.floor(Math.random() * 6);
    }
    return arr;
}

const HALF_MATRIX = (matrix) => {
  let rendered = [];
  for(let i = Math.floor(matrix.length/2) - 1,j=0;i<matrix.length;i++,j++)
    rendered[j] = matrix[i];

  return rendered;
}



class Game extends Component {
  constructor(props) {
    super(props);
    this.level = MATRIX(20,30);
    //Render bottom half of the matrix initially,move it as character moves.
    this.rendered = HALF_MATRIX(this.level)
    this.state = {
      level: this.level,
      board: this.rendered,
      top_index: 9,
      bottom_index:19
    }
    this.moveChar = this.moveChar.bind(this);
  }

  /* left = 37
  up = 38
  right = 39
  down = 40 */

 moveChar(e) {
   let level = this.state.level;
   let rendered = this.state.board;
   let topIndex = this.state.top_index;
   let bottomIndex = this.state.bottom_index;
   var newRow;

  switch(e.which) {
    case 38: bottomIndex--;
             topIndex--;
             newRow = level[topIndex];
             rendered.pop();
             rendered.unshift(newRow);
             break;
   case 40: bottomIndex++;
            topIndex++;
            newRow = level[bottomIndex];
            rendered.shift();
            rendered.push(newRow);
            break;

  default: console.log('wrong key press')
  }

  this.setState({
    board: rendered,
    top_index:topIndex,
    bottom_index:bottomIndex
  });
 }

cellClass(cellType) {
  //0 -> Unpassable terrain, 1 -> part of dungeon, 2 -> Health ,3 -> enemy ,4 -> weapon,5-> next level entrance.
  const cells = ['cell','cell dungeon','cell health','cell enemy','cell weapon','cell nextlevel'];
  return cells[cellType];

}


  render() {
    return (
      <div className="wrapper" onKeyDown = {this.moveChar} tabIndex='0'>
        {this.state.board.map ( (r,i) => {
          return (<div className='row'
                    key={i}
                    id={i}>
          {r.map( (v,j) => <div className = { this.cellClass(this.state.board[i][j])  } key ={i+','+j} id ={i+','+j}> </div>)}
        </div>) } ) }
      </div>
    );
  }
}

export default Game;
