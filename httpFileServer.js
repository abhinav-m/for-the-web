var http = require("http");
var fs = require("fs");
var port = process.argv[2];
var httpServer = http.createServer(serverListener);

function serverListener(request,response) {
     response.writeHead(200, { 'content-type': 'text/plain' })
    fs.createReadStream(process.argv[3]).pipe(response);
}

httpServer.listen(port);