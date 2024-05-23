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

const pageList = document.getElementById(`page-list`);
const tbodyHTML = document.getElementById(`tbody`);
const searchEnter = document.getElementById(`search`);

let imageBase64 = null;
const PRODUCTS = "userList";

let pageSize = 5;
let totalPage = 1;
let currentPage = 1;

let textSearch = "";
let sortBy = "All";

let action = "create";

function openForm() {
  formAddMainHTML.classList.remove(`hidden`);
}
function closeForm() {
  formAddMainHTML.classList.add(`hidden`);
}
function render() {
  let userLists = JSON.parse(localStorage.getItem(PRODUCTS)) || [];

  if (sortBy == "aToZ") {
    userLists= userLists.sort(function(a,b){
      var x =a.name.toLowerCase();
      var y =b.name.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    })
  }
  else if(sortBy=="zToA"){
    userLists= userLists.sort(function(a,b){
      var x =a.name.toLowerCase();
      var y =b.name.toLowerCase();
      return x > y ? -1 : x < y ? 0 : 1;
    })
  }
  else if(sortBy =="STTAscending"){
    userLists = userLists.sort();
  }
  else if(sortBy =="STTDescending"){
    userLists = userLists.reverse();
  }
  //lọc theo gender
  else if (sortBy !== "All") {
    userLists = userLists.filter(
      (product) => product.gender === sortBy
    );
  }
  //lọc theo search (vdu search sam thi hien spham samsung)
  userLists = userLists.filter((user) =>
    user.email.toLowerCase().includes(textSearch)
  );

  renderPaginations(userLists);
  renderProducts(userLists);
}
render();

//đưa list products ra
function renderProducts(user) {
  let stringHTML = "";
  let start = (currentPage - 1) * pageSize;
  let end = start + pageSize;
  if (end > user.length) {
    end = user.length;
  }
  for (let i = start; i < end; i++) {
    if (user[i].email=="admin@gmail.com"){
      stringHTML += `
                  <tr>
                      <td>${user[i].id}</td>
                      <td>${user[i].name}</td>
                      <td>${user[i].email}</td>
                      <td>xxxxxxxxxxxx</td>
                      <td>xxxxxxxxxxxx</td>
                      <td>xxxxxxxxxxxx</td>
                      <td>${user[i].status}</td>
                      <td>Can't do anything</td>
                  </tr>
              `;
    } else{
      let index = getIndexById(user[i].id)
      stringHTML += `
                  <tr>
                      <td>${user[i].id}</td>
                      <td>${user[i].name}</td>
                      <td>${user[i].email}</td>
                      <td>${user[i].phone}</td>
                      <td>${user[i].gender}</td>
                      <td>${user[i].dateofBirth}</td>
                      <td>${user[i].status}</td>
                      <td>
                      <button onClick="changeStatus(${index})" class="btn-status">${
                        user[i].status ? "Block" : "Active"
                    }</button>
                      </td>
                  </tr>
              `;
    }
  }
  tbodyHTML.innerHTML = stringHTML;
}
//điều chỉnh số lượng sản phẩm trong trang
function renderPaginations(userLists) {
  totalPage = Math.ceil(userLists.length / pageSize);
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
  // console.log(e.target.value);
  sortBy = e.target.value;
  currentPage = 1;
  render();
}

//check theo input và nút search
function changeTextSearch(e) {
  e.preventDefault()
  textSearch = document.getElementById("search").value.toLowerCase();
  currentPage = 1;
  const userLists = JSON.parse(localStorage.getItem(PRODUCTS));
  const sortBy = userLists.filter(item => item.name.toLowerCase().includes(textSearch));
  render(sortBy)
}

//chuyển trạng thái status
function changeStatus(i) {
  const userLists = JSON.parse(localStorage.getItem(PRODUCTS));
  userLists[i].status = !userLists[i].status;
  localStorage.setItem(PRODUCTS, JSON.stringify(userLists));
  render();
}
function clearSearch(){
  searchEnter.value="";
}


function getIndexById(id) {
  let userLists = JSON.parse(localStorage.getItem(PRODUCTS));
  return userLists.findIndex((user) => user.id == id);
}
function profileChange(){
  let userLogin = JSON.parse(localStorage.getItem("user_login")) ||[];
  if (!userLogin) {
    window.location.href ="../../login.html";
  }
  else{
    window.location.href ="../../user/pages/profile.html";
  }
}
