var xmlhttp = new XMLHttpRequest();
var url = "productData.txt";
var myArr = [];

xmlhttp.onreadystatechange = function () {
   if (this.readyState == 4 && this.status == 200) {
      myArr = JSON.parse(this.responseText);
      generateProducts(myArr);
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
      prodDiv.classList.add("disabled");
      // set name to check products against select value
      // the productDiv class makes this easier done with names instead of adding another class
      prodDiv.setAttribute("name", a.products[i].productType.trim());
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

function filterProducts() {
   // get the select dropd. value
   var selectedProd = document.getElementById("productSelect").value;
   var prodDivs = document.getElementsByClassName("productDiv");
   // add a display=none class to products not matching filter
   for (let i = 0; i < prodDivs.length; i++) {
      if (prodDivs[i].getAttribute("name") == selectedProd.trim() && selectedProd !== 'All') {
         $("input[name='" + selectedProd.trim() + "']").show();
         console.log($("input[name='" + selectedProd.trim() + "']") + 1)
      }
      if (prodDivs[i].getAttribute("name") !== selectedProd.trim() && selectedProd !== 'All') {
         $("input[name='" + selectedProd.trim() + "']").hide();
         console.log($("input[name='" + selectedProd.trim() + "']") + 2)
      }
      if (selectedProd == 'All') {
         $("input[name='" + selectedProd + "']").show();
         console.log($("input[name='" + selectedProd.trim() + "']") + 3)
      }
   }
}