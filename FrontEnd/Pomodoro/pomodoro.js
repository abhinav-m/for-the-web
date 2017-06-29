$(document).ready(function(){
var timerFunc;
var shortBreak;
var longBreak;
var cycleNumber;
var workTime;
var hexDisplay;

});

function setDefault()
{
 
 setWorkTime(25);
 setBreak(5);
 cycleNumber = 0;
 hexDisplay = document.getElementById("display");

  

 
}

function setBreak(time) {
 shortBreak = time;
 longBreak = shortBreak * 2;
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