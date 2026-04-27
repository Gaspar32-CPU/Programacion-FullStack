const products = [
  { id: 1, name: "Laptop", price: 800, category: "Computers" },
  { id: 2, name: "Smartphone", price: 500, category: "Mobile" },
  { id: 3, name: "Tablet", price: 300, category: "Mobile" },
  { id: 4, name: "Headphones", price: 100, category: "Audio" },
  { id: 5, name: "Smartwatch", price: 200, category: "Wearables" }
];


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

  const unorderedList = document.getElementById("list");

  const listElement = document.createElement("li");

  listElement.innerHTML = `<img src="" alt="Product Image">
    <div class="card">
        <p class="id-card"></p>
        <p class="name-card"></p>
        <p class="price-card"></p>
    </div>
  `;

  console.log(products)
}

function editProduct (){}