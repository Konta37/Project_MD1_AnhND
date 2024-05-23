
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
  
  
const statusHTML = document.getElementById("status")
const icon = document.getElementById("icon")
const btnAuth = document.getElementById("btn-auth")

function render() {
    const userLogin = JSON.parse(localStorage.getItem("user_login")) || {}

    if (userLogin.id) {
        icon.innerHTML = userLogin.email
        statusHTML.innerHTML = "đã"
        btnAuth.innerHTML = `<button onclick="logout()">Logout</button>`
    } else {
        icon.innerHTML = "icon"
        statusHTML.innerHTML = "chưa"
        btnAuth.innerHTML = `<button onclick="login()">Login</button>`
    }
}
render()

function logout() {
    localStorage.removeItem("user_login")
    window.location.href = "../../login.html";
    render()
}

function login() {
    window.location.href = "../../login.html"
}
  