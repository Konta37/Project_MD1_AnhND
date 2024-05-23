var swiper2 = new Swiper(".mySwiper2", {
  direction: "vertical",
  scrollbar: {
    el: ".swiper-scrollbar",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  // autoplay: {
  //   delay: 3000,
  //   disableOnInteraction: false,
  // },
  mousewheel: true,
});
var swiper3 = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

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

//change selected menu
function activeBody() {
  const changeGenderPage =
    document.getElementsByClassName(`mobile-gender__item`);
  console.log(changeGenderPage);
  for (const item of changeGenderPage) {
    item.classList.toggle("active");
  }
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

let profile = document.getElementById("profile");

function profileChange(){
  let userLogin = JSON.parse(localStorage.getItem("user_login")) ||[];
  if (!userLogin) {
    window.location.href ="./login.html";
  }
  else{
    window.location.href ="./user/pages/profile.html";
  }
}

function find(){
  let userList = JSON.parse(localStorage.getItem("userList")) || [];
  let admin = {
    id: 1,
    name: "admin",
    email: "admin@gmail.com",
    password: "admin",
    role: "admin",
    status: true,
  }
  let admins =[];
  admins.push(admin);
  // console.log(userList.findIndex(item=>item.email === email.value));
  let userIdIndex = userList.findIndex(item=>item.email===admin.email);
  if (userIdIndex<0){
    localStorage.setItem("userList", JSON.stringify(admins));
  }else{

  }
}
find();