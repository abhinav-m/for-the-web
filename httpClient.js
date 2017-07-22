var http = require("http");
var url = process.argv[2];
http.get(url,cb).on('error',console.error("error"));

function cb(response){
    //response.setEncoding("utf-8");
    response.on("data",function(data){
        console.log(data.toString());
    });
    response.on("error",console.error);
}
