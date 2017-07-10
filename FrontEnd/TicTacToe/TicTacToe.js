$(document).ready(function() {
	var xButton;
	var oButton;
	var gameBoard;
	var sig;
	var ticTacBoard;
	var currentTurn;
	var player;
	var AI;
	var gameEnd;
	var playerMoved;
	var aiMoved;
	init();
	setClickMethods();
});

/*Helper function to initialise 
variables for selection of 'X' and 'O',
div for information display and animations,
and click functions of buttons.
It also creates an empty board */

function init() {
	xButton = $("#xButton");
	oButton = $("#oButton");
	sig 	= $(".signature");
	gameBoard = $("#gameBoard");
	gameBoard.hide();
	xButton.click(function(){ selectButton(this.id); });
	oButton.click(function(){ selectButton(this.id); });
	currentTurn = 1;
	gameEnd = false;
	playerMoved = false;
	aiMoved  = false;
	makeBoard();
}

/*Set click methods for 
  all cells in the table
  */

function setClickMethods() {
	$("td").click(function(){ renderMove(this.id);});
}

/*This method runs on click of the
user selection of 'X' or 'O' and 
sets the player as selected, AI is 
auto selected as the opposite,
It also triggers the animation after
the button click via drawBoard() */

function selectButton(buttonType) { 	
	switch(buttonType) 
	{
		case "xButton": 
				 setPlayer(1);
				  break;

		case "oButton":
				 setPlayer(0);
				  break;
	}
	drawBoard();
	startGame();
}

/*Helper function to set 
the player to X or O.
1 = X
0 = O */

function setPlayer(p) {
	player = p;
	AI = p == 1 ? 0 : 1;
}

/*Helper function to start 
game with a simple animation */

function drawBoard() {

	oButton.animate({'line-height':"50px",height:"50px",width:"50px",fontSize:"0.75em",opacity:'0'},"fast");
  	oButton.hide(1000);
  	xButton.animate({'line-height':"50px",height:"50px",width:"50px",fontSize:'0.75em',opacity:'0'	},"fast");
  	xButton.hide(1000);
  	gameBoard.show(2000);
  	
}

/*Helper function to initialise empty board
  -1 = no value inside square, square empty
   1 = X
   0 = O
   Extra columns and rows mark if a row/column is "blocked"
   to implement minimax */

function makeBoard() {

	Array.matrix = function(numRows,numCols,initial)
{
	var arr = [];
	for(var i=0;i<numRows;i++)
	{
	  var columns = [];
     for(var j=0;j<numCols;j++)
     {
     	columns[j]=initial;
     }
     arr[i] = columns;
	}

	 return arr;
}
	ticTacBoard = Array.matrix(5,4,-1);
	

}

/*
This is the main game loop,
1 represents turn for 'X'.
-1 represents turn for '0'.
Not to be confused with the values used in filling the board.
Each turn first checks who's turn is it currently, and allows the player to move,
or the AI to calculate an optimal move using MiniMax. 
Each iteration of the loop checks for game's end condition (Win/Draw/Loss).
Each iteration of the loop alternates player's move by multiplying current turn with -1,
(starts at 1 for X to go first).
*/

function startGame() {
	
	if(currentTurn==1&&AI==1||currentTurn==-1&&AI==0)
	aiMove();
	
}




function renderMove(id) {
	
	if(currentTurn == 1)
	{
	$("#"+id).text("X")
	playerMoved = true;
	}
	else
	{
	$("#"+id).text("0");
	}
	$("#"+id).animate({'fontSize':'2em'},"fast");
	currentTurn = currentTurn * -1;


}


function aiMove() {
	var emptyCells;
	emptyCells = getEmptyCells();
	
}

function getEmptyCells() {
	it

}