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
var jArray=[];
var obj1={};
var fatIndex,carbohydratesIndex,proteinsIndex,countriesIndex;
countriesIndex=header.indexOf('countries');
fatIndex=header.indexOf('fat_100g');
carbohydratesIndex=header.indexOf('carbohydrates_100g');
proteinsIndex=header.indexOf('proteins_100g');

var i,j,k,l;
var arr=["United Kingdom", "Denmark", "Sweden","Norway","France","Portugal", "Greece", "Italy", "Spain", "Croatia", "Albania"];
var arr1=["United Kingdom", "Denmark", "Sweden","Norway"];
var arr2=["France", "Belgium", "Germany", "Switzerland", "Netherlands"];
var arr3=["Portugal", "Greece", "Italy", "Spain", "Croatia", "Albania"];
for (i = 1; i < rowl-1; i++) {
   var myNewLine=(array[i]).split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

   obj1[header[countriesIndex]]=myNewLine[countriesIndex];
   obj1[header[fatIndex]]=myNewLine[fatIndex];
   obj1[header[carbohydratesIndex]]=myNewLine[carbohydratesIndex];
   obj1[header[proteinsIndex]]=myNewLine[proteinsIndex];
    for(j=0;j<arr.length;j++)
     {
      if(obj1.countries==arr1[j])
      {
      jArray.push(obj1);
       }
       if(obj1.countries==arr2[j])
       {
       jArray.push(obj1);
        }
        if(obj1.countries==arr3[j])
        {
        jArray.push(obj1);
         }
       }
   obj1={};
};
// console.log(jArray);

var jArray1=[],count=0,obj2={};
var fat_100g=0,carbohydrates_100g=0,proteins_100g=0;
for(i=0;i<arr1.length;i++)
{
aggregate(arr1[i],"North Europe");
}
jArray1.push(obj2);
for(i=0;i<arr2.length;i++)
{
aggregate(arr2[i],"Central Europe");
}
jArray1.push(obj2);
for(i=0;i<arr3.length;i++)
{
aggregate(arr3[i],"South Europe");
}
jArray1.push(obj2);
function aggregate(country,region){
  obj2={};
  for(var i=0;i<jArray.length;i++)
  {
  if(jArray[i].countries===country&&jArray[i].fat_100g!=''&&jArray[i].carbohydrates_100g!=''&&jArray[i].proteins_100g!='')
  {
    count++;
    fat_100g+=parseFloat(jArray[i].fat_100g);
    carbohydrates_100g+=parseFloat(jArray[i].carbohydrates_100g);
    proteins_100g+=parseFloat(jArray[i].proteins_100g);
  }
}
if(count!=0)
{
  fat_100g=fat_100g/count;
  carbohydrates_100g=carbohydrates_100g/count;
  proteins_100g=proteins_100g/count;
}
count=0;
obj2["country"]=region;
obj2["fat_consumption"]=fat_100g;
obj2["carbohydrates_consumption"]=carbohydrates_100g;
obj2["proteins_consumption"]=proteins_100g;
// fat_100g=0;
// carbohydrates_100g=0;
// proteins_100g=0;
}

var file = '3.json';
var obj=JSON.stringify(jArray1);
console.log( jArray1);
fs.writeFileSync(file, obj);
