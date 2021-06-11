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
      // adding type to image for filtering later
      prodDiv.classList.add("productDiv");
      prodDiv.classList.add(prodType);
      prodImg.src = a.products[i].imageUrl;
      prodImg.classList.add("productImg")
      prodPrice.innerHTML = "$" + a.products[i].productPrice
      prodName.innerHTML = "<b>" + a.products[i].productName + "</b>";
      prodDiv.appendChild(prodImg);
      prodDiv.appendChild(prodName);
      prodDiv.appendChild(prodPrice);
      wrapper[0].append(prodDiv);

      // the onclick for the image will send to prodDetails page 
      // on that page, will run an onload function that uses the clicked element
      // and generates a page w blown up image and prod details
      prodImg.addEventListener("click", function () {
         // use sessionStorage to save item that was clicked
         // variable resets on page change, so can't do it that way
         // first remove the storage item if it exits (ie client clicked on prod and went back and clicked on another)
         sessionStorage.removeItem("clickedProd");
         sessionStorage.setItem("clickedProd", prodDiv);
         window.location = "prodDetails.html";
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
   console.log(clickedProd.childNodes[0]);
}