$(document).ready(function (){
var result;
var curResult;
var curOperator;
var curOperand;
var displayScreen;
var operators;
var operationsDisplay;
setOnClick();
setDefault();

}	);

function setDefault()
{
	curOperator = "";
	curOperand  = "0"
	curResult =0;
	result = 0;
    displayScreen = document.getElementById("display");
	displayScreen.innerHTML = ""+result;
}

function setOnClick()
{
	//Operators
	document.getElementById("AC").onclick = function() {compute(this.id)};
	document.getElementById("+/-").onclick = function() {compute(this.id)};
	document.getElementById("%").onclick = function() {compute(this.id)};
	document.getElementById("/").onclick = function() {compute(this.id)};
	document.getElementById("-").onclick = function() {compute(this.id)};
    document.getElementById("+").onclick = function() {compute(this.id)};
	document.getElementById(".").onclick = function() {compute(this.id)};
	document.getElementById("X").onclick = function() {compute(this.id)};
	document.getElementById("=").onclick = function() {compute(this.id)};
    //Operands
	document.getElementById("1").onclick = function() {compute(this.id)};
    document.getElementById("2").onclick = function() {compute(this.id)};
	document.getElementById("3").onclick = function() {compute(this.id)};
	document.getElementById("4").onclick = function() {compute(this.id)};
    document.getElementById("5").onclick = function() {compute(this.id)};
	document.getElementById("6").onclick = function() {compute(this.id)};
    document.getElementById("8").onclick = function() {compute(this.id)};
    document.getElementById("9").onclick = function() {compute(this.id)};
    document.getElementById("0").onclick = function() {compute(this.id)};
}

function compute(pressedKey)
{
	switch(pressedKey)
	{
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
		case "0":
		case ".":
		operandPressed(pressedKey);
		break;
		case "/":
		case "+":
		case "-":
		case "X":
		operatorPressed(pressedKey);
		break;
		
	}
}



function operandPressed(keyPressed)
{

 if(curOperand=="0")
 {
  if(keyPressed==".")
   curOperand+=".";
  else
   curOperand=keyPressed;
 }
 else
  curOperand+=keyPressed;
displayScreen.innerHTML = curOperand;
}

function operatorPressed(keyPressed)
{
  curOperand = parseFloat(curOperand);

  if(curResult == 0)
  curResult = curOperand;
  else
  {
   switch(keyPressed)
   {
   case "+":
   curResult = curResult + curOperand;
   curOperator = "+";
   break;
   case "X":
   curResult = curResult * curOperand;
   curOperator = "X";
   break;
   case "-":
   curResult = curResult - curOperand;
   curOperator = "-";
   break;
   case "/":
   curResult = curResult / curOperand;
   curOperator = "/";
   break;
   }


}
 
}