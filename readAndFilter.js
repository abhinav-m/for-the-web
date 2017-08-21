var fs = require("fs");




function readAndFilter(path,ext,cb){
    
    fs.readdir(path,filterandreturn)
    
   function filterandreturn (err,data) {
      var filtered = [];
        if(err)
        return cb(err)
        
       filtered =   data.filter(function(elem){
            return(elem.indexOf("."+ext)>-1);
        });
        
        
    return cb(err,filtered);
        
    }
    
     
    
}


module.exports = readAndFilter;
