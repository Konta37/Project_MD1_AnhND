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
let checkMenu = document.getElementById("check");
let btnMenu = document.getElementById("btnMenu");
btnMenu.onclick = function openMenu() {
  if (checkMenu.checked == true) {
    checkMenu.checked = false;
  } else {
    checkMenu.checked = true;
  }
};

let cartWrapper = document.querySelector(".cart_wrapper");
let cartFooter = document.querySelector(".cart__footer");
const notificationCart = document.querySelector(`.notification-cart`);

let total = 0;

function render() {
  let carts = JSON.parse(localStorage.getItem("cart")) || [];
  let realProducts = JSON.parse(localStorage.getItem("products_03")) || [];
  let stringHTML = "";
  if (carts.length < 1) {
    stringHTML = "There are nothing here";
    cartWrapper.innerHTML = stringHTML;
  } else {
    // let productIndex = realProducts.findIndex(item=>item.id == carts)
    for (let i in carts) {
      let productIndex = realProducts.findIndex(
        (item) => item.id == carts[i].idProduct
      );
      //caluclator price
      let priceTotal = realProducts[productIndex].price * carts[i].quantityPrd;
      stringHTML += `
      <div class="cart__item">
          <div class="cart__item--image">
              <a class="image-wrap loaded" onclick="changeToProductInfor(${realProducts[productIndex].id})">
                  <img src="${realProducts[productIndex].image[0]}" alt="">
              </a>
          </div>
          <div class="cart__item--details">
              <div class="cart__item--name">
                  <a href="#" class="cart__product-name">
                      ${realProducts[productIndex].productRealName}
                  </a>
                  <div class="cart__variant-meta">
                      ${realProducts[productIndex].productColor} /  ${
        realProducts[productIndex].productSize
      }
                  </div>
                  <div class="cart--remove js-no-transition" onclick="deleteCartID(${
                    realProducts[productIndex].id
                  })">X Remove</div>
              </div>
              <div class="cart__item--qty">
                  <div class="js-qty__wrapper">
                      <button type="button" class="js-qty__adjust js-qty__adjust--minus" onclick="minusQuantity(${
                        carts[i].idProduct
                      })">-</button>
                      <input type="text" value="${
                        carts[i].quantityPrd
                      }" min="1" class="js-qty__num">
                      <button type="button" class="js-qty__adjust js-qty__adjust--plus" onclick="plusQuantity(${
                        carts[i].idProduct
                      })">+</button>
                  </div>
              </div>
              <div class="cart__item--price cart__item-price-col text-right">
                  <span class="cart__price">${formatMoney(priceTotal)}</span>
              </div>
          </div>
        </div>
    `;
      total = total + priceTotal;
    }
    notificationCart.innerHTML=`${calNumberProduct(carts)}`;
    cartWrapper.innerHTML = stringHTML;
    renderCartFooter(total);
  }
}
render();

function deleteCartID(id) {
  let carts = JSON.parse(localStorage.getItem("cart")) || [];
  let productIndex = carts.findIndex((item) => item.idProduct == id);
  carts.splice(productIndex, 1);
  localStorage.setItem("cart", JSON.stringify(carts));
  render();
}
function renderCartFooter(totals) {
  let stringHTML = "";
  let discount = 0.1; //10% discount
  let discountAfter = 0;
  let minimumTotal = 800000; //minimun total is 800.000đ
  let minimumPriceBonus = 100000; //Total will decrease when have enough minimumtotal
  if (totals > minimumTotal) {
    discountAfter = totals - totals * discount;
  } else {
    discountAfter =0;
  }
  //caluclator price
  stringHTML = `
  <div class="gird">
    <div class="grid__item medium-up--one-half text-center medium-up--text-right medium-up--push-one-half">
        <div class="cart__item-sub cart__item-row">
            <div class="cart__subtotal">Subtotal</div>
            <div class="csapp_discount_total_wrapper">
                <div class="csapp-price-wrapper">
                    <span class="cart_total discount-price">
                        <span class="money">${formatMoney(totals)}</span>
                    </span>
                    <span class="csapps-cart-total">
                        <span class="money">${formatMoney(discountAfter)}</span>
                    </span>
                </div>
                <div class="csapp-price-saving aiodmb_saving">
                    <b>You Save:</b>
                    <span class="aiod_save_price money">${formatMoney(
                      totals - discountAfter
                    )}</span>
                </div>
                <div class="csapp-discount-list">
                    <div class="discount-label-conatiner">
                        <div class="discount">
                            <div class="dis-name">
                                <span class="dis-svg">
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAsklEQVR4nO2SQQqFMAxE54guvrjwML9Lz2XxInoMhUihQpGkjbGudKBQSPtmmgb4VFktgBUAFdajcLoL/2fOmQxaJdxk0CVwx9QnAN5qUIIjwkcYDDj4dErLSWUgJfentCYDTVskuXgv3GfVCHBSzHoKDyFZLUJyKhio4DmDnNTwXIsgTNEluOaTfTJFJvihX2IyMPUDvgHor8JLJq4GXGqXu9MWzUuoVnJuuua4wv5l2gFMS34KdaIPOAAAAABJRU5ErkJggg==">
                                    <span class="dis-text">Get ${
                                      discount * 100
                                    }% off with a minimum spend of ${formatMoney(
    minimumTotal
  )}</span>
                                </span>
                            </div>
                        </div>
                        <div class="discount_price">
                            <div class="csapp_money">
                                <span class="money aiod_price_label"> - ${formatMoney(
                                  totals - discountAfter
                                )}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="cart__checkout-wrapper">
            <small class="text-left small margin-top-15 checkout-reminders">
                Shipping and discount codes calculated at checkout
            </small>
            <button type="button" onclick="ChangeToCheckout()" name="checkout" class="btn btn--no-animate cart__checkout aiod_cart_loaded">
                Check out
            </button>
            <small class="text-left small margin-top-5 rte">
                Proceeding with your order constitutes acceptance to our 
                <a href="" class="js-no-transition">
                    terms and conditions
                </a>
            </small>
        </div>
    </div>
  </div>
    `;
  cartFooter.innerHTML = stringHTML;
}

//chuyển về tiền việt
function formatMoney(money) {
  return new Intl.NumberFormat(`vi-VN`, {
    style: `currency`,
    currency: `VND`,
  }).format(money);
}

function plusQuantity(id) {
  let carts = JSON.parse(localStorage.getItem("cart")) || [];
  let productIndex = carts.findIndex((item) => item.idProduct == id);
  carts[productIndex].quantityPrd = carts[productIndex].quantityPrd + 1;
  localStorage.setItem("cart", JSON.stringify(carts));
  total = 0;
  render();
}
function minusQuantity(id) {
  let carts = JSON.parse(localStorage.getItem("cart")) || [];
  let productIndex = carts.findIndex((item) => item.idProduct == id);
  if (carts[productIndex].quantityPrd > 1) {
    carts[productIndex].quantityPrd = carts[productIndex].quantityPrd - 1;
    localStorage.setItem("cart", JSON.stringify(carts));
  }
  total = 0;
  render();
}
function calNumberProduct(cartss){
  let count =0;
  for (let key in cartss) {
    count = count + cartss[key].quantityPrd;
  }
  return count;
}

function deleteAll(){
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
      localStorage.removeItem("cart");
      render();
    }
  });
}

function changeToProductInfor(id) {
  //bring product infor to local and go to product page
  let realProducts = JSON.parse(localStorage.getItem("products_03")) || [];
  let productsIndex = realProducts.findIndex((item) => item.id === id);
  let productObject = {};
  productObject.id = realProducts[productsIndex].id;
  productObject.idCategory = realProducts[productsIndex].idCategory;
  productObject.productRealName = realProducts[productsIndex].productRealName;
  localStorage.setItem("product_infor", JSON.stringify(productObject));
  window.location.href = "./product.html";
}
function ChangeToCheckout(){
  window.location.href="./check-out.html"
}