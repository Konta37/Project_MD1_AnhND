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
let btn = document.getElementById("login-sign-in-submit");
let form = document.getElementById("customer_login");

form.onsubmit = function(e){
  e.preventDefault();

  let userList = JSON.parse(localStorage.getItem("userList")) || [];
  let email = form.useremail.value;
  let password = form.password.value;
  console.log(form.useremail.value,form.password.value);

  if(email==="admin@gmail.com" && password ==="admin"){
    window.location.href = "./admin/pages/dashboard.html"
    return;
  }

  const userForm ={
    email: email,
    password:password,
  }

  const userFind =userList.find(item => item.email === userForm.email && item.password ===userForm.password)
  let userIdIndex = userList.findIndex(item=>item.email===userForm.email);
  // console.log(user);
  if(!userFind){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Your account had been lock! Please call police to open",
    });
    return;
  }
  if(userList[userIdIndex].status === true){
    window.location.href = "./index.html";
    //lưu thông tin lên local
    localStorage.setItem("user_login", JSON.stringify(userFind));
  }
  else{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Your account had been lock! Please call police to open",
    });
    return;
  }
  //tìm thấy
  //chuyển trang
}
let checkMenu = document.getElementById("check");
let btnMenu = document.getElementById("btnMenu");
btnMenu.onclick = function openMenu(){
  if (checkMenu.checked ==true) {
    checkMenu.checked = false;
  }
  else{
    checkMenu.checked = true;
  }

}
