$(document).ready(function(){
var timerFunc;
var shortBreak;
var longBreak;
var cycleNumber;
var workTime;
var hexDisplay;
setDefault();

});

function setDefault()
{
 
 setWorkTime(25);
 setBreak(5);
 cycleNumber = 0;
 hexDisplay = document.getElementById("display");
 setNoInput();

  

 
}

function setBreak(time) {
 shortBreak = time;
 longBreak = shortBreak * 2;
}

function setNoInput() {
 var leftInput = document.getElementById("leftNum");
 var rightInput = document.getElementById("rightNum");
 leftInput.innerHTML = "5";
 rightInput.innerHTML = "25";
 leftInput.onkeydown = function(){return false;}
 rightInput.onkeydown = function(){return false;}
}

function setWorkTime(time) {
 workTime = time;
}

function setTimer() {
	timerFunc = setInterval(function(){
 	if(seconds/60==1)
  minutes = parseInt(minutes)+1;	
  minutes = parseInt(minutes);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = parseInt(seconds % 60, 10);

  seconds = seconds < 10 ? "0" + seconds : seconds;
  $("#timer").html(minutes+":"+seconds);
  seconds++;
   if (seconds == 300) {
           // timer = intervalInMinutes;
            endGame(false,timerFunc);
        }
   }, 1000);
}