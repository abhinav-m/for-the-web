$(document).ready(function (){
var curExp;
var curOperand;
var isDecimal;
var displayScreen;
setOnClick();
setDefault();

}	);

function setDefault()
{ 
	curOperand = "";
	curExp  = "";
	isDecimal = fakse;
    displayScreen = document.getElementById("display");
	displayScreen.innerHTML = "";
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
  if(keyPressed==".")
	

 if(curOperand=="")
 {
  if(keyPressed==".")
   curOperand="0.";
  else
   curOperand=keyPressed;
 }
 else
 {
  if(!isDecimal&&keyPressed == ".")
  {
  curExp+=keyPressed;
  isDecimal = true;
  }
  else
  {
  	
  }

displayScreen.innerHTML = curExp;
}

function operatorPressed(keyPressed)
{

 if(isOperator(curExp.charAt(curExp.length-1))
 {
 	if(keyPressed=="+/-")
 	{
 	 if(isNegative==-1)
 	 curExp+="("+"-";
 	 isNegative=isNegative*-1;

 	}
 	else
 	{
 	 curExp = curExp.slice(0,-1);
 	 curExp+=keyPressed;
 	}
 	}

 }
 else
 curExp+=keyPressed;

}


function computeCurrentStack()
{
 var operator  = curOperator;

 switch(operator)
 {
 	case "+":
 	operationStack[0] = operationStack[0] + operationStack[1];
 	break;
 	case "/":
 	operationStack[0] = operationStack[0] / operationStack[1];
 	break;
 	case "X":
 	operationStack[0] = operationStack[0] * operationStack[1];
 	break;
 	case "-":
 	operationStack[0] = operationStack[0] - operationStack[1];
 	break;
 }
displayScreen.innerHTML =""+ operationStack[0];

//Pop the last element of the stack to make space for further elements.
 operationStack.pop();

}


 
