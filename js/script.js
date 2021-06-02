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
   console.log(wrapper)
   for (let i = 0; i < a.length; i++) {
      // create the elements to append
      let prodDiv = document.createElement("div");
      let prodImg = document.createElement("img");
      let prodPrice = createElement("p");
      let prodName = createElement("p");

      prodDiv.classList.add(".productDiv");
      prodImg.src = a.products[i].imageUrl;
      prodPrice = a.products[i].productPrice
      prodName = a.products[i].productName;
      prodDiv.appendChild(prodImg);
      prodDiv.appendChild(prodName);
      prodDiv.appendChild(prodPrice);
      wrapper[0].append(prodDiv);
   }
}
