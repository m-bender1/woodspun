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
   // get the wrapper div
   let wrapper = document.getElementsByClassName("grid-wrapper");
   for (let i = 0; i < a.products.length; i++) {
      // create the elements to append
      let prodDiv = document.createElement("div");
      let prodImg = document.createElement("img");
      let prodPrice = document.createElement("p");
      let prodName = document.createElement("p");
      
      // add classes, src to image and proddiv
      // add innerhtml to p tags
      // append the img and p tags to proddiv and then proddiv to grid wrapper
      prodDiv.classList.add("productDiv");
      prodImg.src = a.products[i].imageUrl;
      prodImg.classList.add("productImg");
      prodPrice.innerHTML = "$" + a.products[i].productPrice
      prodName.innerHTML = "<b>" + a.products[i].productName + "</b>";
      prodDiv.appendChild(prodImg);
      prodDiv.appendChild(prodName);
      prodDiv.appendChild(prodPrice);
      wrapper[0].append(prodDiv);
   }
}

// onchange of the select
function filterProducts() {
   console.log(document.getElementsByTagName("select")[0].value);
   // check if the select value == the productType in json
}
