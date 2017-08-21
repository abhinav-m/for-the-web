var http = require("http");
var i =2;
http.get(process.argv[i],cbhttp1).on("error",console.error);
var outputReq = "";

function cbhttp1(response){
    
    response.on("data",function(data){
        outputReq+=data.toString();
    });
    
    response.on("end",function(){
        console.log(outputReq);
        outputReq = "";
        if(i<=4)
        http.get(process.argv[++i],cbhttp1).on("error",console.error);
        
    });
     response.on("error",console.error);
}

