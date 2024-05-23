//b1 click nut add de mo form
const btnAdd = document.getElementById('btn-add');
const btnSubmit = document.getElementById(`btn-submit`)
const form = document.getElementById(`form-scope`);
const errorName = document.getElementById(`error-name`);
const tableBody = document.getElementById(`tbody`);

const CATEGORY_LOCAL ="categorys";
let idUpdate = null;

btnAdd.addEventListener('click',function(){
  form.classList.remove('hidden');
})

//b2: nhập tất cả các trường
const categoryName = document.getElementById('name');
//b3 add click để submit form
function submitForm(event){
  event.preventDefault();
  //check xem update hay create
  if (idUpdate) {
    //logic
    const categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL))||[];
      //ktra xem name có bị rỗng ko
    if (categoryName.value.length<2) {
      errorName.innerText ="Name <2 :')";
      return
    }
    else{
      errorName.innerText ="";
    }
    
    //kiểm tra tên đã có hay chưa
    const index = categorys.findIndex(item => item.name ===categoryName.value);
    if (index !== -1) {
      errorName.innerText = "Name duplicate";
      return
    }
    else{
      errorName.innerText="";
    };

    const indexUpdate = categorys.findIndex(item=>item.id ==idUpdate);
    categorys[indexUpdate].name = categoryName.value;
    localStorage.setItem(CATEGORY_LOCAL, JSON.stringify(categorys));
    closeForm();
    idUpdate=null;
    render();
    return;
  }


  //Khởi tạo id bằng 1, nếu mảng category có ptu thì lấy dữ liệu ptu cuối +1
  let id = 1;
  //Lấy category từ local về và ktra xem có ptu chưa
  const categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL))||[]
  //ktra xem có ptu hay ko
  if (categorys.length>0){
    id = categorys[categorys.length -1].id+1;
  }

  //ktra xem name có bị rỗng ko
  if (categoryName.value.length<2) {
    errorName.innerText ="Name <2 :')";
    return
  }
  else{
    errorName.innerText ="";
  }

  //kiểm tra tên đã có hay chưa
  const index = categorys.findIndex(item => item.name ===categoryName.value);
  if (index !== -1) {
    errorName.innerText = "Name duplicate";
    return
  }
  else{
    errorName.innerText="";
  };

  const category ={
    id,
    name: categoryName.value,
    status: true,
  };
  //thêm vào mảng
  categorys.push(category);
  //lưu lên localStorage
  localStorage.setItem("categorys",JSON.stringify(categorys));

  //xoá form
  categoryName.value="";
  //ẩn form
  form.classList.add(`hidden`);

  //thêm
  render();
}

//render hiển thị ra
function render(data){
  let categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL))||[];

  if (Array.isArray(data)) {
    categorys = data;
  }
  let stringHTML = ``;

  for (let i = 0; i < categorys.length; i++) {
    stringHTML +=
      `
      <tr>
        <td>${categorys[i].id}</td>
        <td>${categorys[i].name}</td>
        <td>${categorys[i].status ? "Active" : "Block"}</td>
        <td>
          <button onclick="initUpdate(${categorys[i].id})">Update</button>
          <button onclick="changeStatus(${i})">
            ${categorys[i].status ? "Block" : "Active"}
          </button>
          <button onclick="deleteCategory(${categorys[i].id})">Delete</button>
        </td>
      </tr>
      `
    
  }
  tableBody.innerHTML = stringHTML;
}
render();

function deleteCategory(id){
  //b0: xác nhận xem có muốn xoá ko
  const result = confirm(`Are you sure delete category id: ${id} ?`);
  if (!result) {
    return;
  }
  //B1 lấy data về
  const categorys =JSON.parse(localStorage.getItem(CATEGORY_LOCAL));
  //B2: tìm vị trí
  const index = categorys.findIndex(item => item.id == id);
  ///b3: xoas
  categorys.splice(index,1);
  //b4: lưu
  localStorage.setItem(CATEGORY_LOCAL, JSON.stringify(categorys));
  //b5: render
  render();
}
function closeForm(){
  form.classList.add('hidden');
  categoryName.value="";
  errorName.innerText ="";
  btnSubmit.innerText="Add";
  idUpdate = null;
}


//Update
function initUpdate(id){
  idUpdate = id;
  const categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL))||[];
  const index = categorys.findIndex(item => item.id ===id);

  categoryName.value = categorys[index].name;
  form.classList.remove("hidden");
  btnSubmit.innerText="Update"
}
function changeStatus(id){
  //Tìm vị trí
  const categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL))
  const index = categorys.findIndex(item => item.id === id)
  // cập nhật giá trị
  categorys[index].status = !categorys[index].status
  // lưu
  localStorage.setItem(CATEGORY_LOCAL, JSON.stringify(categorys))
  // render
  render()

}

function changeTextSearch(){
  const textSearch = document.getElementById("text-search").value.toLowerCase();

  const categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL))||[];
  console.log(categorys);
  const categoryFilter = categorys.filter(item => item.name.toLowerCase().includes(textSearch));
  console.log(categoryFilter);
  render(categoryFilter)
}