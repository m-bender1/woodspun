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

      if (productSelect == "All") {
         // give all products proper classes
         e.classList.remove("disabled");
         e.classList.add("productDiv");
      }
      else if (productSelect == myArr.products[i].productType) {
         // disabled class is overwritten by productDiv styling
         // have to add and remove that as well
         e.classList.remove("disabled");
         (e.classList.add("productDiv"));
      }
      else {
         (e.classList.add("disabled"));
         (e.classList.remove("productDiv"));
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

function quickLinkFilter(type) {
   // will set a sessionstorage variable based on link clicked, then filter accordingly 
   // clear any existing storage first
   sessionStorage.removeItem("filter");
   if (type == "stopper") {
      sessionStorage.setItem("filter", "stopper");
   }
   else {
      sessionStorage.setItem("filter", "pen");
   }
   // move to productDetail page 
   window.location = "products.html";
}

function setFilter() {
   if (typeof sessionStorage.getItem("filter") == undefined) {
      console.log("test");
   }
   else if (sessionStorage.getItem("filter") == "pen") {
      document.getElementById("productSelect").value = "Pens";
   }
   else if (sessionStorage.getItem("filter") == "stopper") {
      document.getElementById("productSelect").value = "Wine Stoppers";
   }
}