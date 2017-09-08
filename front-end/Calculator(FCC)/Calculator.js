$(document).ready(function (){
var curExp;
var curOperand;
var isDecimal;
var isNegative;
var displayScreen;
setOnClick();
setDefault();
clearScreen();

}	);

function setDefault()
{ 
	curOperand = "";
	curExp  = "";
	isDecimal = false;
	isNegative = false;  
	displayScreen = document.getElementById("display");
}

function clearScreen(){
  displayScreen.innerHTML = "";
}

function setDisplay(){
 displayScreen.innerHTML = curExp;
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
		case "+/-":
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

/* If operand is pressed, wait till operator
is pressed to get value of complete operand */

function operandPressed(keyPressed)
{
 if(curOperand=="")
 {
  if(keyPressed=="."&&isDecimal==false)
  {
   curOperand="0.";
   isDecimal = true;
  }
  else
  curOperand=keyPressed;
 }
 else
 {
  if(!isDecimal&&keyPressed == ".")
  {
  curOperand+=keyPressed;
  isDecimal = true;
  }
  else if(keyPressed!=".")
  curOperand+=keyPressed;
 }
 curExp = curOperand;
 setDisplay();
}

/* If operator is pressed we get three conditions:
   >Unary +/- (Make the number negative or positive).
   >Binary Operator pressed , current operand is complete, wait for next operand's input
   >If currently there exists an operator at the end of the current expression, don't take any more operator input! */

function operatorPressed(keyPressed)
{

if(!isOperator(curExp.charAt(curExp.length-1)))
{
 if(keyPressed=="+/-")
 {
  if(!isNegative)
  {
  curExp = "-"+curOperand;
  isNegative = true;
  }
  else{
  curOperand = curOperand.slice(1,curExp.length-1);
  isNegative = false;
  }
 }
 else{
 	if(isNegative)
 	curExp = "("+curOperand+")"+ keyPressed;
    else
 	curExp = curOperand + keyPressed;
    curOperand = "";
    isNegative = false;
    isDecimal = false;
 }
 setDisplay();
}

}

function isOperator(val){
 return(val=="+"||val=="-"||val=="X"||val=="/"||val=="+/-");
}

/*
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
*/

 
