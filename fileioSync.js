var fs = require('fs');
var args = process.argv;
var bufferObject = fs.readFileSync(args[2]);

var string = bufferObject.toString();
console.log(string.split("\n").length-1);