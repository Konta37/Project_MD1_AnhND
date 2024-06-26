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


  const pageList = document.getElementById(`page-list`);
  const tbodyHTML = document.getElementById(`tbody`);
  const buttonSubmitForm = document.getElementById('submit-form');
  const buttonUpdateForm = document.getElementById(`update-form`);
  const searchEnter = document.getElementById(`search`);
  
  let imageBase64 = null;
  const DISCOUNT = "discount";
  
  let pageSize = 5;
  let totalPage = 1;
  let currentPage = 1;
  
  let textSearch = "";
  let categoryFilter = "All";
  
  let action = "create";
  
  let idUpdate = null;
  
  //Call element from form
  // const prdId = document.getElementById('id')
  const DsCode = document.getElementById('codeDiscount');
  const DsValue = document.getElementById('valueDiscount');
  function openForm() {
    formAddMainHTML.classList.remove(`hidden`);
    buttonSubmitForm.classList.remove('hidden');
    buttonUpdateForm.classList.add('hidden');
    // imgProducthiddenHTML.classList.add('hidden')
    clearForm();
  }
  function closeForm() {
    formAddMainHTML.classList.add(`hidden`);
    clearForm();
  }
  function clearSearch() {
    searchEnter.value="";
  }
  function render() {
    let discountList = JSON.parse(localStorage.getItem(DISCOUNT)) || [];
    // console.log(realProducts);
     //Khởi tạo id bằng 1, nếu mảng category có ptu thì lấy dữ liệu ptu cuối +1
     let id = 1;
     //ktra xem có ptu hay ko
     if (discountList.length>0){
       id = discountList[discountList.length -1].id+1;
     }
    //lọc theo search (vdu search sam thi hien spham samsung)
    discountList = discountList.filter((product) =>
      product.codeDiscount.toLowerCase().includes(textSearch)
    );
    renderPaginations(discountList);
    renderProducts(discountList);
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
    for (let i = start; i < end; i++) {
      stringHTML += `
                  <tr>
                      <td>${products[i].idDiscount}</td>
                      <td>${products[i].codeDiscount}</td>
                      <td>${products[i].valueDiscount}</td>
                      <td>${products[i].status ? "Available" : "Disable"}</td>
                      <td>
                          <button onClick="initUpdate('${products[i].idDiscount}')">Edit</button>
                          <button onClick="changeStatus(${i})">${
        products[i].status ? "Disable" : "Available"
      }</button>
                      </td>
                  </tr>
              `;
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
//   function formatMoney(money) {
//     return new Intl.NumberFormat(`vi-VN`, {
//       style: `currency`,
//       currency: `VND`,
//     }).format(money);
//   }
  
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
    const products = JSON.parse(localStorage.getItem(DISCOUNT));
    const categoryFilter = products.filter(item => item.name.toLowerCase().includes(textSearch));
  
    render(categoryFilter)
    
  }
  
  //chuyển trạng thái status
  function changeStatus(i) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "It will change status of products.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, do it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        //Find index to 
        const products = JSON.parse(localStorage.getItem(DISCOUNT));
        products[i].status = !products[i].status;
        localStorage.setItem(DISCOUNT, JSON.stringify(products));
        render();
  
        swalWithBootstrapButtons.fire({
          title: "Disable!",
          text: "Your file has been disable.",
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
  
  function submitForm(e) {
    e.preventDefault();
    // preventDefault()
  
    const formData = new FormData(e.target);
    const values = {};
    for (let [name, value] of formData.entries()) {
      values[name] = value;
    }
    values.valueDiscount = +values.valueDiscount;
    
    // values.price = +values.price;
    // values.quantity = +values.quantity;
  
    // values.image = imageBase64;
  
    
  
    //check dk form
    let check = validateFields(values);
    if (check) {
      const products = JSON.parse(localStorage.getItem(DISCOUNT)) || [];
      let id = 1;
      if (products.length > 0) {
        id = products[products.length - 1].idDiscount + 1;
      }
      values.idDiscount = id;
      values.status = true;
      products.push(values);
      localStorage.setItem(DISCOUNT, JSON.stringify(products));
      e.target.reset();
      closeForm();
  
      //sdung render lọc các sản phẩm để hiện lên màn hình
      render();
    }
  }
  
//   //đưa ảnh vào form
//   function convertToBase64() {
//     //khởi tạo biến lấy id inputimage
//     const fileInput = document.getElementById(`input-image`);
//     //trường hợp có nhiều ảnh thì lấy ảnh đầu tiên
//     //Muốn có chọn nhiều ảnh thì thêm multi ở bên input image
//     const file = fileInput.files[0];
  
//     //đọc file
//     const reader = new FileReader();
//     reader.onload = function (event) {
//       const base64 = event.target.result;
//       imageBase64 = base64;
//       imageProductHTML.src = imageBase64;
//     };
  
//     reader.readAsDataURL(file);
//     //kết thúc đọc file
//     imgProducthiddenHTML.classList.remove(`hidden`);
//   }
//   function showToast(message) {
//     toastifyHTML.classList.toggle(`hidden`);
//     toastifyMessageHTML.innerHTML = message;
//     const idTimeout = setTimeout(function () {
//       toastifyHTML.classList.toggle(`hidden`);
//       toastifyMessageHTML.innerHTML = "";
//       clearTimeout(idTimeout);
//     }, 2000);
//   }
  //funtion check điều kiện
  function validateFields(product) {

    return check;
  }
  
  //Funtion update
  function initUpdate(id){
    idUpdate=id;
    let realProducts = JSON.parse(localStorage.getItem(DISCOUNT)) || [];
    // realProducts.findIndex(+id)
    // realProducts.id.findIndex(id)
    let index = getIndexById(id)
  
    // prdId.value = realProducts[index].id;

    DsCode.value = realProducts[index].codeDiscount;
    DsValue.value = realProducts[index].valueDiscount;

    // imageProductHTML.classList.remove('hidden');
    formAddMainHTML.classList.remove(`hidden`);
    buttonUpdateForm.classList.remove(`hidden`);
    buttonSubmitForm.classList.add(`hidden`)
  
    //B1: ấy thông tin sản phẩm từ id
    // let index = products.findIndex(product => product.id === id)
  
    // //B2: Hiển thị dữ liệu cần cập nhật lên form
    // productID.value = products[index].id;
    // ...
    //B3: đổi button add thành update
    //btn
    //B4: không cho phép sửa mã sản phẩm(id)
    //B5: chuyển sang update
  }
  
  
  function getIndexById(id){
    let realProducts = JSON.parse(localStorage.getItem(DISCOUNT));
    return realProducts.findIndex(product=> product.idDiscount ==id);
  }
  function getDataForm(){
    // console.log(imgProducthiddenHTML.src);
    return {
      // id: prdId.value,
      codeDiscount: DsCode.value,
      valueDiscount: +DsValue.value
    };
  }
  function clearForm(){
    DsCode.value="";
    DsValue.value="";
  }
  function updateProduct(e){
    let realProducts = JSON.parse(localStorage.getItem(DISCOUNT));
    const product = getDataForm();


    let indexUpdate = realProducts.findIndex(item=>item.idDiscount ==idUpdate);

  
    realProducts[indexUpdate].codeDiscount = product.codeDiscount;
    realProducts[indexUpdate].valueDiscount = product.valueDiscount;

    localStorage.setItem(DISCOUNT, JSON.stringify(realProducts))
    render();
    closeForm();
    return;
  }

  // check profileChange
  function profileChange(){
    let userLogin = JSON.parse(localStorage.getItem("user_login")) ||[];
    if (!userLogin) {
      window.location.href ="../../login.html";
    }
    else{
      window.location.href ="../../user/pages/profile.html";
    }
  }