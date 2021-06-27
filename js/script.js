var xmlhttp = new XMLHttpRequest();
var url = "productData.txt";
var myArr = [];

function loadProducts() {
   xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
         // sets array to data in json file
         myArr = JSON.parse(this.responseText);
         displayProducts(myArr);
      }
   };
   xmlhttp.open("GET", url, true);
   xmlhttp.send();
}

function displayProducts(a) {
   // get the wrapper div
   let wrapper = document.getElementsByClassName("grid-wrapper");
   for (let i = 0; i < a.products.length; i++) {
      // create the elements to append
      let prodDiv = document.createElement("div");
      let prodImg = document.createElement("img");
      let prodPrice = document.createElement("p");
      let prodName = document.createElement("p");
      let addToCartBtn = document.createElement("button");

      // append the img and p tags to proddiv and then proddiv to grid wrapper
      prodDiv.classList.add("productDiv");
      prodDiv.id = a.products[i].uniqueID;
      // add to cart button
      addToCartBtn.innerHTML = "Add To Cart";
      addToCartBtn.classList.add("addToCartBtn");

      // add img src, alt text and class
      prodImg.src = a.products[i].imageUrl;
      prodImg.alt = a.products[i].imageAlt;
      prodImg.classList.add("productImg");
      prodPrice.innerHTML = "$" + a.products[i].productPrice
      prodName.innerHTML = "<b>" + a.products[i].productName + "</b>";

      // append the img + details + button to productDiv
      prodDiv.appendChild(prodImg);
      prodDiv.appendChild(prodName);
      prodDiv.appendChild(prodPrice);
      prodDiv.appendChild(addToCartBtn);
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

      addToCartBtn.addEventListener("click", function () {
         // calling the add to cart function
         addToCart(a.products[i]);
      })
   }
   setFilter();
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
   let addToCartBtn = document.createElement("button");

   // add to cart button + event listener
   addToCartBtn.innerHTML = "Add To Cart";
   addToCartBtn.classList.add("addToCartBtn");
   addToCartBtn.addEventListener("click", function () {
      addToCart(prod);
   })

   // now output to page
   let imgWrap = document.getElementById("image");
   let description = document.getElementById("description");
   let pImg = document.createElement("img");
   let title = document.createElement("h2");
   let price = document.createElement("p");
   let descriptionParagraph = document.createElement("p");

   title.textContent = prod.productName;
   price.textContent = "$" + prod.productPrice;
   descriptionParagraph.textContent = prod.productDescription;

   // img src and alt text
   pImg.src = prod.imageUrl;
   pImg.alt = prod.imageAlt;
   imgWrap.append(pImg);

   description.append(title)
   description.append(descriptionParagraph);
   description.append(addToCartBtn);
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
      document.getElementById("productSelect").value = "All";
   }
   else if (sessionStorage.getItem("filter") == "pen") {
      document.getElementById("productSelect").value = "Pens";
   }
   else if (sessionStorage.getItem("filter") == "stopper") {
      document.getElementById("productSelect").value = "Wine Stoppers";
   }
   filterProducts();
   //remove the filter so reload allows all products to show
   sessionStorage.removeItem("filter");
}

// takes full product object as parameter (a.products[i]) 
function addToCart(p) {
   // pass this products data to local storage with items id as var name
   // using localstorage so the cart is saved in browser until explicitly deleted (removed from cart by client)
   let cartItem = JSON.stringify(p);
   // ensure the item isn't already in the cart
   if (localStorage.getItem(p.uniqueID) == null) {
      localStorage.setItem(p.uniqueID, cartItem);
      alert(p.productName + " added to cart.");
   }
}

function displayCart() {
   // get cart page elements
   let cartProductsDiv = document.getElementById("cartProductsDiv");
   let cartTotalDiv = document.getElementById("cartTotalDiv");
   let cartItemPriceArray = [];
   for (let i = 0; i < localStorage.length; i++) {
      let itemID = "item" + i;
      let cartItem = localStorage.getItem(itemID);
      let parsedCartItem = JSON.parse(cartItem);
      if (parsedCartItem !== null) {
         // create cart item div
         let cartItemDiv = document.createElement("div");
         let cartItemImgDiv = document.createElement("div");
         let cartItemContentDiv = document.createElement("div");
         let itemTitle = document.createElement("h3");
         let itemImg = document.createElement("img");
         let itemPrice = document.createElement("label");
         let itemDesc = document.createElement("p");
         let removeBtn = document.createElement("button");
         let clearCartBtn = document.createElement("button");

         // div ids
         cartItemDiv.id = "cartItemDiv";
         cartItemImgDiv.id = "cartItemImgDiv";
         cartItemContentDiv.id = "cartItemContentDiv";

         // add content to the elements
         // title
         itemTitle.textContent = parsedCartItem.productName;
         itemPrice.textContent = "$" + parsedCartItem.productPrice;
         itemDesc.textContent = parsedCartItem.productDescription
         itemImg.src = parsedCartItem.imageUrl;
         itemImg.alt = parsedCartItem.imageAlt;
         itemImg.classList.add("cartImg");
         removeBtn.id = "cartRemoveBtn";
         removeBtn.textContent = "Remove";
         clearCartBtn.textContent = "Clear Cart";
         clearCartBtn.id = "clearCartBtn"

         // append the cart item to the parent div 
         cartProductsDiv.append(cartItemDiv);

         // append the child divs to the cart item div
         cartItemDiv.append(cartItemImgDiv);
         cartItemDiv.append(cartItemContentDiv);

         // append prod img to div
         cartItemImgDiv.append(itemImg);

         //append content to item content div
         cartItemContentDiv.append(itemTitle);
         cartItemContentDiv.append(itemPrice);
         cartItemContentDiv.append(itemDesc);
         cartItemContentDiv.append(removeBtn);

         // onclick functions for the cart
         cartItemPriceArray.push(Number(parsedCartItem.productPrice));
         // get totals div child elements
         let subtotalCost = document.getElementById("cartSubtotal");
         let shippingCost = document.getElementById("cartShippingCost");
         let totalCost = document.getElementById("cartTotal");
         generateTotal(cartItemPriceArray, subtotalCost, shippingCost, totalCost);
      
         // remove btn onclick 
         removeBtn.addEventListener("click", function () {
            sessionStorage.removeItem(parsedCartItem.uniqueID);
         })
         clearCartBtn.addEventListener("click", function () {
            sessionStorage.clear();
         })
      }
   }
}

function generateTotal(priceArr, subE, shipE, totalE) {
   // gets prices from arr passed in param, generates
   // totals from that
   console.log(priceArr)
   let subtotal = 0.00;
   let shipping = 3.50;
   let total = 0.00;
   for (let i = 0; i < priceArr.length; i++) {
      subtotal += priceArr[i];
      total = subtotal + shipping;
   }

   subE.innerHTML = "Subtotal: $" + subtotal.toFixed(2);
   shipE.innerHTML = "Shipping: $" + shipping.toFixed(2);
   totalE.innerHTML = "Total: $" + total.toFixed(2);
}


// nav logo onclick home function
document.getElementById("logo").addEventListener("click", function() {
   window.location = "index.html";
})