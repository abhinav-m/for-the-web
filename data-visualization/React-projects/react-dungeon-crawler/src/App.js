import React, { Component } from 'react';
import './App.css';


//Makes the game matrix.
const MATRIX = (rows, cols) => {
    let arr = [];
    for (let i = 0; i < rows; i++) {
        arr[i] = [];
        for (let j = 0; j < cols; j++)
            arr[i][j]  = 0;
    }
    return arr;
}

// //Makes half the matrix (for rendering)
// const HALF_MATRIX = (matrix) => {
//   let rendered = [];
//   for(let i = Math.floor(matrix.length/2) - 1,j=0;i<matrix.length;i++,j++)
//     rendered[j] = matrix[i];
//
//   return rendered;
// }

/* The random dungeon creating algorithm
   Do not alter the code unless you are ready to lose your hairline
   and a few years of your life.
*/
const MAKE_DUNGEON = (matrix) => {
  //Constants for making dungeon's playable area/cross section.
 const AREA_HEIGHT = 4;
 const AREA_WIDTH = 10;
 var cellsPlacedVert = 0;

//Starting i and j from 1
//and subtracting width and height by 1
//to add border  to playable area.
 for(let i= 1; i< matrix.length -1 ;i++) {
   var cellsPlacedHor = 0;
   for(let j =1; j < matrix[i].length -1 ;j++)
   {
        if(i%5===0){
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
 matrix[13][16] = 6;
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
  const COL_MAX = 54;
  var phase;




  for(let i = 1;i<=num;i++) {
    phase = getRandomInclusive(1,3);
    if(phase === 1) {
       ROW_MIN = 1;
       ROW_MAX = 4;
    }
    if(phase === 2) {
       ROW_MIN = 6;
       ROW_MAX = 9;
    }
    if(phase === 3) {
      ROW_MIN = 11;
      ROW_MAX = 15;
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
    this.level = MAKE_DUNGEON(MATRIX(16,56));
    //Render bottom half of the matrix initially,move it as character moves.
//    this.rendered = HALF_MATRIX(this.level);
    this.revealed = getRevealedNeighbours(13,16);
    this.revealed.push(13+','+16);
    this.state = {
      level: this.level,
      board: this.level,
      player_pos_board :   [13,16],
     player_pos_rend : [13,16],
      movIndex:0,
      movClass:'lord-up-0',
      playerDIR:38,
      revealed:this.revealed,
      weapon:0,
      health:100,
      levelNum:2
    }
    this.moveChar = this.moveChar.bind(this);

  }


//FIXTHIS: Rendered dungeon logic is correct. some correction needed here.
//Add old player pos and new player pos comparison to simulate movement on one cell?
 moveChar(e) {
   //The whole board.
   let level = this.state.level;

   //Player position in the level.
   let player_row_board = this.state.player_pos_board[0];
   let player_col_board = this.state.player_pos_board[1];

   //Movement of player direction currently.
   let playerDIR = this.state.playerDIR;
   //index for movement animation(3 steps to move.)
   let movIndex =this.state.movIndex;
 //Player can move in one direction three times, after that it has to reset
 //for animating the player movement.
 //If movement is in the current direction,
   if(e.which === playerDIR) {
     //Reset the movement if it is complete.
     if(movIndex === 3)
     movIndex = 0;
     else
     movIndex++;
   }
   //else reset the movement direction and the index to 0.
   else {
   movIndex = 0;
   playerDIR = e.which;
  }

   var movClass;
   /* left = 37
   up = 38
   right = 39
   down = 40 */
//FIX:Main movement switch, have to understand and fix.
//TOFIX: Player not moving with top edge of matrix reached,
//Maybe keep seperate track of position of player?
//TODO: correct movement while character is moving towards bottom of board.
  switch(e.which) {
    //Check if any untraversable part has been reached.
    case 38:  movClass =`lord-up-${movIndex}`;
    if( level[player_row_board-1][player_col_board] !== 0){
      level[player_row_board][player_col_board] = 1;
       player_row_board--;
       level[player_row_board][player_col_board] = 6;

      }
                 break;
   case 37:      movClass = `lord-left-${movIndex}`;
    if( level[player_row_board][player_col_board-1] !== 0){
       level[player_row_board][player_col_board] = 1;
            player_col_board--;
            movClass = `lord-left-${movIndex}`;
            level[player_row_board][player_col_board] = 6;
          }
            break;
  case 39: movClass = `lord-right-${movIndex}`;
  if( level[player_row_board][player_col_board+1] !== 0){
      level[player_row_board][player_col_board] = 1;
           player_col_board++;
           movClass = `lord-right-${movIndex}`;
           level[player_row_board][player_col_board] = 6;
         }
           break;

   case 40:movClass =`lord-down-${movIndex}`;
   if( level[player_row_board+1][player_col_board]!== 0){
     level[player_row_board][player_col_board] = 1;
            player_row_board++;
            level[player_row_board][player_col_board] = 6;
          }
              break;

  default: console.log('wrong key press')
  }
//Place player on new position.

let revealed = getRevealedNeighbours(player_row_board,player_col_board);
revealed.push(player_row_board+','+player_col_board);
  this.setState({
    board: level,
    player_pos_board:[player_row_board,player_col_board],
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
  return this.state.revealed.includes(pos) ? cells[cellType] : cells[cellType]+' hidden';
}

// TODO: Helper function to determine if character can move to cell or not.



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
