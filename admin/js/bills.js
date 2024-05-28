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
  const BILLS = "bills";
  
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
    let bill = JSON.parse(localStorage.getItem(BILLS)) || [];
    // console.log(realProducts);
     //Khởi tạo id bằng 1, nếu mảng category có ptu thì lấy dữ liệu ptu cuối +1
     let id = 1;
     //ktra xem có ptu hay ko
     if (bill.length>0){
       id = bill[bill.length -1].id+1;
     }
    //lọc theo search (vdu search sam thi hien spham samsung)
    bill = bill.filter((product) =>
      product.email.toLowerCase().includes(textSearch)
    );
    renderPaginations(bill);
    renderProducts(bill);
  }
  render();
  
  //đưa list products ra
  function renderProducts(billR) {
    let stringHTML = "";
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize;
    if (end > billR.length) {
      end = billR.length;
    }
    for (let i = start; i < end; i++) {
      stringHTML += `
                  <tr>
                      <td>${billR[i].idBill}</td>
                      <td>${billR[i].email}</td>
                      <td>${billR[i].Infor}</td>
                      <td>${billR[i].totalQuantity}</td>
                      <td>${billR[i].total}</td>
                      <td>${billR[i].status ? "Waited" : "Done"}</td>
                      <td>
                          <button onClick="initUpdate('${billR[i].idDiscount}')">Edit</button>
                          <button onClick="changeStatus(${i})">${
        billR[i].status ? "Done" : "Waited"
      }</button>
                      </td>
                  </tr>
              `;
    }
    tbodyHTML.innerHTML = stringHTML;
  }
  //điều chỉnh số lượng sản phẩm trong trang
  function renderPaginations(billR) {
    totalPage = Math.ceil(billR.length / pageSize);
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
    const bill = JSON.parse(localStorage.getItem(BILLS));
    const categoryFilter = bill.filter(item => item.email.toLowerCase().includes(textSearch));
  
    render(categoryFilter)
    
  }
  
  //chuyển trạng thái status
  function changeStatus(i) {

    const bill = JSON.parse(localStorage.getItem(BILLS));
    bill[i].status = !bill[i].status;
    localStorage.setItem(BILLS, JSON.stringify(bill));
    render();
  }
  
  //funtion check điều kiện
  function validateFields(product) {

    return check;
  }
  
  //Funtion update
  function initUpdate(id){
    idUpdate=id;
    let realProducts = JSON.parse(localStorage.getItem(BILLS)) || [];
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
    let realProducts = JSON.parse(localStorage.getItem(BILLS));
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
    let realProducts = JSON.parse(localStorage.getItem(BILLS));
    const product = getDataForm();


    let indexUpdate = realProducts.findIndex(item=>item.idDiscount ==idUpdate);

  
    realProducts[indexUpdate].codeDiscount = product.codeDiscount;
    realProducts[indexUpdate].valueDiscount = product.valueDiscount;

    localStorage.setItem(BILLS, JSON.stringify(realProducts))
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