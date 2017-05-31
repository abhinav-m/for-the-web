$(document).ready(function(){
var searchButton = document.getElementById("searchButton");
searchButton.onclick = searchForPages;

var randomButton = document.getElementById("luckyButton");
 randomButton.onclick = openRandom;

  function openRandom(){
   window.open("https://en.wikipedia.org/wiki/Special:Random");
 }
    
function searchForPages()
{
var url ="https://crossorigin.me/https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&redirects=1&exsentences=1&exlimit=max&exintro=1&explaintext=1&gsrsearch=";
var searchValue = document.getElementById("search").value;
url = url+searchValue;
url = encodeURI(url);
var pageLink = "https://en.wikipedia.org/?curid=";
 $.getJSON(url ,function(json){
 	var data = json.query.pages;
 	var unorderedList = document.getElementById("resultList");
 	$("#resultList").empty();
 	var allKeys = Object.keys(data);
 	allKeys.forEach(function (key){
 		 var pageId =data[key].pageid;
 		 var pageTitle = data[key].title;
 		 var extract =data[key].extract;
 		 var newListElement = document.createElement('li');
 		 newListElement.setAttribute("class","listBlock");
 		 newListElement.onclick=openPage;
 		 var url = pageLink+pageId;
 		 function openPage()
 		 {
 		 window.open(url);
 		}
 		 newListElement.innerHTML='<h> <b>'+pageTitle+'</b> </h> <p>'+extract+'</p>';
 		 unorderedList.appendChild(newListElement);
 	});

 	
 });
}

});