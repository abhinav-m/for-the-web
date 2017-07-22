var http = require("http");
var url = require("url");
var port = process.argv[2];

var httpServer = http.createServer(httpServerListener);

function httpServerListener(request, response){
    if(request.method==="GET"){
        var urlObj = url.parse(request.url,true);
        var queryIso = urlObj.query.iso;
        var result;
        
        if(urlObj.pathname=="/api/parsetime")
        {
           result =  getTimeObj(queryIso);
        }
        else if(urlObj.pathname=="/api/unixtime"){
           result = getUnixTimeStamp(queryIso)
       }
       
       if(result){
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify(result));
       }
    }
}

function getUnixTimeStamp(queryString){
    return {
        unixtime:parseTime(queryString)
    }
    
}

function parseTime(queryString) {
    return Date.parse(queryString);
}
 
function getTimeObj(queryString) {
    var date = new Date(parseTime(queryString));
    
    return {
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds()
  };
}

httpServer.listen(port);