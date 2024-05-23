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

let form = document.getElementById("CustomerRegisterForm");
let cfError = document.querySelectorAll(".cf-error");
console.log(cfError);
let emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

form.onsubmit = function (e) {
  e.preventDefault();
  let firstname = form.firstname.value;
  let lastname = form.lastname.value;
  let usermail = form.usermail.value;
  let userphone = form.userphone.value;
  let userdate = form.userdate.value;
  let userpass = form.password.value;
  let userpasscheck = form.passwordcheck.value;
  let gender = form.gender.value;

  let errorMessage = "";
  console.log("da vao roi");
  //Check blank
  if (!firstname) {
    errorMessage = `<li>Must not be blank</li>`;
    cfError[0].innerHTML = errorMessage;
  } else if (firstname.length < 2) {
    errorMessage = `<li>First name must be more than 1 character</li>`;
    cfError[0].innerHTML = errorMessage;
  } else {
    cfError[0].innerHTML = "";
  }

  if (!lastname) {
    errorMessage = `<li>Must not be blank</li>`;
    cfError[1].innerHTML = errorMessage;
  } else if (lastname.length < 2) {
    errorMessage = `<li>First name must be more than 1 character</li>`;
    cfError[1].innerHTML = errorMessage;
  } else {
    cfError[1].innerHTML = "";
  }

  if (!usermail) {
    errorMessage = `<li>Must not be blank</li>`;
    cfError[2].innerHTML = errorMessage;
  } else if (!emailRegex.test(usermail)) {
    errorMessage = `<li>Please provide a valid email address</li>`;
    cfError[2].innerHTML = errorMessage;
  } else {
    cfError[2].innerHTML = "";
  }
  if (!userpass) {
    errorMessage = `<li>Must not be blank</li>`;
    cfError[3].innerHTML = errorMessage;
  } else if (userpass.length < 6) {
    errorMessage = `<li>First name must be more than 6 character</li>`;
    cfError[3].innerHTML = errorMessage;
  } else {
    cfError[3].innerHTML = "";
  }
  if (userpasscheck != userpass) {
    errorMessage = `<li>Must not be different form password</li>`;
    cfError[4].innerHTML = errorMessage;
  } else {
    cfError[4].innerHTML = "";
  }
  if (!userphone) {
    errorMessage = `<li>Must not be blank</li>`;
    cfError[5].innerHTML = errorMessage;
  } else {
    cfError[5].innerHTML = "";
  }
  if (!userdate) {
    errorMessage = `
    <li>Must not be blank</li>
    <li>
      Minimum age requirement to register is 13 years old.
    </li>
    <li>
      Maximum age requirement to register is 80 years old.
    </li>
    `;
    cfError[6].innerHTML = errorMessage;
  } else {
    cfError[6].innerHTML = "";
  }

  let userList = JSON.parse(localStorage.getItem("userList")) || [];
  //up len local storage
  if (
    emailRegex.test(usermail) &&
    firstname &&
    lastname &&
    userphone &&
    userdate &&
    userpasscheck === userpass
  ) {
    let user = userList.find(function (el, i) {
      return el.email === usermail;
    });
    if (!user) {
      let id = 1;
      let status = true;
      let role = "user";
      if (userList.length > 0) {
        id = userList[userList.length - 1].id + 1;
      }
      let newUser = {
        id,
        name: firstname + " " + lastname,
        email: usermail,
        password: userpass,
        gender: gender,
        dateofBirth: userdate,
        phone: userphone,
        status: status,
        role: role,
      };
      userList.push(newUser);
      localStorage.setItem("userList", JSON.stringify(userList));

      //Su dung swal để hiện thông báo
      Swal.fire({
        title: "Đăng ký thành công",
        text: "Chúc mừng bạn đã trở thành thành viên của chúng tôi",
        icon: "success",
      }).then(function () {
        window.location.href = "../../login.html";
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "There already have an acount",
      });
    }
  }
};
