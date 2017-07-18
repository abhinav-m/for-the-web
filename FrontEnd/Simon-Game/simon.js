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
	var noHoverClasses;

	/*Used for error audio
	The AudioContext interface represents an audio-processing graph built from audio modules linked together,
	each represented by an AudioNode. An audio context controls both the creation of the nodes
    it contains and the execution of the audio processing, or decoding.
	You need to create an AudioContext before you do anything else, as everything happens inside a context.*/
	var audioCtx;
	var errorOscill;
	var ramp;
	var vol;
	var errNode;
	init();
	
});


function init() {
	
	playButton = document.getElementById("playButton");
	isStrict = false;
	noHoverClasses = ["colorYellowNoHov","colorGreenNoHov","colorRedNoHov","colorBlueNoHov"];

	colorsAndSounds = {
		"yellow":["colorYellow","colorBrightYellow","audio1"],
		"green":["colorGreen","colorBrightGreen","audio2"],
		"red":["colorRed","colorBrightRed","audio3"],
		"blue":["colorBlue","colorBrightBlue","audio4"]
	};
	playButton.onclick = initialiseGame;
    initialiseErrorSound();
}

function initialiseErrorSound() {
	audioCtx = new AudioContext();
	errorOscill =  audioCtx.createOscillator();
	ramp = 0.05;
	vol = 0.5;
	errorOscill.type = "triangle";
	errorOscill.frequency.value = "110";
    errorOscill.start(0.0); //delay optional parameter is mandatory on Safari
    errNode = audioCtx.createGain();
    errorOscill.connect(errNode);
    errNode.gain.value = 0;
    errNode.connect(audioCtx.destination);
}


function playError() {
  errNode.gain.linearRampToValueAtTime(vol, audioCtx.currentTime + ramp);
}

function stopError() {
  errNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + ramp);
}
 

function initialiseGame() {
currentMoves = [];
currentIndex = 0;
circles = [];
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
		 		$(".header").text("Level "+currentMoves.length);
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

var randomMove = Math.floor(Math.random()*4);
currentMoves.push(randomMove);


}

function playGame () {
	//Initialise value of displayIndex for changing css and playing sound.
	lockGame();
	displayIndex = 0; ""
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
	if(displayIndex==currentMoves.length)
	{
	clearInterval(displayMovesInterval);
	$(".header").text("Level "+currentMoves.length);
	unlockGame();
	}
}

function lockGame() {
	var i= 0;
	allCircles = document.querySelectorAll(".circle");
    allCircles.forEach(function(circle) {
    	circle.onclick = "";
    	circle.classList.remove(circles[i]["colorAndSound"][0]);
    	circle.classList.add(noHoverClasses[i]);
    	i++;
    })
    
}

function unlockGame() {
	var i =0;
    allCircles = document.querySelectorAll(".circle");
    allCircles.forEach(function(circle) {
    	circle.onclick = moveClicked;
    	circle.classList.remove(noHoverClasses[i]);
    	circle.classList.add(circles[i]["colorAndSound"][0]);
    	circle.classList.remove(noHoverClasses[i]);
    	i++;
    })
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
	if(currentIndex==currentMoves.length)
	{
		//20th level win condition
		if(currentIndex == 20)
		{
		setTimeout(initialiseGame,5000);
		$(".header").text("You win! Reset in 5 seconds! ");
		shake();
		}
		else {
		addMove();
		currentIndex = 0;
		playGame();
		}
	}
	}
	else
	{
		
		shake();
		currentIndex = 0;
		playError();
		setTimeout(stopError,250);
		if(isStrict)
		setTimeout(initialiseGame,1100);
		else
		playGame();
	}
	
}

function shake () {
	$(".header").animate({left: '-=50px'},250);
	$(".header").animate({left: '+=50px'},250);
	$(".header").animate({left: '-=50px'},250);
	$(".header").animate({left: '+=50px'},250);
}

