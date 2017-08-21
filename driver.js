var readFilter = require('./readAndFilter.js');
var args = process.argv;

var dir = args[2];
var fileExt = args[3];

readFilter(dir,fileExt,printData);

function printData(err,data){
    if(err)
    console.log(err);
    
    data.forEach( function(element){
        console.log(element);
    });
}