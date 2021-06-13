var xmlhttp = new XMLHttpRequest();
var url = "productData.txt";
var myArr = [];

xmlhttp.onreadystatechange = function () {
   if (this.readyState == 4 && this.status == 200) {
      // sets array to data in json file
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

      // append the img and p tags to proddiv and then proddiv to grid wrapper
      prodDiv.classList.add("productDiv");
      prodDiv.id = a.products[i].uniqueID;
      // add img src and class
      prodImg.src = a.products[i].imageUrl;
      prodImg.classList.add("productImg")
      prodPrice.innerHTML = "$" + a.products[i].productPrice
      prodName.innerHTML = "<b>" + a.products[i].productName + "</b>";
      prodDiv.appendChild(prodImg);
      prodDiv.appendChild(prodName);
      prodDiv.appendChild(prodPrice);
      wrapper[0].append(prodDiv);

      prodImg.addEventListener("click", function () {
         // stringify the json and pass it to sessionStorage 
         // clear any existing storage first
         let data = JSON.stringify(a.products[i]);
         sessionStorage.removeItem("clickedProd");
         sessionStorage.setItem("clickedProd", data);
         // move to productDetail page 
         window.location = "productDetails.html";
      })
   }
}

// onchange event for the select dropdown
function filterProducts() {
   // let products = document.getElementsByClassName("productDiv");
   let productSelect = document.getElementById("productSelect").value;

   for (let i = 0; i < myArr.products.length; i++) {
      // gets element matching with matching id
      let e = document.getElementById(myArr.products[i].uniqueID);

      if (productSelect == myArr.products[i].productType) {
         e.classList.remove("disabled");
      }
      else {
         (e.classList.add("disabled"))
      }
   }
}

function displayProduct() {
   let clickedProd = sessionStorage.getItem("clickedProd");
   let prod = JSON.parse(clickedProd);
   console.log(JSON.parse(clickedProd));

   // now output to page
   let imgWrap = document.getElementById("image");
   let details = document.getElementById("description");

   let pImg = document.createElement("img");
   pImg.src = prod.imageUrl;
   imgWrap.append(pImg);

   details.innerHTML = "<h2>" + prod.productName + "</h2><hr>" + "<p>$" + prod.productPrice + "</p><p>"
      + prod.kitType + "</p><p>" + prod.woodType + "</p>";
}