
$(document).ready(function(){

/*Display and sort data on basis of button clicked
$(#allButton).click(showAll);
$(#onlineButton).click(showOnline);
$(#offlineButton).click(showOffline);
*/
debugger;
var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","admiralbulldog","comster404"];
var twitchURL = "https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/";

loadAllData();

function loadAllData(){


debugger;
//Loading channel information (logo, displayName,status) and stream information for each streamer in array.
channels.forEach(function(twitchStream){
  var exists = true;
  var resultArray = [];
 $.getJSON(twitchURL+'/channels/'+twitchStream+'/',function(data){
  console.log(data);
  if(twitchStream=="comster404")
    console.log(twitchStream);
  if(data.status===422)
    exists = false;
  else 
  {
    resultArray.push(data.display_name);
    resultArray.push(data.logo);
    resultArray.push(data.url);
    resultArray.push(data.status);
    
  }
  getStreamerData(twitchStream,exists,resultArray);
 

});
});
$("#offLineButton").click(function(){
   $('button').removeClass('activebutt');
    $("#offLineButton").addClass('activebutt');
    $(".online").hide();
    $(".invalid").hide(); 
    $(".offline").show(); 
});

$("#availButton").click(function(){
   $('button').removeClass('activebutt');
    $("#availButton").addClass('activebutt');
     $(".offline").hide();
    $(".invalid").hide(); 
    $(".online").show(); 
});


$("#allButton").click(function(){
     $('button').removeClass('activebutt');
    $("#allButton").addClass('activebutt');
     $(".offline").show();
    $(".invalid").show(); 
    $(".online").show(); 
});
$("#allButton").addClass('activebutt');
}




 function getStreamerData(streamer,exists,resultArray)
 {
  var newListElem = document.createElement('li');
  var isStreaming = false;
  var streamersList = document.getElementById("contentList");
     if(streamer=="comster404")
    console.log(streamer);
  
  $.getJSON(twitchURL+'/streams/'+streamer+'/',function(data){
    console.log(data);
      if(streamer=="comster404")
    console.log(streamer);
    if(exists)
   {
    var displayName = resultArray[0];
    var logoUrl     = resultArray[1];
    var channelLink = resultArray[2];
    var status;
    if(data.stream)
    {
    isStreaming = true;
    game = data.stream.game;
    viewers = data.stream.viewers;
    status = resultArray[3];
    }

    //Create and load the list element here.
    //Add link to the user
    newListElem.onclick=openStreamLink;
    function openStreamLink(){
      window.open(channelLink);
    }

    if(isStreaming)
    {
    newListElem.setAttribute("class","online");
    newListElem.innerHTML='<img src="'+logoUrl+'" alt="logo" class="smallImage"</img><b>'+displayName+' </b> </br> Game: '+game+'</br> Status: '+status+' ';
    }
    else
    {
    newListElem.setAttribute("class","offline");
    newListElem.innerHTML='<img src="'+logoUrl+'" alt="logo" class="smallImage" </img>  <b>'+displayName+' </b> </br> Status: Offline';
    }
  
  }
   else
  {
    debugger;
    newListElem.innerHTML=' <img src="https://s23.postimg.org/kyqk9f0xn/sad-face-clip-art2-150x150.jpg" alt="logo" class="smallImage" </img> <b> '+streamer+'</b>  The specified user does not exist or has deleted their account. ';
    newListElem.setAttribute("class","invalid");
  }
  });  
   streamersList.appendChild(newListElem); 
}





});



