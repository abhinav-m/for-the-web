$(document).ready(function() {
	//Monochromatic yellow BRIGHT ->#ffff33
	//Monochromatic green  BRIGHT ->#00ff00
	//Monochromatic red BRIGHT 	  ->#ff0000
	//Monochromatic blue BRIGHT   ->#0000ff

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
	var allCircles;
	var currentIndex;
	init();
	
});


function init() {
	currentMoves = [];
	playButton = document.getElementById("playButton");
	circles = [];
	isStrict = false;
	currentIndex = 0;
	colorsAndSounds = {
		"yellow":["colorYellow","colorBrightYellow","audio1"],
		"green":["colorGreen","colorBrightGreen","audio2"],
		"red":["colorRed","colorBrightRed","audio3"],
		"blue":["colorBlue","colorBrightBlue","audio4"]
	};
	playButton.onclick = initialiseGame;
    allCircles = document.querySelectorAll(".circle");
    allCircles.forEach(function(circle) {
    	circle.onclick = moveClicked;
    })
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
		setTimeout(function() {
		 		$(".header").text("Score:0");
		 },500);
	$(".header").css("font-size",'2.5em');
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
	//Initialise value of displayIndex for changing css and playing sound.
	displayIndex = 0;
	displayMovesInterval = setInterval(displayMoves ,1000);
}


function displayMoves() {

	
	var currentCircle = {}, currentAudio, renderCircle;
	var colorBright , colorDark;
	currentCircle =	circles[currentMoves[displayIndex]];
	currentAudio = document.getElementById(currentCircle["colorAndSound"][2]);
	colorBright =  currentCircle["colorAndSound"][1];
	colorDark = currentCircle["colorAndSound"][0];
	renderCircle = document.getElementById(currentCircle.id);
	renderCircle.classList.add(colorBright);
	setTimeout(function() {
		 	renderCircle.classList.remove(colorBright);
		 },250);
	currentAudio.play();
	displayIndex++;
	if(displayIndex==currentMoves.length-1)
	clearInterval(displayMovesInterval);
	

}


function moveClicked() {
	var divClicked = this.id;
	var circleDiv = circles[currentMoves[currentIndex]];
	var supposedToClick =  circleDiv.id;
	var soundToPlay;
	if(supposedToClick == divClicked)
	{
	console.log("Great success!");
	soundToPlay	= document.getElementById(circleDiv["colorAndSound"][2]);
	soundToPlay.play();
	currentIndex++;
	}
	
}