$(document).ready(function() {
	//Monochromatic yellow BRIGHT ->#ffff33
	//Monochromatic green  BRIGHT ->#00ff00
	//Monochromatic red BRIGHT 	  ->#ff0000
	//Monochromatic blue BRIGHT   ->#000099

	/* https://s3.amazonaws.com/freecodecamp/simonSound1.mp3,
	   https://s3.amazonaws.com/freecodecamp/simonSound2.mp3,
	   https://s3.amazonaws.com/freecodecamp/simonSound3.mp3,
	   https://s3.amazonaws.com/freecodecamp/simonSound4.mp3.
*/
	var currentMoves;
	var playButton;
	var isStrict;
	var circles;
	var colorsAndSounds;
	var displayMovesInterval;
	var displayIndex;
	init();
	
});


function init() {
	currentMoves = [];
	playButton = document.getElementById("playButton");
	circles = [];
	isStrict = false;
	colorsAndSounds = {
		"yellow":["#e5e500","#ffff33","audio1"],
		"green":["#00b300","#00ff00","audio2"],
		"red":["#b20000","#ff0000","audio3"],
		"blue":["#000099","#0000ff","audio4"]
	};

	playButton.onclick = initialiseGame;
}
 

function initialiseGame() {
isStrict = document.getElementById("strict").checked;
//Set initial colors and sounds for various circles, 
//Bind their ids in the DOM.
var cnsKeys = Object.keys(colorsAndSounds);
for(var i =1;i<=4;i++)
{
	var newCircle = {};
	newCircle["id"] = "circle"+i;
	newCircle["colorAndSound"] = colorsAndSounds[cnsKeys[i-1]];
	circles.push(newCircle);
	
}


changeDisplay();
startGame();

}

function changeDisplay() {
	playButton.className = "fa fa-refresh hoverBlue fa-2x";
	$(".header").animate({left: '-=5200px'});
	$(".header").css("font-size",'2.5em');
	$(".header").text("Score:0");
	$(".header").animate({left: '+=5200px'});
	$("#strictAndNotif ").hide();
		
}


function startGame() {
addMove();
playGame();
}


function addMove() {
for(var i =0;i<5;i++)
{
var randomMove = Math.floor(Math.random()*4);
currentMoves.push(randomMove);
}

}

function playGame () {
	//Initialise value for changing css and playing sound.
	displayIndex = 0;
	var currentCircle = {}, currentAudio, renderCircle;
	var colorBright , colorDark;

	displayMovesInterval = setInterval(function() {
	

	currentCircle =	circles[currentMoves[displayIndex]];
	currentAudio = document.getElementById(currentCircle["colorAndSound"][2]);
	colorBright =  currentCircle["colorAndSound"][1];
	colorDark = currentCircle["colorAndSound"][0];
	renderCircle = document.getElementById(currentCircle.id);
	renderCircle.style.backgroundColor = colorBright;
	setTimeout(function() {
		 	renderCircle.style.backgroundColor = colorDark;
		 },500);
	currentAudio.play();
	displayIndex++;
	if(displayIndex==currentMoves.length-1)
	clearInterval(displayMovesInterval);
	} ,1000);
}


function displayMoves() {

		//break

}