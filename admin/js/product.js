// dropDownMenu
function dropDownList() {
  // document.getElementById("Linklist-3").classList.toggle("showMenu");
  document.getElementById("Linklist-1").classList.toggle("showMenu");
}

//check condition in input "Create Acount"
// let btnCancel = document.getElementsByClassName("cf-cancel");
// btnCancel.onclick = function(){
//   window.location = `./login.html`
// }
const formAddMainHTML = document.getElementById(`form-add`);
const imageProductHTML = document.getElementById(`image-product`);
const pageList = document.getElementById(`page-list`);
const tbodyHTML = document.getElementById(`tbody`);
const buttonSubmitForm = document.getElementById('submit-form');
const buttonUpdateForm = document.getElementById(`update-form`);
const searchEnter = document.getElementById(`search`);

let imageBase64 = null;
let imageBase64Arr =[];
const PRODUCTS = "products_03";

let selectCategory = document.getElementById("category");
let selectCategoryAdd = document.getElementById("nameAdd");
let CATEGORYS = "categorys";

let pageSize = 5;
let totalPage = 1;
let currentPage = 1;

let textSearch = "";
let categoryFilter = "All";

let action = "create";

let idUpdate = null;
let cfError = document.querySelectorAll(".cf-error");

//Call element from form
// const prdId = document.getElementById('id')
const prdName = document.getElementById('nameAdd');
const prdType = document.getElementById('productRealName');
const prdGender = document.getElementById('gender');
const prdCode = document.getElementById('productCode');
const prdSize = document.getElementById('productSize');
const prdColor = document.getElementById('productColor');
const price = document.getElementById('price');
const quantity = document.getElementById('quantity');
const description = document.getElementById('description');
function openForm() {
  formAddMainHTML.classList.remove(`hidden`);
  buttonSubmitForm.classList.remove('hidden');
  buttonUpdateForm.classList.add('hidden');
  imageProductHTML.classList.add('hidden');
  selectCategoryAdd.classList.remove("select-disabled");
  clearForm();
}
function closeForm() {
  formAddMainHTML.classList.add(`hidden`);
  selectCategoryAdd.classList.remove("select-disabled");
  clearForm();
}
function clearSearch() {
  searchEnter.value="";
}
function render() {
  let realProducts = JSON.parse(localStorage.getItem(PRODUCTS)) || [];
  // console.log(realProducts);
   //Khởi tạo id bằng 1, nếu mảng category có ptu thì lấy dữ liệu ptu cuối +1
   let id = 1;
   //ktra xem có ptu hay ko
   if (realProducts.length>0){
     id = realProducts[realProducts.length -1].id+1;
   }
  //lọc theo category
  if (categoryFilter !== "All") {
    realProducts = realProducts.filter(
      (product) => product.name === categoryFilter
    );
    // console.log(realProducts);
  }
  //lọc theo search (vdu search sam thi hien spham samsung)
  realProducts = realProducts.filter((product) =>
    product.name.toLowerCase().includes(textSearch)
  );
  renderPaginations(realProducts);
  renderProducts(realProducts);
}
render();

//đưa list products ra
function renderProducts(products) {
  let stringHTML = "";
  let start = (currentPage - 1) * pageSize;
  let end = start + pageSize;
  if (end > products.length) {
    end = products.length;
  }
  const categorys = JSON.parse(localStorage.getItem(CATEGORYS)) ||[];
  for (let i = start; i < end; i++) {
    //check status disable or available in category to show product
    let indexCategory = categorys.findIndex(item=> item.id == products[i].idCategory);
    if(indexCategory!==-1){
      products[i].name = categorys[indexCategory].name;
      stringHTML += `
                <tr>
                    <td>${products[i].id}</td>
                    <td>${products[i].productCode}</td>
                    <td>
                        <img width="52px" src="${products[i].image[0]}" alt="img">
                    </td>
                    <td>${products[i].name}</td>
                    <td>${products[i].gender}</td>
                    <td>${products[i].productRealName}</td>
                    <td>${products[i].productSize}</td>
                    <td>${products[i].productColor}</td>
                    <td>${products[i].quantity}</td>
                    <td>${formatMoney(products[i].price)}</td>
                    <td>${products[i].status ? "InStock" : "OutStock"}</td>
                    <td>${products[i].description}</td>
                    <td>
                        <button onClick="initUpdate('${products[i].id}')">Edit</button>
                        <button onClick="changeStatus(${i})">${
      products[i].status ? "OutStock" : "InStock"
    }</button>
                        <button onClick="deletePrd('${products[i].id}')">Delete</button>
                    </td>
                </tr>
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
//tăng số lượng product của 1 trang
function changePageSize(e) {
  pageSize = e.target.value;
  currentPage = 1; //đưa về trang 1
  render();
}
//hiện thay đổi theo cate
function changeCategory(e) {
  categoryFilter = e.target.value;
  currentPage = 1;
  render();
}

//check theo input và nút search
function changeTextSearch(e) {
  textSearch = document.getElementById("search").value.toLowerCase();
  e.preventDefault()
  // textSearch = e.target.value.toLowerCase();
  currentPage = 1;
  const products = JSON.parse(localStorage.getItem(PRODUCTS));
  const categoryFilter = products.filter(item => item.name.toLowerCase().includes(textSearch));

  render(categoryFilter)
  
}

//chuyển trạng thái status
function changeStatus(i) {
  const products = JSON.parse(localStorage.getItem(PRODUCTS));
  products[i].status = !products[i].status;
  localStorage.setItem(PRODUCTS, JSON.stringify(products));
  render();
}

function submitForm(e) {
  e.preventDefault();
  // preventDefault()

  const formData = new FormData(e.target);
  const values = {};
  for (let [name, value] of formData.entries()) {
    values[name] = value;
  }
  values.price = +values.price;
  values.quantity = +values.quantity;

  values.image = imageBase64Arr;

  

  //check dk form
  let check = validateFields(values);
  if (check) {
    const products = JSON.parse(localStorage.getItem(PRODUCTS)) || [];
    let id = 1;
    if (products.length > 0) {
      id = products[products.length - 1].id + 1;
    }
    values.id = id;
    //take id form categorys
    const categorys = JSON.parse(localStorage.getItem(CATEGORYS)) ||[];
    let indexCate = categorys.findIndex(item =>item.name ==values.name);
    values.idCategory = categorys[indexCate].id;

    values.status = true;
    values.stars = "";
    values.comments ="";

    products.push(values);
    localStorage.setItem(PRODUCTS, JSON.stringify(products));
    e.target.reset();
    imageProductHTML.src = "";
    imageBase64 = null;
    imageBase64Arr=[];
    closeForm();

    //sdung render lọc các sản phẩm để hiện lên màn hình
    render();
  }
}


function convertToBase64() {
  const fileInput = document.getElementById("input-image");
  const previewContainer = document.getElementById("image-product");
  previewContainer.innerHTML = ""; // Clear previous previews

  for (const file of fileInput.files) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = document.createElement("img");
      img.src = event.target.result;
      img.width = 100; // Set width of image preview
      img.classList.add("preview-img");
      previewContainer.appendChild(img);
      imageBase64 = img.src;
      imageBase64Arr.push(imageBase64);
    };

    reader.readAsDataURL(file);
  }

  previewContainer.classList.remove("hidden"); // Show the preview container
}
//funtion check điều kiện
function validateFields(product) {
  let realProducts = JSON.parse(localStorage.getItem(PRODUCTS)) || [];
  let check = true;
  let flagCode,flagRealName = true;
  let errorMessage = "";

  let indexCheck = realProducts.findIndex(item=>item.productCode==product.productCode);

  if (product.productCode.length < 1) {
    errorMessage = `Must not be blank`;
    cfError[0].innerHTML = errorMessage;
    flagCode= false;
  }else if(indexCheck !==-1){
    errorMessage = `Must not be duplicate`;
    cfError[0].innerHTML = errorMessage;
    flagCode= false;
  }else{
    flagCode= true;
  }
  if (product.productRealName.length < 1) {
    errorMessage = `Must not be blank`;
    cfError[1].innerHTML = errorMessage;
    flagRealName= false;
  }else{
    flagRealName= true;
  }
  if (flagCode == true && flagRealName ==true){
    return check;
  }else{
  }
}

//Funtion update
function initUpdate(id){
  idUpdate=id;
  let realProducts = JSON.parse(localStorage.getItem(PRODUCTS)) || [];
  // realProducts.findIndex(+id)
  // realProducts.id.findIndex(id)
  let index = getIndexById(id);

  selectCategoryAdd.classList.add("select-disabled");
  const categorys = JSON.parse(localStorage.getItem(CATEGORYS)) ||[];
  let indexCategory = categorys.findIndex(item=> item.id == realProducts[index].idCategory);

  // prdId.value = realProducts[index].id;
  prdName.value = categorys[indexCategory].name;
  prdGender.value = realProducts[index].gender
  prdType.value = realProducts[index].productRealName;
  prdSize.value = realProducts[index].productSize;
  prdColor.value = realProducts[index].productColor;
  prdCode.value = realProducts[index].productCode;
  price.value = realProducts[index].price;
  quantity.value = realProducts[index].quantity;
  description.value = realProducts[index].description;

  // imageProductHTML.file.src = realProducts[index].image[0];
  imageProductHTML.src = realProducts[index].image[0];

  imageProductHTML.classList.remove('hidden');
  formAddMainHTML.classList.remove(`hidden`);
  buttonUpdateForm.classList.remove(`hidden`);
  buttonSubmitForm.classList.add(`hidden`)

  imageProductHTML.innerHTML="";
  realProducts[index].image.forEach((imageSrc) => {
    const img = document.createElement("img");
    img.src = imageSrc;
    img.width = 100; // Set width of image preview
    imageProductHTML.appendChild(img);
  });
}


function getIndexById(id){
  let realProducts = JSON.parse(localStorage.getItem(PRODUCTS));
  return realProducts.findIndex(product=> product.id ==id);
}
function getDataForm(){
  return {
    // id: prdId.value,
    name: prdName.value,
    code: prdCode.value,
    gender: prdGender.value,
    realname: prdType.value,
    size: prdSize.value,
    color: prdColor.value,
    quantity: quantity.value,
    price: price.value,
    description: description.value,
  };
}
function clearForm(){
  prdCode.value="";
  prdName.value="";
  prdGender.value="";
  prdType.value="";
  prdColor.value="";
  quantity.value="";
  price.value="";
  description.value="";
  prdSize.value="XS";
  imageProductHTML.src="";
  for (let i in cfError){
    cfError[i].innerHTML="";
  }
}
function updateProduct(e){
  let realProducts = JSON.parse(localStorage.getItem(PRODUCTS));
  const product = getDataForm();
  // console.log(product);
  let indexUpdate = realProducts.findIndex(item=>item.id ==idUpdate);
  // console.log(indexUpdate);
  // debugger;
  //doesnt have name of category bc category name of product cant change
  realProducts[indexUpdate].name = product.name;
  realProducts[indexUpdate].productCode = product.code;
  realProducts[indexUpdate].gender = product.gender;
  realProducts[indexUpdate].productRealName = product.realname;
  realProducts[indexUpdate].productSize = product.size;
  realProducts[indexUpdate].productColor = product.color;
  realProducts[indexUpdate].quantity = product.quantity;
  realProducts[indexUpdate].description = product.description;
  realProducts[indexUpdate].price = +product.price;
  // realProducts[indexUpdate].image = product.image;
  console.log(product.name);
  console.log(realProducts[indexUpdate]);
  
  // localStorage.setItem(PRODUCTS, JSON.stringify(realProducts))
  const editInputImage = document.getElementById("input-image");
  const images =[];
  
  if (editInputImage.files.length > 0) {
    Array.from(editInputImage.files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = document.createElement("img");
        img.src = event.target.result;
        img.width = 300; // Set width of image preview
        // newImgContainer.appendChild(img);
        images.push(event.target.result);

        // When the last file is read, update the row
        if (index === editInputImage.files.length - 1) {
          realProducts[indexUpdate].image = images
          localStorage.setItem(PRODUCTS, JSON.stringify(realProducts))
          render()
        }
      };

      reader.readAsDataURL(file);
    });
  } else {
    // If no new images are selected, use the original images
    originalImages.forEach((imageSrc) => {
      const img = document.createElement("img");
      img.src = imageSrc;
      img.width = 300; // Set width of image preview
      // newImgContainer.appendChild(img);
      images.push(imageSrc);
    });
    realProducts[indexUpdate].image = images
    localStorage.setItem(PRODUCTS, JSON.stringify(realProducts))
    render()
  }
  closeForm();
  return;
}

function renderCategory(){
  const categorys = JSON.parse(localStorage.getItem(CATEGORYS)) ||[];
  let stringHTML =`<option value="All">Everything</option>`;
  for (let i = 0; i < categorys.length; i++) {
    if (categorys[i].status) {
      stringHTML += `
      <option value="${categorys[i].name}">${categorys[i].name}</option>
      `
    }
  }
  selectCategory.innerHTML = stringHTML;
}
renderCategory();
function renderCategoryAdd(){
  const categorys = JSON.parse(localStorage.getItem(CATEGORYS)) ||[];
  let stringHTML =``;
  for (let i = 0; i < categorys.length; i++) {
    if (categorys[i].status) {
      stringHTML += `
      <option value="${categorys[i].name}">${categorys[i].name}</option>
      `
    }
  }
  selectCategoryAdd.innerHTML = stringHTML;
}
renderCategoryAdd();

//delete
function deletePrd(id){
  let realProducts = JSON.parse(localStorage.getItem(PRODUCTS));

  let index = getIndexById(id);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "error",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      //Find index to 
      realProducts.splice(index,1);
      localStorage.setItem(PRODUCTS, JSON.stringify(realProducts));
      render();

      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error"
      });
    }
  });
}