$(document).ready(function() {
	var xButton;
	var oButton;
	var gameBoard;
	var sig;
	init();
	//setClickMethods();
});


function init() {
	xButton = $("#xButton");
	oButton = $("#oButton");
	sig 	= $(".signature");
	gameBoard = $("#gameBoard");
	gameBoard.hide();
	xButton.click(function(){ selectButton(this.id); });
	oButton.click(function(){ selectButton(this.id); });
	
}


function selectButton(buttonType) { 
	
	
	switch(buttonType) 
	{
		case "xButton": 
				 // setPlayer("x");
				  break;

		case "oButton":
				 // setPlayer("y");
				  break;
	}
	makeBoard();
}

function makeBoard () {

	oButton.animate({'line-height':"50px",height:"50px",width:"50px",fontSize:"0.75em",opacity:'0'},"slow");
  	oButton.hide(1000);
  	xButton.animate({'line-height':"50px",height:"50px",width:"50px",fontSize:'0.75em',opacity:'0'	},"slow");
  	xButton.hide(1000);
  	sig.hide(1000);
  	gameBoard.show(2500);
  	

}