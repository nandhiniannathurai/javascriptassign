var fs = require("fs");
var data = fs.readFileSync('FoodFacts.csv');
// console.log(typeof data);
var stringData=data.toString();
// console.log(typeof stringData);
var array= stringData.split("\n");
var header=array[0].split(',');
var sugarInd,saltInd,countriesInd,count=0;
var rowl = array.length;
// console.log(rowl);
var col = header.length;
// console.log(col);
sugarInd=header.indexOf('sugars_100g');   //102
// console.log(sugar);
saltInd=header.indexOf('salt_100g');         //116
// console.log(salt);
countriesInd=header.indexOf('countries');  //31
// console.log(countriesIn);



var array1=[];
var obj1={};
var i,j;
var arr=["Netherlands", "Canada", "United Kingdom", "Australia", "France", "Germany", "Spain","South Africa"]
// console.log(arr);
for (i = 1; i < rowl-1; i++) {
 // console.log(typeof [i]);
 var row = (array[i]).split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  obj1[header[countriesInd]]=row[countriesInd];
  obj1[header[sugarInd]]=row[sugarInd];
  obj1[header[saltInd]]=row[saltInd];
  for(j=0;j<arr.length;j++)
   {
    if(obj1.countries==arr[j])
    {
    array1.push(obj1);
  }
   }
  obj1={};
};


var array2=[];
var sugars_100g=0,salt_100g=0;
for(i=0;i<arr.length;i++)
saltsugar(arr[i]);

function saltsugar(country)
{
 var obj2={};
 for(var i=0;i<array1.length;i++)
 {
 if(array1[i].countries===country&&array1[i].salt_100g!=''&&array1[i].sugars_100g!='')
 {
   if(array1[i].sugars_100g!=''){
     count++;
   sugars_100g+=parseFloat(array1[i].sugars_100g);
 }
}
}
sugars_100g=sugars_100g/count;
count=0;
obj2["countries"]=country;
// obj2["indicator"]="sugars_100g";
obj2["sugar_consumption"]=sugars_100g;

// array2.push(obj2);
// obj2={};

for(var i=0;i<array1.length;i++)
{
if(array1[i].countries===country&&array1[i].salt_100g!=''&&array1[i].sugars_100g!='')
{
 if(array1[i].salt_100g!=''){
   count++;
   salt_100g+=parseFloat(array1[i].salt_100g);
}
}
}
salt_100g=salt_100g/count;
// obj2["countries"]=country;
// obj2["indicator"]="salt_100g";
obj2["salt_consumption"]=salt_100g;

array2.push(obj2);
sugars_100g=0;
salt_100g=0;
}

// var file = '1.json';
// var obj=JSON.stringify(array2);
console.log( array2);
fs.writeFileSync( '1.json', JSON.stringify(array2));
