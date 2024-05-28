let formSection = document.getElementById("formSection");
let tableContent = document.getElementById("table-content");
let tableDiscount = document.getElementById("tableDiscount");
let discountInput = document.getElementById("discount-input");

let total = 0;
let FinalTotals = 0;
let discountInputText =null;

function render() {
  let realProducts = JSON.parse(localStorage.getItem("products_03")) || [];
  let carts = JSON.parse(localStorage.getItem("cart")) || [];
  let userLogin = JSON.parse(localStorage.getItem("user_login")) || [];
  let discountList = JSON.parse(localStorage.getItem("discount")) || [];
  total = 0;
  renderSection(userLogin);
  renderTableCart(carts, realProducts);
  renderDiscountSpace(discountList, total);
}
render();

function renderSection(user) {
  let stringHTML = "";
  if (user.length == 0) {
    console.log("hoho");
    stringHTML = `<p>You didn't log in. Please log in</p>
                    <a href="../../login.html">Log in</a>
        `;
  } else if (user) {
    //render section
    stringHTML = `
            <form onsubmit="submitForm(event)">
            <div class="section-contact-information">
                <div class="section-header">
                    <h2>Contact</h2>
                </div>
                <div class="section-content">
                    <div class="logged-in-customer">
                        <div class="customer-avatar">
                            <div class="customer-avatar-icon"></div>
                        </div>
                        <div class="customer-information_paragraph">
                            <span>${user.name}</span>
                            <span>${user.email}</span>
                            <br>
                            <a href="./profile.html">Log out</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section--shipping-address">
                <div class="section-header">
                    <h2>Delivery method</h2>
                </div>
                <div class="section-content">
                    <div class="content-box">
                        <div class="content-box__row">
                            <div class="radio-wrapper">
                                <input type="radio" name="checkoutDelivery" value="delivery-shipping" checked="checked">
                                <box-icon type='solid' name='truck'></box-icon>
                                <span>Ship to you</span>
                            </div>
                        </div>
                        <div class="content-box__row">
                            <div class="radio-wrapper">
                                <input type="radio" name="checkoutDelivery" value="delivery-pickup">
                                <box-icon name='store-alt'></box-icon>
                                <span>Store pick up(Free Shipping - Prepaid only)</span>
                            </div>
                        </div>
                    </div>
                    <div class="dropdown-address">
                        <div class="section-header">
                            <h2>Shipping address</h2>
                        </div>
                        <div class="section__content">
                            <div class="field__input">
                                <label for="">Saved addresses</label>
                                <select name="saved-address" id="" class="field_input_child">
                                    <option value="" selected>Choose your saved addresses</option>
                                </select>
                            </div>
                            <div class="field__input field_name">
                                <label for="">Name *</label>
                                <input type="text" name="name" id="" class="field_input_child" value="${user.name}">
                            </div>
                            <div class="field__input">
                                <input type="tel" name="phone" id="" placeholder="Phone Number" value="${user.phone}"  class="field_input_child">
                            </div>
                            <div class="field__input">
                                <input type="text" name="address" id="" placeholder="House or Unit Number / Street Name"  class="field_input_child">
                            </div>
                            <div class="field__input">
                                <select name="country" id="" class="field_input_child">
                                    <option value="VN" selected>Viet Nam</option>
                                    <option value="EN">England</option>
                                    <option value="US">USA</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section__footer">
            <button class="section-btn">
                <a href="./cart.html">Return to cart</a>
            </button>
            <button class="section-btn btn-submit" type="submit">Submit</button>
            </div>
        </form>
    `;
  }

  formSection.innerHTML = stringHTML;
}
function renderTableCart(cart, product) {
  let stringHTML = "";
  if (cart.length < 1) {
    stringHTML = "There are nothing here";
    cartWrapper.innerHTML = stringHTML;
  } else {
    for (let i in cart) {
      let productIndex = product.findIndex(
        (item) => item.id == cart[i].idProduct
      );
      stringHTML += `
            <tr class="product">
                <td class="product__image">
                    <div class="product-thumbnail">
                        <div class="product-thumbnail__wrapper">
                        <img
                            alt="982104-Black (1).jpg"
                            class="product-thumbnail__image"
                            src="${product[productIndex].image[0]}"
                        />
                        </div>
                        <span class="product-thumbnail__quantity" aria-hidden="true"
                        >${cart[i].quantityPrd}</span
                        >
                    </div>
                </td>
                <th class="product__description" scope="row">
                    <span class="product__description__name order-summary__emphasis"
                        >${product[productIndex].productRealName}</span
                    >
                    <span
                        class="product__description__variant order-summary__small-text"
                        >${product[productIndex].productColor} / ${
        product[productIndex].productSize
      }</span
                    >
                </th>
                <td class="product__price">
                <span class="order-summary__emphasis skeleton-while-loading"
                    >${product[productIndex].price * cart[i].quantityPrd}</span
                >
                </td>
            </tr>
            `;
      total += product[productIndex].price * cart[i].quantityPrd;
    }
  }
  tableContent.innerHTML = stringHTML;
}
function checkDiscount() {
  render();
}
function renderDiscountSpace(dsLists, totals) {
  FinalTotals = 0;
  let stringHTML = "";
  if (discountInput.value == "") {
    FinalTotals = totals + 100000;
    discountInputText=null;
    stringHTML = `
            <tr>
                <td>Subtotal</td>
                <td>${formatMoney(totals)}</td>
            </tr>
            <tr>
                <td>Discount</td>
                <td style="color: red;">None</td>
            </tr>
            <tr>
                <td>Shipping</td>
                <td>${formatMoney(100000)}</td> 
                <!-- shipping cal with country -->
            </tr>
            <tr class="total-tr">
                <td>Total</td>
                <td>${formatMoney(FinalTotals)}</td>
            </tr>
        `;
  } else {
    let discountIndex = dsLists.findIndex(
      (item) => item.codeDiscount == discountInput.value
    );
    if (discountIndex !== -1) {
      let Discount = 0;
      discountInputText = dsLists[discountIndex].codeDiscount;
      let minimunDiscount = 800000;
      if (total > minimunDiscount) {
        Discount = totals * (dsLists[discountIndex].valueDiscount / 100);
      } else {
        Discount = 0;
      }
      FinalTotals = totals + 100000 - Discount;
      //run discount
      stringHTML = `
            <tr>
                <td>Subtotal</td>
                <td>${formatMoney(totals)}</td>
            </tr>
            <tr>
                <td>Discount</td>
                <td>${dsLists[discountIndex].valueDiscount}%</td>
            </tr>
            <tr>
                <td>Shipping</td>
                <td>100k</td> 
                <!-- shipping cal with country -->
            </tr>
            <tr class="total-tr">
                <td>Total</td>
                <td>${formatMoney(FinalTotals)}</td>
            </tr>
        `;
    } else {
      FinalTotals = totals + 100000;
      discountInputText = null;
      stringHTML = `
            <tr>
                <td>Subtotal</td>
                <td>${formatMoney(totals)}</td>
            </tr>
            <tr>
                <td>Discount</td>
                <td style="color: red;">None</td>
            </tr>
            <tr>
                <td>Shipping</td>
                <td>100k</td> 
                <!-- shipping cal with country -->
            </tr>
            <tr class="total-tr">
                <td>Total</td>
                <td>${formatMoney(FinalTotals)}</td>
            </tr>
        `;
    }
  }
  tableDiscount.innerHTML = stringHTML;
}
function submitForm(e) {
  e.preventDefault();
  //push anything to local
  let bills = JSON.parse(localStorage.getItem("bills")) || [];
  let realProducts = JSON.parse(localStorage.getItem("products_03")) || [];
  let carts = JSON.parse(localStorage.getItem("cart")) || [];
  let userLogin = JSON.parse(localStorage.getItem("user_login")) || [];
  let id = 1;
  if (bills.length > 0) {
    id = bills[bills.length - 1].idBill + 1;
  }
  const formData = new FormData(e.target);
  const values = {};
  for (let [name, value] of formData.entries()) {
    values[name] = value;
  }
  let stringHTML="";
  //infor
  for (let i in carts){
    let productIndex = realProducts.findIndex(item=>item.id == carts[i].idProduct);
    stringHTML+= `${realProducts[productIndex].productCode},quantity:${carts[i].quantityPrd}, `
  }
  values.Infor = stringHTML;
  values.email = userLogin.email;
  values.idBill = id;
  values.total = FinalTotals;
  values.status = true;

  //total quantity
  values.totalQuantity =calNumberProduct(carts)
  if(discountInputText){
    values.discountCode = discountInputText;
  }
  else{
    values.discountCode = "None";
  }
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Buy it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Bought!",
        text: "Now go to home page.",
        icon: "success",
      });
      bills.push(values);
      localStorage.setItem("bills", JSON.stringify(bills));
      localStorage.removeItem("cart")
      window.location.href = "../../index.html";
    }
  });
}

//chuyển về tiền việt
function formatMoney(money) {
  return new Intl.NumberFormat(`vi-VN`, {
    style: `currency`,
    currency: `VND`,
  }).format(money);
}
function calNumberProduct(cartss){
  let count =0;
  for (let key in cartss) {
    count = count + cartss[key].quantityPrd;
  }
  return count;
}
