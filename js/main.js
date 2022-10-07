let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let categroy = document.getElementById("categroy");
let description = document.getElementById("description");
let sumbit = document.getElementById("sumbit");
let tableBody = document.getElementById("tableBody");
let btnDeleteAll = document.getElementById("deleteAll");
let btnUpdate = document.getElementById("addUpdate");
let searchinput = document.getElementById("search");

let productList = [];
let copyIndex ;

//Get Data In LocalStorage
if(localStorage.getItem("productData") != null){
    productList = JSON.parse(localStorage.getItem("productData"));
    showProduct(productList);
}else{
    productList = [];
}

//Get Total
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#02C39A"
    }else{
        total.innerHTML = "0";
        total.style.background = "#A83B10"
    }
};

//Create Product
sumbit.onclick = function(){
    let newProduct = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        categroy:categroy.value,
        desc:description.value
    };
    if(title.value.length > 1
        && price.value != ''
        && categroy.value != ''
        && description.value != ''
        && newProduct.count < 101)
        {
            //Add Product Number Count
            if(newProduct.count > 1){
                for(let i=0; i < newProduct.count; i++){
                    productList.push(newProduct);
                    clearInputs()
                };
            }else{
                productList.push(newProduct);
                clearInputs()
            };
        }else{
            clearInputs()
        }
    //Save Localstorge
    localStorage.setItem("productData", JSON.stringify(productList));
    showProduct(productList);
    // console.log(newProduct);
    // console.log(productList);
};

//Clear Input
function clearInputs(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '0';
    count.value = '';
    categroy.value = '';
    description.value = '';
    total.style.background = "#A83B10"
};

//Delete
function deleteproduct(i){
    productList.splice(i,1);
    localStorage.setItem("productData", JSON.stringify(productList));
    showProduct(productList);
};

//Delete All
btnDeleteAll.addEventListener('click', deleteAll)
function deleteAll(){
    localStorage.clear();
    productList.splice(0);
    showProduct(productList);
};

//Update Data
function updateProduct(index){
    title.value = productList[index].title;
    price.value = productList[index].price;
    taxes.value = productList[index].taxes;
    ads.value =  productList[index].ads;
    discount.value =  productList[index].discount;
    categroy.value =  productList[index].categroy;
    description.value =  productList[index].desc;
    getTotal();
    sumbit.classList.add('d-none');
    btnUpdate.classList.remove('d-none');
    count.style.display = "none";
    scroll({
        top:0,
        behavior:'smooth'
    })
    copyIndex = index;
}
btnUpdate.addEventListener("click", addUpdate)
function addUpdate(){
    let newProduct = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        categroy:categroy.value,
        desc:description.value
    };
    productList[copyIndex] = newProduct;
    sumbit.classList.remove('d-none');
    btnUpdate.classList.add('d-none');
    count.style.display = "";
    total.style.background = "#A83B10"
    showProduct(productList);
    clearInputs();
    localStorage.setItem("productData", JSON.stringify(productList));
}

//Show Data
function showProduct(list){
    let box = ``;
    list.map((product, i)=>{
        box += `<tr>
                    <td>${i+1}</td>
                    <td>${product.title}</td>
                    <td>${product.price}</td>
                    <td>${product.taxes}</td>
                    <td>${product.ads}</td>
                    <td>${product.discount}</td>
                    <td>${product.total}</td>
                    <td>${product.categroy}</td>
                    <td>${product.desc}</td>
                    <td>
                    <button onclick="updateProduct(${i})" id="update">Update</button>
                    </td>
                    <td>
                    <button onclick="deleteproduct(${i})" id="delete">Delete</button>
                    </td>
                </tr>`
    });
    tableBody.innerHTML = box;
    let btnDelete = document.getElementById("deleteAll");
    if(productList.length > 0){
        btnDelete.innerHTML = `
        <button id="deleteAll" class="mt-4 text-white btn-warning">Delete All ${productList.length}</button>
        `;
    }else{
        btnDelete.innerHTML = '';
    };
};

//Search
let searchMood = 'Title';
function searchTitleMood(id){
    if(id === 'searchTitle'){
        searchMood = 'Title';
    }else{
        searchMood = 'Categroy';
    };
    searchinput.placeholder = "Search By "+searchMood;
    searchinput.focus();
    searchinput.value = '';
    showProduct(productList)
};
searchinput.addEventListener('keyup',searchData);
function searchData(){
    let searchValue = searchinput.value;
    box = [];
    // console.log(x);
    for(var i=0; i < productList.length; i++){
        if(searchMood === 'Title'){
            if(productList[i].title.toLowerCase().includes(searchValue.toLowerCase())){
                box.push(productList[i])
            };
    }else{
            if(productList[i].categroy.toLowerCase().includes(searchValue.toLowerCase())){
                box.push(productList[i])
            };
    };
    };
    showProduct(box);
};