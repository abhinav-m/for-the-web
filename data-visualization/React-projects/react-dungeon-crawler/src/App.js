import React, { Component } from 'react';
import './App.css';

const MATRIX = (rows, cols) => {
    let arr = [];
    for (let i = 0; i < rows; i++) {
        arr[i] = [];
        for (let j = 0; j < cols; j++)
            arr[i][j]  = 0;
    }
    return arr;
}

const HALF_MATRIX = (matrix) => {
  let rendered = [];
  for(let i = Math.floor(matrix.length/2) - 1,j=0;i<matrix.length;i++,j++)
    rendered[j] = matrix[i];

  return rendered;
}

/* The random dungeon creating algorithm
   Do not alter the code unless you are ready to lose your hairline
   and a few years of your life.
*/
const MAKE_DUNGEON = (matrix) => {
 const AREA_HEIGHT = 8;
 const AREA_WIDTH = 10;
 const NUM_AREAS = 3;
 var cellsPlacedVert = 0;

//Starting i and j from 1
//and subtracting width and height by 1
//to add some margin to playable area.
 for(let i= 1; i< matrix.length -1 ;i++) {
   var cellsPlacedHor = 0;
   for(let j =1; j < matrix[i].length -1 ;j++)
   {

          if( cellsPlacedHor === AREA_WIDTH ) {
            //Add connection to the matrix on the right ( if on the middle of area height)
            if( cellsPlacedVert === AREA_HEIGHT/2 )
            matrix[i][j] = 1;
            cellsPlacedHor = 0;
          }
          else {
            matrix[i][j] = 1;
            cellsPlacedHor++;
          }

  }

  cellsPlacedVert++;
    if(cellsPlacedVert === AREA_HEIGHT) {
      i+=1;
      cellsPlacedVert = 0;
      //Skip the next row.
    }

 }

 return matrix;
}


class Game extends Component {
  constructor(props) {
    super(props);
    this.level = MAKE_DUNGEON(MATRIX(28,34));
    //Render bottom half of the matrix initially,move it as character moves.
    this.rendered = HALF_MATRIX(this.level)
    this.state = {
      level: this.level,
      board: this.rendered,
      top_index: 13,
      bottom_index:27
    }
    this.moveChar = this.moveChar.bind(this);
  }

  /* left = 37
  up = 38
  right = 39
  down = 40 */
//FIXTHIS: Rendered dungeon logic is correct. some correction needed here.
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
