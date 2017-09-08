$(document).ready(function (){
var curExp;
var curOperand;
var isDecimal;
var isNegative;
var expressionDisplay;
var operandDisplay;
var operatorExists;
var isComputed;
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
	expressionDisplay = document.getElementById("expressionDisplay");
	operandDisplay = document.getElementById("operandDisplay");
	operatorExists = false;
	isComputed = false;
}

function clearScreen(){
  expressionDisplay.innerHTML = "";
  operandDisplay.innerHTML = "";
}

function setExpDisplay(){
 expressionDisplay.innerHTML = curExp;
}

function setOperandDisplay(){
 operandDisplay.innerHTML = curOperand;
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
	document.getElementById("x").onclick = function() {compute(this.id)};
	document.getElementById("=").onclick = function() {compute(this.id)};
	document.getElementById("CE").onclick = function() {compute(this.id)};
    //Operands
	document.getElementById("1").onclick = function() {compute(this.id)};
    document.getElementById("2").onclick = function() {compute(this.id)};
	document.getElementById("3").onclick = function() {compute(this.id)};
	document.getElementById("4").onclick = function() {compute(this.id)};
    document.getElementById("5").onclick = function() {compute(this.id)};
	document.getElementById("6").onclick = function() {compute(this.id)};
	document.getElementById("7").onclick = function() {compute(this.id)};
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
		case "x":
		case "+/-":
		operatorPressed(pressedKey);
		break;
		case "=":
		calculate();
		break;
		case "AC":
		setDefault();
		clearScreen();
		break;
		case "%":
		makePercent();
		break;
		case "CE":
		clearOperand();
		break;
		
	}
}

/* If operand is pressed, wait till operator
is pressed to get value of complete operand */

function operandPressed(keyPressed)
{
    if(isComputed)
  	setDefault();
  	
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
 setOperandDisplay();
  operatorExists = false;
}

/* If operator is pressed we get three conditions:
   >Unary +/- (Make the number negative or positive).
   >Binary Operator pressed , current operand is complete, wait for next operand's input
   >If currently there exists an operator at the end of the current expression, don't take any more operator input! */

function operatorPressed(keyPressed)
{

if(!operatorExists)
{
 if(isComputed)
 {
 	curExp = "";
 	isComputed = false;
 }
 if(keyPressed=="+/-")
 {
  
  if(!isNegative)
  {
  curOperand = "-"+curOperand;
  isNegative = true;
  }
  else{
  curOperand = curOperand.slice(1);
  isNegative = false;
  }
setOperandDisplay();
 }
 else{
 	if(isNegative)
 	curExp += "("+curOperand+")"+ keyPressed;
    else
 	curExp += curOperand + keyPressed;
    curOperand = "";
    isNegative = false;
    isDecimal = false;
    operatorExists = true;
 }
 setExpDisplay();
 setOperandDisplay();
}

}

function isOperator(val){
 return(val=="+"||val=="-"||val=="x"||val=="/"||val=="+/-");
}

function calculate()
{
  if(!isComputed)
  {
	var evalExpression;
	if(isNegative)
	curExp += "("+curOperand+")";
    else
	curExp = curExp + curOperand;
     evalExpression = curExp.replace(/x/g,"*");
	curOperand = eval(evalExpression);
	curOperand = curOperand+"";
	curExp = curExp + "="+curOperand;

	//Check if evaluated operand is negative.
	if(curOperand.charAt(0)=="-")
    isNegative = true;
    else
    isNegative = false;
	//Check if evaluated operand is a decimal.
	if(curOperand.indexOf(".")>-1)
	isDecimal = true;
    else
    isDecimal = false;

	setExpDisplay();
	setOperandDisplay();
	isComputed = true;
  }

}


function makePercent()
{
	var numberOperand;
	if(curOperand!="")
	{
      numberOperand = parseFloat(curOperand);
      numberOperand = numberOperand / 100;
      curOperand = "" + numberOperand;
      if(curOperand.indexOf(".")>-1)
      	isDecimal = true;
	}
	setOperandDisplay();	
}

function clearOperand(){
	if(isComputed)
	setDefault();
    else
    {
	curOperand = "";
	isNegative = false;
	isDecimal = false;
	}
	setOperandDisplay();
	setExpDisplay();
}




 
