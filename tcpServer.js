var net = require("net");
var port = process.argv[2];
var date;

var server = net.createServer(serverListener).on("err",console.error);

function serverListener(socket) {
    date = new Date();
    var formattedDate ;
    var time,month,curDate,hour,minutes;
    month = date.getMonth()+1;
    month = month<10?"0"+month:month;
    
    curDate = date.getDate()<10?"0"+date.getDate():date.getDate();
    
    hour = date.getHours()<10?"0"+date.getHours():date.getHours();
    
    minutes = date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
    
    time = hour+":"+minutes;
    
    formattedDate = date.getFullYear()+"-"+month+"-"+curDate+" "+time;
    
    socket.write(formattedDate + "\n");
    socket.end();
    
}

server.listen(port);
    
