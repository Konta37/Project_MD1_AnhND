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
let PRODUCTS = "products_03";
let CATEGORYS = "categorys";

let pageSize = 8;
let totalPage = 1;
let currentPage = 1;
let categoryFilter = "All";
function render() {
  let realProducts = JSON.parse(localStorage.getItem(PRODUCTS)) || [];
  // console.log(realProducts);
  //Khởi tạo id bằng 1, nếu mảng category có ptu thì lấy dữ liệu ptu cuối +1
  let id = 1;
  //ktra xem có ptu hay ko
  if (realProducts.length > 0) {
    id = realProducts[realProducts.length - 1].id + 1;
  }
  //lọc theo category
  if (categoryFilter !== "All") {
    realProducts = realProducts.filter(
      (product) => product.name === categoryFilter
    );
    // console.log(realProducts);
  }

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
                    <div onclick="changeToProductInfor(${products[i].id})" class="grid-product__image-mask">
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
                        <button class="quick-product__btn js-modal-open-quick-modal-8121681051838 small--hide">
                        <span class="quick-product__label">+ Add to cart</span>
                        </button>
                    </div>
                </a>
            </div>
        </div>
            `;
    }
  }
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
function changeToProductInfor(id){
    
}
//   <div class="grid__item grid-product small--one-half medium-up--one-quarter grid-product__has-quick-shop aos-init aos-animate">
//                         <div class="grid-product__content">
//                           <a href="#" class="wishlist-btn grid-wishlist-btn style_1">
//                             <div style="display: initial;" class="wishlist_btn_icon">
//                               <i class='bx bx-heart' ></i>
//                             </div>
//                           </a>
//                           <a href="#" class="grid-product__link">
//                             <div class="grid-product__image-mask">
//                               <div class="image-wrap loaded" style="height: 0; padding-bottom: 150%;">
//                                 <img src="../../Public/image/Collection/Men/981378-Light_Peach_1.webp" alt="">
//                               </div>
//                             </div>
//                             <div class="grid-product__meta">
//                               <div class="grid-product__title">Spike Dynamics Regular Fit Graphic T-Shirt</div>
//                               <div class="grid-product__price">350.000đ</div>
//                               <button class="quick-product__btn js-modal-open-quick-modal-8121681051838 small--hide">
//                                 <span class="quick-product__label">+ Add to cart</span>
//                               </button>
//                             </div>
//                           </a>
//                         </div>
//                       </div>