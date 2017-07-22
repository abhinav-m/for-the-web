var http = require("http");
var httpPostServer = http.createServer(postServerListener);

function postServerListener(request,response)
{
    
    if (request.method === 'POST') {
         var body = [];
        request.on("data",function(data){
       
        body.push(data);
        });
        request.on("end",function(){
          body =   Buffer.concat(body).toString().toUpperCase();
         response.end(body);
        })
    }
 
}
 httpPostServer.listen(process.argv[2]);