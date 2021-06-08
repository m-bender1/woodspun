var xmlhttp = new XMLHttpRequest();
var url = "productData.txt";
var myArr = [];
// this variable is used to check if a quicklink was used, then display accordingly. 
// if quicklink, will be set to either pen or topper, else will be set to false
var filterCheck = false;
// func to set filtercheck based on clicklink clicked
function quickLink(cl) {
   if (cl == "pens" || cl == "toppers") {
      filterCheck = cl;
      console.log(cl)
   }
}

// this needs to change to just generating the array of products. then, using the filtering func
// and another func for the home page buttons changing the dd
// will generate only the filtered products
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
