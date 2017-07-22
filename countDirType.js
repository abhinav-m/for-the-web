var fs = require("fs");
var args = process.argv;
var directoryLoc = args[2];
var fileExt = args[3];

fs.readdir(directoryLoc,filterFiles)

function filterFiles(err, data){
    
if(err)
{
    console.log("error"+err);
}
  data.filter(function(element){
      return element.indexOf("."+fileExt) > -1;
  }).forEach(function(element){
      console.log(element);
  })
}