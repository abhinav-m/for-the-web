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
	var emptyCells;
	var allCells;
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
	$("td").click(function(){ playMove(this.id);});
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
	ticTacBoard = Array.matrix(3,3,-1);
	emptyCells = ["00","01","02","10","11","12","20","21","22"];


	allCells = {
		1:[0,0],
		2:[0,1],
		3:[0,2],
		4:[1,0],
		5:[1,1],
		6:[1,2],
		7:[2,0],
		8:[2,1],
		9:[2,2]
	};


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
	checkGameEnd();
	
}




function playMove(id) {
	var col, row;
	row = id.slice("")[0];
	col = id.slice("")[1];

	if(currentTurn == 1)
	{
	$("#"+id).text("X")
	playerMoved = true;
	ticTacBoard[row][col] = 1;
	}
	else
	{
	$("#"+id).text("0");
	ticTacBoard[row][col] = 0;
	}
	$("#"+id).animate({'fontSize':'2em'},"fast");
	emptyCells.splice(emptyCells.indexOf(id),1);
	currentTurn = currentTurn * -1;
	startGame();


}


function aiMove() {
	var bestMove;
	bestMove = findBestMove();
	playMove(bestMove);
	
}

function getOptimalMoves() {
	//Check "blocks" which are done by placing in empty cells available
	//Max no. of blocks = candidate for optimal move.
	//Can be more than one.
	var numOfBlocks;


	for(var i =0;i<emptyCells.length;i++)
	{
		numOfBlocks = checkBlocks(emptyCells[i]);
	}
}

function checkBlocks(currentCell) {
	var index,row,col;
	index = currentcell.split("");
	row = parseInt(index[0]);
	col = parseInt(index[1]);


}


function isDiagnol(index) {
	return(index=="00"||index=="22"||index=="02"||index=="11"||index=="20");
}

/*Helper function for mini-max evaluation,
this is used in recursion to check the board
state to evaluate whether current state is a win or loss.
We want to maximise AI's chance of winning, a perfect 
minimax should always result in a Win/Draw.
A win  = +10 score. (Maximising player).
A win for the other player = -10 score.
*/

function evaluateBoard(ticTacBoard) {

	var score = 0;

	//Check for win conditions for row
	//and see who won in this simulation (AI/Player)
	for (var i = 0;i< 3;i++)
		if(ticTacBoard[i][0]==ticTacBoard[i][1]&&ticTacBoard[i][1]==ticTacBoard[i][2])
		{
			if(ticTacBoard[i][0]==AI)
			score = 10;
			else if(ticTacBoard[i][0]==player)
			score = -10;
		}

	//Check for win conditions for column
	//and see who won in this simulation (AI/Player)
	for (var i = 0;i< 3;i++)
		if(ticTacBoard[0][i]==ticTacBoard[1][i]&&ticTacBoard[1][i]==ticTacBoard[2][i])
			if(ticTacBoard[0][i]==AI)
			score = 10;
			else if(ticTacBoard[0][i]==player)
			score = -10;

	//Check diagnol win condition and who won (AI/Player)
	//Left diagnol OR Right diagnol win.
	if(ticTacBoard[0][0]==ticTacBoard[1][1]&&ticTacBoard[1][1]==ticTacBoard[2][2]
		||ticTacBoard[0][2]==ticTacBoard[1][1]&&ticTacBoard[2][0]==ticTacBoard[1][1])
		if(ticTacBoard[1][1]==AI)
			score = 10;
			else if(ticTacBoard[1][1]==player)
			score = -10; 


		return score;

}

/*This helper function will only be called from
  inside the recursion, NOT to be used from elsewhere
  As board is only marked on a TEMPORARY basis from 
  inside the recursive STACK.*/

function areMovesLeft() {
	for(var i =0;i<3;i++)
		for(var j =0;j<3;j++)
			if(ticTacBoard[i][j]==-1)
				return true;
	return false;
}

/*Core Minimax function which tests against the 
current move simulated, and checks for all moves 
by both player and AI. Note: AI moves are always 
considered OPTIMAL */

function miniMax(depth,isMax)	{
	var score = evaluateBoard(ticTacBoard);

	//Break condition 1 for recursion
	//Maximiser won
	if(score==10)
		return score-depth;

	//Break condition 2 for recursion
	//Minimiser won
	if(score==-10)
		return score-depth;

	//Draw condition for the board;
	if(!areMovesLeft(ticTacBoard))
		return 0;

	if(isMax)
	{
		var best = -1000; 
		for(var i = 0;i<emptyCells.length;i++)
		{
		 
		 var index = emptyCells[i].split("");
		 var removedIndex = emptyCells.splice(i,1);
		 //Mark as AI move
		 ticTacBoard[index[0]][index[1]]=AI;
		 best = Math.max(best,miniMax(depth+1,!isMax));
		 //Undo the move.
		 emptyCells.splice(i,0,removedIndex[0]);
		  ticTacBoard[index[0]][index[1]]=-1;

		}
		return best;
	}

	else
	{
		var best = 1000;

		for(var i = 0;i<emptyCells.length;i++)
		{
		 
		 var index = emptyCells[i].split("");
		 var removedIndex = emptyCells.splice(i,1);
		 //Mark as AI move
		 ticTacBoard[index[0]][index[1]]=player;
		 best = Math.min(best,miniMax(depth+1,!isMax));
		 //Undo the move.
		 emptyCells.splice(i,0,removedIndex[0]);
		 ticTacBoard[index[0]][index[1]]=-1;

		}
		return best;
	}

}

/* Find best move by simulating all 
possible empty moves, at current depth
or tree level */

function findBestMove () {
	var optValue = -1000;
	var optRow = -1;
	var optCol = -1;
	var removedIndex;

	for(var i =0;i<emptyCells.length;i++)
	{
		//Get the index of the empty position in the board.
		var index = emptyCells[i].split("");
		//Mark the empty position with AI
		ticTacBoard[index[0]][index[1]] = AI
		//Remove this from current emptyCells array, this helps in processing miniMax functiond, store it's value so it can be restored later
		removedIndex = emptyCells.splice(i,1);
		//Calculate current position's score through minimax.
		var curVal = miniMax(0,false);
		//Store it if it's the current optimal score.
		if(curVal > optValue)
		{
			optValue = curVal;
			optRow = index[0];
			optCol = index[1];
		}
		//Mark current index as empty again.
		ticTacBoard[index[0]][index[1]] = -1;
		//Add back the deleted index to it's original position.
		emptyCells.splice(i,0,removedIndex[0]);
	}
return ""+optRow+optCol;

}


function checkGameEnd() {

	if(emptyCells.length==0)
	{
	$(".header").fadeOut("slow");
  	$(".header").text("Draw").fadeIn();
	}
	else if(evaluateBoard(ticTacBoard)==10)
	{
	$(".header").fadeOut("slow");
	$(".header").text("AI Wins. FATALITY.").fadeIn();
	}
	else if(evaluateBoard(ticTacBoard)==-10)
	$(".header").text("This is actually a bug. Please report to game dev ASAP.");

}