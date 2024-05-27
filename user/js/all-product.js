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

let mainContent = document.getElementById("MainContent");
const tbodyHTML = document.getElementById(`product-item`);
const pageList = document.getElementById(`page-list`);
const notificationCart = document.querySelector(`.notification-cart`);
let PRODUCTS = "products_03";
let CATEGORYS = "categorys";

let pageSize = 8;
let totalPage = 1;
let currentPage = 1;
let categoryFilter = "All";
let sortBy = "All";
let textSearch = "";
const searchEnter = document.getElementById(`search`);
function render() {
  let realProducts = JSON.parse(localStorage.getItem(PRODUCTS)) || [];
  // console.log(realProducts);
  //Khởi tạo id bằng 1, nếu mảng category có ptu thì lấy dữ liệu ptu cuối +1
  let id = 1;
  //ktra xem có ptu hay ko
  if (realProducts.length > 0) {
    id = realProducts[realProducts.length - 1].id + 1;
  }
  if (sortBy == "aToZ") {
    realProducts = realProducts.sort(function (a, b) {
      var x = a.productRealName.toLowerCase();
      var y = b.productRealName.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
  } else if (sortBy == "zToA") {
    realProducts = realProducts.sort(function (a, b) {
      var x = a.productRealName.toLowerCase();
      var y = b.productRealName.toLowerCase();
      return x > y ? -1 : x < y ? 0 : 1;
    });
  } else if (sortBy == "price-ascending") {
    // realProducts = realProducts.price.sort();
    realProducts = realProducts.sort(function (a, b) {
      var x = a.price;
      var y = b.price;
      return x < y ? -1 : x > y ? 1 : 0;
    });
  } else if (sortBy == "price-descending") {
    // realProducts = realProducts.price.reverse();
    realProducts = realProducts.sort(function (a, b) {
      var x = a.price;
      var y = b.price;
      return x > y ? -1 : x < y ? 0 : 1;
    });
  }
  // //lọc theo gender
  // else if (sortBy !== "All") {
  //   realProducts = realProducts.filter((product) => product.gender === sortBy);
  // }
  //lọc theo search (vdu search sam thi hien spham samsung)
  realProducts = realProducts.filter((product) =>
  product.productRealName.toLowerCase().includes(textSearch)
  );

  renderPaginations(realProducts);
  renderProducts(realProducts);
}
render();
// /đưa list products ra
function renderProducts(products) {
  let stringHTML = "";
  let start = (currentPage - 1) * pageSize;
  let end = start + pageSize;
  if (end > products.length) {
    end = products.length;
  }
  const categorys = JSON.parse(localStorage.getItem(CATEGORYS)) || [];
  let carts = JSON.parse(localStorage.getItem("cart")) || [];
  for (let i = start; i < end; i++) {
    //check status disable or available in category to show product
    let indexCategory = categorys.findIndex(
      (item) => item.id == products[i].idCategory
    );
    if (indexCategory !== -1) {
      products[i].name = categorys[indexCategory].name;
      stringHTML += `
        <div class="grid__item grid-product small--one-half medium-up--one-quarter grid-product__has-quick-shop aos-init aos-animate">
            <div class="grid-product__content">
                <a href="#" class="wishlist-btn grid-wishlist-btn style_1">
                    <div style="display: initial;" class="wishlist_btn_icon">
                        <i class='bx bx-heart' ></i>
                    </div>
                </a>
                <a href="#" class="grid-product__link">
                    <div onclick="changeToProductInfor(${
                      products[i].id
                    })" class="grid-product__image-mask">
                        <div class="image-wrap loaded" style="height: 0; padding-bottom: 150%;">
                        <img src="${products[i].image[0]}" alt="">
                        </div>
                    </div>
                    <div class="grid-product__meta">
                        <div class="grid-product__title">${
                          products[i].productRealName
                        }</div>
                        <div class="grid-product__price">${formatMoney(
                          products[i].price
                        )}</div>
                        <button class="quick-product__btn js-modal-open-quick-modal-8121681051838 small--hide" onclick="addToCart(${products[i].id})">
                        <span class="quick-product__label">+ Add to cart</span>
                        </button>
                    </div>
                </a>
            </div>
        </div>
            `;
    }
  }
  notificationCart.innerHTML=`${calNumberProduct(carts)}`;
  tbodyHTML.innerHTML = stringHTML;
}
//điều chỉnh số lượng sản phẩm trong trang
function renderPaginations(products) {
  totalPage = Math.ceil(products.length / pageSize);
  let stringHTML = "";
  for (let i = 1; i <= totalPage; i++) {
    if (currentPage === i) {
      stringHTML += `
                <span class="page-item page-active" onClick="clickPage(${i})">${i}</span>
            `;
    } else {
      stringHTML += `
                <span class="page-item" onClick="clickPage(${i})">${i}</span>
            `;
    }
  }
  pageList.innerHTML = stringHTML;
}
//chuyển về tiền việt
function formatMoney(money) {
  return new Intl.NumberFormat(`vi-VN`, {
    style: `currency`,
    currency: `VND`,
  }).format(money);
}
//click vào page mong muốn để hiển sản phẩm
function clickPage(i) {
  currentPage = i;
  render();
}

//click chuyển trang trái phải
function changePage(status) {
  if (status === -1 && currentPage > 1) {
    currentPage -= 1;
  }
  if (status === 1 && currentPage < totalPage) {
    currentPage += 1;
  }
  render();
}
function changeToProductInfor(id) {
  //bring product infor to local and go to product page
  let realProducts = JSON.parse(localStorage.getItem(PRODUCTS)) || [];
  let productsIndex = realProducts.findIndex((item) => item.id === id);
  let productObject = {};
  productObject = realProducts[productsIndex];
  localStorage.setItem("product_infor", JSON.stringify(productObject));
  window.location.href = "./product.html";
}
let FillterDrawer = document.getElementById("FillterDrawer");
function closeFilterSide() {
  FillterDrawer.style.left = "-700px";
  FillterDrawer.style.transition = "all 1s";
}
let FilterDrawerTrigger = document.getElementById("FilterDrawerTrigger");
FilterDrawerTrigger.addEventListener("click", function () {
  FillterDrawer.style.left = "-350px";
  FillterDrawer.style.transition = "all 1s";
});
// filter price
let minValue = document.getElementById("min-value");
let maxValue = document.getElementById("max-value");

const rangeFill = document.querySelector(".range-fill");

// Function to validate range and update the fill color on slider
function validateRange(products) {
  let minPrice = document.getElementById("min-price-value").value;
  let maxPrice = document.getElementById("max-price-value").value;

  const minPercentage = (minPrice / 1000000) * 100;
  const maxPercentage = ((maxPrice - 10) / 1000000) * 100;

  rangeFill.style.left = minPercentage + "%";
  rangeFill.style.width = maxPercentage - minPercentage + "%";
  // console.log(minPrice,maxPrice);
  minValue.innerHTML = minPrice + "đ";
  maxValue.innerHTML = maxPrice + "đ";
  let realProducts = JSON.parse(localStorage.getItem(PRODUCTS)) || [];
  realProducts = realProducts.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );
  renderProducts(realProducts);
}

const inputElements = document.querySelectorAll(".input-rage");

// Add an event listener to each input element
inputElements.forEach((element) => {
  element.addEventListener("input", validateRange);
});

// Initial call to validateRange
validateRange();

//hiện thay đổi theo cate
function changeCategory(e) {
  // console.log(e.target.value);
  sortBy = e.target.value;
  currentPage = 1;
  render();
}

function clearSearch() {
  searchEnter.value = "";
}
//check theo input và nút search
function changeTextSearch(e) {
  e.preventDefault();
  textSearch = document.getElementById("search").value.toLowerCase();
  currentPage = 1;
  let realProducts = JSON.parse(localStorage.getItem(PRODUCTS)) || [];
  const sortBy = realProducts.filter((item) =>
    item.productRealName.toLowerCase().includes(textSearch)
  );
  render(sortBy);
}
//add to cart
function addToCart(id){
  let carts = JSON.parse(localStorage.getItem("cart")) || [];
  let cart = {};
  let check = carts.findIndex((item) => item.idProduct == id);
  if (check !== -1) {
    carts[check].quantityPrd = carts[check].quantityPrd + 1;
    localStorage.setItem("cart", JSON.stringify(carts));
    notificationCart.innerHTML=`${calNumberProduct(carts)}`;
  } else {
    cart.idProduct = id;
    cart.quantityPrd = 1;
    carts.push(cart);
    localStorage.setItem("cart", JSON.stringify(carts));
    notificationCart.innerHTML=`${calNumberProduct(carts)}`;
  }
}
function calNumberProduct(cartss){
  let count =0;
  for (let key in cartss) {
    count = count + cartss[key].quantityPrd;
  }
  return count;
}