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
      let prodType = a.products[i].productType;

      // add classes, src to image and proddiv
      // add innerhtml to p tags
      // append the img and p tags to proddiv and then proddiv to grid wrapper
      prodDiv.classList.add("productDiv");
      prodDiv.classList.add(prodType);
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

// onchange event for the select dropdown
var select = document.getElementById("productSelect");
select.addEventListener("change", function () {
   let prodDivs = document.getElementsByClassName("productDiv");
   let productSelect = document.getElementById("productSelect").value;
   console.log(productSelect.trim())
   for (let i = 0; i < prodDivs.length; i++) {
      // give all elements a disabled class
      prodDivs[i].classList.add("disabled");
      if (productSelect.trim() == "All") {
         // remove from all for all btn
         prodDivs[i].classList.remove("disabled");
      }
      // if prod matches select remove class
      if (prodDivs[i].classList.contains(productSelect.trim())) {
         prodDivs[i].classList.remove("disabled");
         if (!(prodDivs[i].classList.contains("productDiv"))) {
            prodDivs[i].classList.add("productDiv");
         }
      }
      // if prod doesn't match, add disabled class
      else if (!(prodDivs[i].classList.contains(productSelect.trim()))) {
         prodDivs[i].classList.add("disabled");
         if (prodDivs[i].classList.contains("productDiv")) {
            prodDivs[i].classList.remove("productDiv");
         }
      }
   }
})