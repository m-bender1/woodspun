const xmlhttp = new XMLHttpRequest();
const url = "productData.txt";
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

      prodName.innerHTML = "Item " + a.products[i].itemNum + " - " + a.products[i].productName
      prodImg1.src = a.products[i].productImage1
      if (a.products[i].productImage2 !== null) { // just to avoid 404 error
         prodImg2.src = a.products[i].productImage2
      }
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
         prodImg2.addEventListener("click", function () {
            expandImage()
         })
      }

      let infoDiv = document.createElement("div")

      imgDiv.classList.add("imgDiv")
      infoDiv.classList.add("infoDiv")

      infoDiv.appendChild(prodName)
      infoDiv.appendChild(prodPrice)
      infoDiv.appendChild(description)
      prodDiv.appendChild(imgDiv)
      prodDiv.append(infoDiv)

      prodImg1.addEventListener("click", function () {
         expandImage()
      })

      document.getElementById("productsArea").appendChild(prodDiv)
   }
}

function expandImage() {
   const images = document.getElementsByClassName("prodImg")

   for (let i = 0; i < images.length; i++) {
      const img = images[i]
      let expandedImgDiv = document.createElement("div")
      let newImg = document.createElement("img")
      let collapseBtn = document.createElement("button")
      newImg.id = "expandedImg"
      newImg.src = img.src
      expandedImgDiv.id = "expandedDiv"
      collapseBtn.id = "collapseBtn"
      collapseBtn.textContent = "Close"

      expandedImgDiv.appendChild(newImg)
      expandedImgDiv.appendChild(collapseBtn)
      document.getElementsByTagName("body")[0].appendChild(expandedImgDiv)

      collapseBtn.addEventListener("click", function () {
         document.getElementById("expandedDiv").remove()
         document.getElementById("collapseBtn").remove()
         document.getElementById("newImg").remove()
      })
   }
}