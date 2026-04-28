let products = [
  { id: 1, name: "Laptop", price: 800, category: "Computers" },
  { id: 2, name: "Smartphone", price: 500, category: "Mobile" },
  { id: 3, name: "Tablet", price: 300, category: "Mobile" },
  { id: 4, name: "Headphones", price: 100, category: "Audio" },
  { id: 5, name: "Smartwatch", price: 200, category: "Wearables" }
];

showProducts();

let selectedId = null;

const productObj = {
  id: '',
  name: '',
  price: '',
  category: ''
}

const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const categoriesInput = document.querySelector("#categories-selector");

let isEditing = false;

const formulario = document.getElementById("form");
formulario.addEventListener("submit", validateForm);

function validateForm(event){
  event.preventDefault();
  if (nameInput.value == '' || priceInput.value == '' || categoriesInput.value == ''){
    alert('All the field must be completed');
    return
  }

  if (isEditing){
    editProduct(selectedId);
    isEditing = false;
    selectedId = null;
  } else {
    productObj.id = Date.now();
    productObj.name = nameInput.value;
    productObj.price = priceInput.value;
    productObj.category = categoriesInput.value;

    addProduct()
  }

}

function addProduct(){
  products.push(productObj);

  document.getElementById('name').value = '';
  document.getElementById('price').value = '';
  document.getElementById('categories-selector').value = '';

  showProducts();
}


function showProducts(){

  cleanHtml();

  const unorderedList = document.getElementById("list");

  products.forEach(prod => {
    const { id, name, price, category } = prod;
    
    const listElement = document.createElement("li");

    listElement.innerHTML = `
      <img src="assets/generic-image.png" alt="Product Image" class="product-image">
      <div class="card">
          <p class="name-card">${name}</p>
          <p class="price-card">$${price}</p>
          <p class="category-text">${category}</p>
          <div class="container-actions"></div>
      </div>
  `;

    const containerActions = listElement.querySelector(".container-actions");


    listElement.dataset.id = id;

    const editButton = document.createElement("button");
    editButton.onclick = () => {
      isEditing = true;
      selectedId = id;
      chargeProduct(prod)
    };
    editButton.innerHTML = '<img src="assets/editIcon.svg" alt="Edit icon" class="edit-button-icon">';
    editButton.classList.add('edit-button');

    containerActions.append(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.onclick = () => {
      selectedId = id;
      deleteProduct(selectedId)
    };
    deleteButton.innerHTML = '<img src="assets/deleteIcon.svg" alt="Delete icon" class="delete-button-icon">';
    deleteButton.classList.add('delete-button');
                                                   
    containerActions.append(deleteButton);

    unorderedList.appendChild(listElement);
  });

}

function chargeProduct(prod){
  document.getElementById('name').value = prod.name;
  document.getElementById('price').value = prod.price;
  document.getElementById('categories-selector').value = prod.category;
}

function editProduct(id){
  products = products.map(product => {
    if (product.id === id) {
      return {
        ...product,
        name: nameInput.value,
        price: priceInput.value,
        category: categoriesInput.value
      }
    }
    return product;
  });

  document.getElementById('name').value = '';
  document.getElementById('price').value = '';
  document.getElementById('categories-selector').value = '';

  showProducts();
}

function deleteProduct(selectedId){
  products = products.filter((product, ) => product.id !== selectedId);
  showProducts();
}

function cleanHtml (){
  const unorderedList = document.querySelector("#list");
  while(unorderedList.firstChild){
    unorderedList.removeChild(unorderedList.firstChild);
  }
}

const searchForm = document.getElementsByClassName('.searchForm');

searchForm.addEventListener(submit, searchProducts);

function searchProducts(){
  
}