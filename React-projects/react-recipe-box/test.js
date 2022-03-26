function sumAll(array)
{ 
var flattenedArray = [];

var flatten = function flatten(arg) {
if(!Array.isArray(arg))
{
if(typeof(arg)==='number')
flattenedArray.push(arg)
}
else {
arg.forEach(function(elem){
flatten(elem); 
});
}
};

array.forEach(flatten);
var sum = flattenedArray.reduce(function(sum,value) {
return(sum+value);},0);
console.log(sum);
}
