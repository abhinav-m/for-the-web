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
        if(i%9===0){
          if(j%10 === 0 )
          matrix[i][j-3] = 1;
        }
        else {
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

  }

  cellsPlacedVert++;
    if(cellsPlacedVert === AREA_HEIGHT) {
      cellsPlacedVert = 0;
    }
 }
 //Add Player in center of matrix(approx)
 matrix[23][16] = 6;
//Add health.
ADD_RANDOM_CHAR(matrix,2,5);
//Add enemies.
 ADD_RANDOM_CHAR(matrix,3,6);
//Add weapon.
 ADD_RANDOM_CHAR(matrix,4,1);
//Add next level entrance.
ADD_RANDOM_CHAR(matrix,5,1);
 return matrix;
}

//Adds the passed character to the matrix randomly,
//Works in three phases so things are (a little) more uniformly distributed.
//num is the number of items to be added.
const ADD_RANDOM_CHAR = (matrix,character,num) => {
  var ROW_MIN, ROW_MAX;

  const COL_MIN = 1;
  const COL_MAX = 32;
  var phase;




  for(let i = 1;i<=num;i++) {
    phase = getRandomInclusive(1,3);
    if(phase === 1) {
       ROW_MIN = 1;
       ROW_MAX = 8;
    }
    if(phase === 2) {
       ROW_MIN = 10;
       ROW_MAX = 17;
    }
    if(phase === 3) {
      ROW_MIN = 19;
      ROW_MAX = 26;
    }
    //Generate random row between ROW_MIN and ROW_MAX.
     let randomRow = getRandomInclusive(ROW_MIN,ROW_MAX);
    //Generate random column between COL_MIN and COL_MAX
     let randomCol = getRandomInclusive(COL_MIN,COL_MAX);
    while(randomCol === 11 || randomCol === 22)
     randomCol = getRandomInclusive(COL_MIN,COL_MAX);

   //Add check whether tile generated is empty.
    while(matrix[randomRow][randomCol] !== 1)
    randomRow = getRandomInclusive(ROW_MIN,ROW_MAX);
     //Add the random character
     matrix[randomRow][randomCol] = character;
  }

}

//Helper function to generate random value (inclusive) between two values.
const getRandomInclusive = (min,max) => Math.floor(Math.random() * (max - min + 1) )  + min;

//Logic for revealing neighbours adjacent to player position.
const getRevealedNeighbours = (row,col) => {
  let neighbours =[[-1, 0],
            [-1, 1],
            [0, 1],
            [1, 1],
            [1, 0],
            [1, -1],
            [0, -1],
            [-1, -1]];
    let revealed = [];
    neighbours.forEach( v => {
      if(Math.abs(v[1]) === 1) {
        revealed.push( (row+v[0]) + ',' + (col+v[1]) );
        revealed.push( (row+v[0]) + ',' + (col+v[1]*2) );
      }
      else
      revealed.push( (row+v[0]) + ',' + (col+v[1]) );

     });
    return revealed;
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.level = MAKE_DUNGEON(MATRIX(28,34));
    //Render bottom half of the matrix initially,move it as character moves.
    this.rendered = HALF_MATRIX(this.level);
    this.revealed = getRevealedNeighbours(10,16);
    this.revealed.push(10+','+16);
    this.state = {
      level: this.level,
      board: this.rendered,
      top_index: 13,
      bottom_index:27,
      player_pos_board :   [23,16],
      player_pos_rend : [10,16],
      movIndex:0,
      movClass:'lord-up-0',
      playerDIR:38,
      revealed:this.revealed,
      weapon:0,
      health:100,
      levelNum:1,
    }
    this.moveChar = this.moveChar.bind(this);
  }


//FIXTHIS: Rendered dungeon logic is correct. some correction needed here.
//Add old player pos and new player pos comparison to simulate movement on one cell?
 moveChar(e) {
   let level = this.state.level;
   let rendered = this.state.board;
   let topIndex = this.state.top_index;
   let bottomIndex = this.state.bottom_index;
   let player_row_board = this.state.player_pos_board[0];
   let player_col_board = this.state.player_pos_board[1];
   let player_row_rend = this.state.player_pos_rend[0];
   let player_col_rend = this.state.player_pos_rend[1];


   let playerDIR = this.state.playerDIR;
   let movIndex =this.state.movIndex;

   if(e.which === playerDIR) {
     if(movIndex === 3)
     movIndex = 0;
     else
     movIndex++;
   }
   else {
   movIndex = 0;
   playerDIR = e.which;
  }
   level[player_row_board ][player_col_board] = 1;
   var newRow;
   var movClass;
   /* left = 37
   up = 38
   right = 39
   down = 40 */

  switch(e.which) {

    case 38: if(topIndex !== 0) {
              if(canMove())
              bottomIndex--;
             topIndex--;
             player_row_board--;
          //   player_row_rend++;
             movClass =`lord-up-${movIndex}`;
             newRow = level[topIndex];
             rendered.pop();
             rendered.unshift(newRow);
           }
                 break;

   case 37: player_col_board--;
            movClass = `lord-left-${movIndex}`;
            player_col_rend--;
            break;
  case 39: player_col_board++;
           movClass = `lord-right-${movIndex}`;
           player_col_rend++;
           break;

   case 40: if(bottomIndex!== 27) {
     if(canMove())
   bottomIndex++;
            topIndex++;
            player_row_board++;
          //  player_row_rend--;
            movClass =`lord-down-${movIndex}`;
            newRow = level[bottomIndex];
            rendered.shift();
            rendered.push(newRow);

          }
              break;
  default: console.log('wrong key press')
  }

level[player_row_board][player_col_board] = 6;
let revealed = getRevealedNeighbours(player_row_rend,player_col_rend);
revealed.push(player_row_rend+','+player_col_rend);
  this.setState({
    board: rendered,
    top_index:topIndex,
    bottom_index:bottomIndex,
    player_pos_board:[player_row_board,player_col_board],
    player_pos_rend:[player_row_rend,player_col_rend],
    movClass:movClass,
    movIndex:movIndex,
    playerDIR:playerDIR,
    level:level,
    revealed: revealed
  });

 }

cellClass(cellType,pos) {
  //0 -> Unpassable terrain, 1 -> part of dungeon, 2 -> Health ,3 -> enemy ,4 -> weapon,5-> next level entrance,6-> Player position.
  const cells = ['cell','cell dungeon','cell dungeon health','cell dungeon enemy','cell dungeon  weapon','cell dungeon nextLevel',`cell dungeon   ${this.state.movClass}`];
  if(pos==='9,16')
  console.log('test');
  return this.state.revealed.includes(pos) ? cells[cellType] : cells[cellType] + ' hidden';
}

//Helper function to determine if character can move to cell or not.
canMove(row,col) {
return this.state.level[row][col] === 0;
}


  render() {
    return (
      <div className="wrapper" onKeyDown = {this.moveChar} tabIndex='0'>
        {this.state.board.map ( (r,i) => {
          return (<div className='row'
                    key={i}
                    id={i}>
          {r.map( (v,j) => <div className = { this.cellClass(this.state.board[i][j],i+','+j)  } key ={i+','+j} id ={i+','+j}> </div>)}
        </div>) } ) }
      </div>
    );
  }
}

export default Game;
