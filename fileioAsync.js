var fs = require('fs');
var args = process.argv;
var bufferObject = fs.readFile(args[2],lengthCallBack);
function lengthCallBack(err,data){
    console.log(data.toString("utf-8").split("\n").length-1);
}