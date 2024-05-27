// dropDownMenu
function dropDownList() {
  // document.getElementById("Linklist-3").classList.toggle("showMenu");
  document.getElementById("Linklist-1").classList.toggle("showMenu");
}
function dropDownList2() {
  // document.getElementById("Linklist-3").classList.toggle("showMenu");
  document.getElementById("Linklist-2").classList.toggle("showMenu");
}
function dropDownList3() {
  // document.getElementById("Linklist-3").classList.toggle("showMenu");
  document.getElementById("Linklist-3").classList.toggle("showMenu");
}
function dropDownList4() {
  // document.getElementById("Linklist-3").classList.toggle("showMenu");
  document.getElementById("Linklist-4").classList.toggle("showMenu");
}
function dropDownList5() {
  // document.getElementById("Linklist-3").classList.toggle("showMenu");
  document.getElementById("Linklist-5").classList.toggle("showMenu");
}
function dropDownList6() {
  // document.getElementById("Linklist-3").classList.toggle("showMenu");
  document.getElementById("Linklist-6").classList.toggle("showMenu");
}
function dropDownList7() {
  // document.getElementById("Linklist-3").classList.toggle("showMenu");
  document.getElementById("Linklist-7").classList.toggle("showMenu");
}
function dropDownList8() {
  // document.getElementById("Linklist-3").classList.toggle("showMenu");
  document.getElementById("Linklist-8").classList.toggle("showMenu");
}
function dropDownList9() {
  // document.getElementById("Linklist-3").classList.toggle("showMenu");
  document.getElementById("Linklist-9").classList.toggle("showMenu");
}
/*-------------------
    accordion details
    --------------------- */
// $(document).ready(function () {
//   $(".details-desc-wrap .details-desc-list").click(function () {
//     $(this).next(".details-desc-content").slideToggle();
//     $(this).parent().toggleClass("action");
//   });
// });
let productInforSpace = document.getElementById("product-infor-space");
let productSimilarSpace = document.getElementById("product-similar-space");
let productName = document.getElementById("name-product");
const notificationCart = document.querySelector(`.notification-cart`)

//increase number to buy
let quantityBuy = 1;

//chuyển về tiền việt
function formatMoney(money) {
  return new Intl.NumberFormat(`vi-VN`, {
    style: `currency`,
    currency: `VND`,
  }).format(money);
}
function render() {
  let productInfor = JSON.parse(localStorage.getItem("product_infor")) || [];
  //check real name of productInfor to show other product
  let realProducts = JSON.parse(localStorage.getItem("products_03")) || [];
  let productIndex = realProducts.findIndex(item=>item.id ==productInfor.id);
  productName.innerHTML = `${productInfor.productRealName}`;
  let stringSameProduct = "";
  for (let i in realProducts) {
    if (productInfor.idCategory == realProducts[i].idCategory) {
      stringSameProduct += `
          <div class="other-color aos-animate">
            <a href="#" class="other-item">
              <img
                onclick="changeToProductInfor(${realProducts[i].id})"
                src="${realProducts[i].image[0]}"
                alt=""
              />
            </a>
          </div>
        `;
    }
  }
  //render product detail
  renderDetailProduct(realProducts[productIndex], stringSameProduct);
  //render similar product with catelogry
  renderSimilarProduct(realProducts[productIndex], realProducts);
}
render();
function renderDetailProduct(product, textHtml) {
  let stringHTML = "";
  let stringStatus = "";
  //check status of productInfor
  if (product.status == true) {
    stringStatus = "In stock, ready to ship";
  } else {
    stringStatus = "Out stock, not ready to ship";
  }
  //render products
  stringHTML = `
        <div
        class="grid__item medium-up--three-fifths product-single__sticky"
      >
        <div class="product-imgs">
          <div class="img-select">
            <div class="img-item">
              <a href="#" data-id="1">
                <img
                  src="${product.image[0]}"
                />
              </a>
            </div>
            <div class="img-item">
              <a href="#" data-id="2">
                <img
                  src="${product.image[1]}"
                />
              </a>
            </div>
          </div>
          <div class="img-display">
            <div class="img-showcase">
              <img
                src="${product.image[0]}"
              />
              <img
                src="${product.image[1]}"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="grid__item medium-up--two-fifths">
        <div class="product-single__meta">
          <div class="product-block product-block--header">
            <h1 class="">${product.productRealName}</h1>
          </div>
          <div class="data-product">
            <div class="product-block product-block--price">
              <span class="product__price">${formatMoney(product.price)}</span>
              <div class="product__policies rte">
                <a href="">Shipping</a>
                calculated at checkout.
              </div>
            </div>
            <div class="product-block">
              <hr />
            </div>
            <div class="product-block">
              <div class="variant-wrapper">
                <label for="" class="variant__label">Color</label>
                <div class="variant-input-wrap">
                  <div class="variant-input">${product.productColor}</div>
                </div>
              </div>
              <div class="variant-wrapper">
                <label for="" class="variant__label">Size</label>
                <div class="variant-input-wrap">
                  <div class="variant-input">${product.productSize}</div>
                </div>
              </div>
              <div class="product-stitch variant-wrapper">
                <label for="" class="variant__label"
                  >OTHER COLOR(S):</label
                >
                ${textHtml}
              </div>
            </div>
            <div class="product-block">
              <div class="product__quantity">
                <label for="">Quantity</label>
                <div class="js-qty__wrapper">
                  <input
                    type="text"
                    class="js-qty__num"
                    value="${quantityBuy}"
                    min="1"
                  />
                  <button
                    type="button"
                    class="js-qty__adjust js-qty__adjust--minus"
                    onclick="minusQuantity()"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    class="js-qty__adjust js-qty__adjust--plus"
                    onclick="plusQuantity()"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div class="product-block">
              <div class="sales-points">
                <span class="icon-and-text">
                  <span class="icon icon--inventory">
                    <div class="status-icon"></div>
                    <div class="radar-circle"></div>
                  </span>
                  <span>${stringStatus}</span>
                </span>
              </div>
            </div>
            <div class="shopify-block shopify-app-block">
              <a href="#" class="wishlist-btn2" onclick="addToWhishList(${
                product.id
              })">
                <div class="hulk_wl_icon">
                  <i class="bx bx-heart"></i>
                </div>
                <span class="hulk-wishlist-btn-title"
                  >Add to wishlist</span
                >
              </a>
            </div>
            <div class="shopify-block shopify-app-block">
              <a href="#" class="wishlist-btn2" onclick="addToCart(${
                product.id
              })">
                <span class="hulk-wishlist-btn-title">Add to cart</span>
              </a>
            </div>
            <div class="">
              AVAILABLE FOR HOME DELIVERY OR PICK UP IN STORE
            </div>
            <div class="product-block">
              <div class="rte">
                <p><strong>Highlight</strong></p>
                <ul>
                  <li>Design Details: Woven Label</li>
                  <li>Material: Plain Weave</li>
                  <li>Material Composition: 100% Nylon</li>
                </ul>
                <p>
                  <br />
                  <strong>Product Code</strong>
                  <br />
                  ${product.productCode}
                  <br />
                  <br />
                  <b>
                    <i>
                      Product color may slightly vary due to photographic
                      lighting sources or your device screen settings.</i
                    >
                  </b>
                </p>
              </div>
            </div>
            <div class="product-block">
              <div
                class="product-block product-block--tab custom-product-block"
                onclick="dropDownList9()"
              >
                <button type="button" class="product-infor-btn">
                  SIZE GUIDE
                  <span>
                    <ion-icon name="arrow-down-outline"></ion-icon>
                  </span>
                </button>
              </div>
              <div id="Linklist-9" class="collapsible-content">
                <img
                  src="../../Public/image/Size/CAPS_AND_HATS_b2433967-f87e-40c7-9e59-8bba073b2155.webp"
                  alt=""
                />
              </div>
            </div>
            <div class="product-block">
              <div class="social-sharing">
                <a href="#"><ion-icon name="logo-facebook"></ion-icon></a>
                <a href="#"><ion-icon name="logo-twitter"></ion-icon></a>
                <a href="#"
                  ><ion-icon name="logo-pinterest"></ion-icon
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
  `;
  productInforSpace.innerHTML = stringHTML;
}
//render similar product with catelogry
function renderSimilarProduct(product, listProduct) {
  let count = 0;
  let stringHTML = "";
  for (let i in listProduct) {
    if (product.idCategory == listProduct[i].idCategory && count < 4) {
      stringHTML += `
      <div
      class="grid__item grid-product small--one-half medium-up--one-quarter grid-product__has-quick-shop aos-init aos-animate"
    >
      <div class="grid-product__content">
        <a
          href=""
          class="wishlist-btn grid-wishlist-btn style_1"
        >
          <div style="display: initial" class="wishlist_btn_icon">
            <i class="bx bx-heart"></i>
          </div>
        </a>
        <a href="#" class="grid-product__link">
          <div class="grid-product__image-mask" onclick="changePage(${listProduct[i].id})">
            <div
              class="image-wrap loaded"
              style="height: 0; padding-bottom: 150%"
            >
              <img
                onclick="changeToProductInfor(${listProduct[i].id})"
                src="${listProduct[i].image[0]}"
                alt=""
              />
            </div>
          </div>
          <div class="grid-product__meta">
            <div class="grid-product__title">
              ${listProduct[i].productRealName}
            </div>
            <div class="grid-product__price">${formatMoney(
              listProduct[i].price
            )}</div>
            <button
              class="quick-product__btn js-modal-open-quick-modal-8121681051838 small--hide"
              onclick="btnAddNewCart(${listProduct[i].id})"
            >
              <span class="quick-product__label"
                >+ Add to cart</span
              >
            </button>
          </div>
        </a>
      </div>
    </div>
      `;
      count++;
    }
  }
  let carts = JSON.parse(localStorage.getItem("cart")) || [];
  notificationCart.innerHTML=`${calNumberProduct(carts)}`;
  productSimilarSpace.innerHTML = stringHTML;
}
function changeToProductInfor(id) {
  //bring product infor to local and go to product page
  let realProducts = JSON.parse(localStorage.getItem("products_03")) || [];
  let productsIndex = realProducts.findIndex((item) => item.id === id);
  let productObject = {};
  productObject = realProducts[productsIndex];
  localStorage.setItem("product_infor", JSON.stringify(productObject));
  window.location.href = "./product.html";
}
const imgs = document.querySelectorAll(".img-select a");
const imgBtns = [...imgs];
let imgId = 1;

imgBtns.forEach((imgItem) => {
  imgItem.addEventListener("click", (event) => {
    event.preventDefault();
    imgId = imgItem.dataset.id;
    slideImage();
  });
});

function slideImage() {
  const displayWidth = document.querySelector(
    ".img-showcase img:first-child"
  ).clientWidth;
  document.querySelector(".img-showcase").style.transform = `translateX(${
    -(imgId - 1) * displayWidth
  }px)`;
}

window.addEventListener("resize", slideImage);
//btn to increase
let btnMinusQuantity = document.querySelector(`js-qty__adjust--minus`);
let btnPlusQuantity = document.querySelector(`js-qty__adjust--plus`);

function plusQuantity() {
  quantityBuy = quantityBuy + 1;
  render();
}
function minusQuantity() {
  if (quantityBuy > 1) {
    quantityBuy = quantityBuy - 1;
  }
  render();
}

//add to whishlist
function addToWhishList(id) {
  // console.log(id);
}

function changePage(id){
  //bring product infor to local and go to product page
  let realProducts = JSON.parse(localStorage.getItem("products_03")) || [];
  let productsIndex = realProducts.findIndex((item) => item.id === id);
  let productObject = {};
  productObject = realProducts[productsIndex];
  localStorage.setItem("product_infor", JSON.stringify(productObject));
  window.location.href = "./product.html";
}
//add to cart
function addToCart(id, quantityProduct) {
  let carts = JSON.parse(localStorage.getItem("cart")) || [];
  let cart = {};
  let check = carts.findIndex((item) => item.idProduct == id);
  if (check !== -1) {
    carts[check].quantityPrd = carts[check].quantityPrd + quantityBuy;
    localStorage.setItem("cart", JSON.stringify(carts));
    notificationCart.innerHTML=`${calNumberProduct(carts)}`;
  } else {
    cart.idProduct = id;
    cart.quantityPrd = quantityBuy;
    carts.push(cart);
    localStorage.setItem("cart", JSON.stringify(carts));
    notificationCart.innerHTML=`${calNumberProduct(carts)}`;
  }
}
function btnAddNewCart(id){
  let carts = JSON.parse(localStorage.getItem("cart")) || [];
  let cart = {};
  let check = carts.findIndex((item) => item.idProduct == id);
  if (check !== -1) {
    carts[check].quantityPrd = carts[check].quantityPrd + 1;
    localStorage.setItem("cart", JSON.stringify(carts));
  } else {
    cart.idProduct = id;
    cart.quantityPrd = 1;
    carts.push(cart);
    localStorage.setItem("cart", JSON.stringify(carts));
  }
}
function calNumberProduct(cartss){
  let count =0;
  for (let key in cartss) {
    count = count + cartss[key].quantityPrd;
  }
  return count;
}
