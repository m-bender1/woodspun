var xmlhttp = new XMLHttpRequest();
var url = "productData.txt";
var prodArr = [];

function loadProducts() {
   xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
         // sets array to data in json file
         prodArr = JSON.parse(this.responseText);
         displayProducts(prodArr);
      }
   };
   xmlhttp.open("GET", url, true);
   xmlhttp.send();
}

function displayProducts(a) {
   for (let i = 0; i < a.products.length; i++) {
      // create the elements to append
      let prodDiv = document.createElement("div");
      let prodImg1 = document.createElement("img"), prodImg2 = document.createElement("img");
      let prodPrice = document.createElement("p"), prodName = document.createElement("p"), description = document.createElement("p");

      prodName.innerHTML = a.products[i].productName
      prodImg1.src = a.products[i].productImage1
      prodImg2.src = a.products[i].productImage2
      prodPrice.innerHTML = "$" + a.products[i].productPrice
      description.innerHTML = a.products[i].productDescription

      prodName.classList.add("prodName")
      prodDescription.classList.add("prodDescription")
      prodPrice.classList.add("prodPrice")
      if (prodImg2.src = "") {
         prodImg1.classList.add("singleImg")
         prodDiv.appendChild(prodImg1)
      }
      else {
         prodImg1.classList.add("img1")
         prodImg2.classList.add("img2")
         prodDiv.appendChild(prodImg1)
         prodDiv.appendChild(prodImg2)
      }

      prodDiv.appendChild(prodName)
      prodDiv.appendChild(prodPrice)
      prodDiv.appendChild(prodDescription)

      document.getElementById("productsArea").innerHTML = prodDiv
   }
}