$(document).ready(function() {
	//Monochromatic yellow BRIGHT ->#ffff33
	//Monochromatic green  BRIGHT ->#00ff00
	//Monochromatic red BRIGHT 	  ->#ff0000
	//Monochromatic blue BRIGHT   ->#000099

	var currentMoves;
	var playButton;
	var isStrict;
	var circles;
	var colorsAndSounds;
	init();
	
});


function init() {
	currentMoves = [];
	playButton = document.getElementById("playButton");
	circles = [];
	isStrict = false;
	colorsAndSounds = {
		"yellow":["#e5e500","#ffff33","yellowSound"],
		"green":["#00b300","#00ff00","greenSound"],
		"red":["#b20000","#ff0000","redSound"],
		"blue":["#000099","#0000ff","blueSound"]
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
//startGame();

}

function changeDisplay() {
	$("#strictAndNotif").css("opacity","0");
	$("#strictAndNotif").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
	$(this).css('display', 'none');
});
	$("#strictAndNotif").text("Score:");
	
}