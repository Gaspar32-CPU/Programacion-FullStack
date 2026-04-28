const products = [
  { id: 1, name: "Laptop", price: 800, category: "Computers" },
  { id: 2, name: "Smartphone", price: 500, category: "Mobile" },
  { id: 3, name: "Tablet", price: 300, category: "Mobile" },
  { id: 4, name: "Headphones", price: 100, category: "Audio" },
  { id: 5, name: "Smartwatch", price: 200, category: "Wearables" }
];

showProducts();

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
  if (nameInput.value == '' || priceInput == '' || categoriesInput == ''){
    alert('All the field must be completed');
    return
  }

  if (isEditing){
    editProduct();
    isEditing = false;
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
  console.log(products)
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
    //editButton.onclick = () => chargeProduct(prod);
    editButton.innerHTML = '<img src="assets/editIcon.svg" alt="Edit icon" class="edit-button-icon">';
    editButton.classList.add('edit-button');

    containerActions.append(editButton);

    const deleteButton = document.createElement("button");
    //deleteButton.onclick = () => deleteProduct(id);
    deleteButton.innerHTML = '<img src="assets/deleteIcon.svg" alt="Delete icon" class="delete-button-icon">';
    deleteButton.classList.add('delete-button');

    containerActions.append(deleteButton);

    unorderedList.appendChild(listElement);
  });

}
function editProduct (){}

function cleanHtml (){
  const unorderedList = document.querySelector("#list");
  while(unorderedList.firstChild){
    unorderedList.removeChild(unorderedList.firstChild);
  }
}