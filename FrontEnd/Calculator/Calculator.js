$(document).ready(function (){
var result;
var curOperator;
var curOperand;
var displayScreen;
setDefault();

}	);

function setDefault()
{
	curOperator = "0";
	curOperand  = "";
	result = 0;
    displayScreen = document.getElementById("display");
	displayScreen.innerHTML = ""+result;
}