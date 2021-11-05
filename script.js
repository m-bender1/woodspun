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
      let imgDiv = document.createElement("div")

      prodName.innerHTML = a.products[i].productName
      prodImg1.src = a.products[i].productImage1
      prodImg2.src = a.products[i].productImage2
      prodPrice.innerHTML = "$" + a.products[i].productPrice
      description.innerHTML = a.products[i].productDescription

      prodName.classList.add("prodName")
      description.classList.add("prodDescription")
      prodPrice.classList.add("prodPrice")
      prodImg1.classList.add("prodImg")
      prodImg2.classList.add("prodImg")
      prodDiv.classList.add("prodDiv")

      if (a.products[i].productImage2 == null) {
         imgDiv.appendChild(prodImg1)
      }
      else {
         imgDiv.appendChild(prodImg1)
         imgDiv.appendChild(prodImg2)
      }

      let infoDiv = document.createElement("div")

      imgDiv.classList.add("imgDiv")
      infoDiv.classList.add("infoDiv")

      infoDiv.appendChild(prodName)
      infoDiv.appendChild(prodPrice)
      infoDiv.appendChild(description)
      prodDiv.appendChild(imgDiv)
      prodDiv.append(infoDiv)

      document.getElementById("productsArea").appendChild(prodDiv)
   }
}