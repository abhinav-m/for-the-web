var http = require("http");
var url = process.argv[2];
var outputString = "";

http.get(url,cbHttp).on("error",console.error);

function cbHttp(response){
     response.on("data",function(data){
       outputString +=data.toString();
    });
    
    response.on("end",function(){
        console.log(outputString.length);
        console.log(outputString);
      
    });
    
    response.on("error",console.error);
}