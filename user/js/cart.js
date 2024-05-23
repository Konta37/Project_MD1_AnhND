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