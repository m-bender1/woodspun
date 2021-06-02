var xmlhttp = new XMLHttpRequest();
var url = "productData.txt";

xmlhttp.onreadystatechange = function () {
   if (this.readyState == 4 && this.status == 200) {
      var myArr = JSON.parse(this.responseText);
      generateProducts(myArr)
   }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function generateProducts(a) {
   console.log(a)
}
