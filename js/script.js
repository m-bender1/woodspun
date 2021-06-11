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
      prodDiv.classList.add(prodType);
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
var select = document.getElementById("productSelect");
select.addEventListener("change", function () {
   let products = document.getElementsByClassName("productDiv");
   let productSelect = document.getElementById("productSelect").value;
   for (let i = 0; i < products.length; i++) {
      
   }
})

function displayProduct() {
   let clickedProd = sessionStorage.getItem("clickedProd");
   console.log(JSON.parse(clickedProd));
   
   // now output to page
   let imgWrap = document.getElementById("image");
   let details = document.getElementById("description");

   let pImg = document.createElement("img");
   pImg.src = clickedProd.imageUrl;
   imgWrap.innerHTML =pIimg;

   details.innerHTML = clickedProd.prodName + "<br>" + clickedProd.prodPrice + "<br>" + clickedProd.kitType;
}