const products = [
  { id: 1, name: "Laptop", price: 800, category: "Computers" },
  { id: 2, name: "Smartphone", price: 500, category: "Mobile" },
  { id: 3, name: "Tablet", price: 300, category: "Mobile" },
  { id: 4, name: "Headphones", price: 100, category: "Audio" },
  { id: 5, name: "Smartwatch", price: 200, category: "Wearables" }
];

let selectedId = null;
let isEditing = false;

const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const categoriesInput = document.querySelector("#categories-selector");
const form = document.getElementById("form");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("search");
const productList = document.getElementById("list");

form.addEventListener("submit", validateForm);
searchForm.addEventListener("submit", event => event.preventDefault());
searchInput.addEventListener("input", handleSearch);

showProducts();

function validateForm(event) {
  event.preventDefault();

  const nameValue = nameInput.value.trim();
  const priceValue = priceInput.value.trim();
  const categoryValue = categoriesInput.value;

  if (!nameValue || !priceValue || !categoryValue) {
    alert("All fields must be completed");
    return;
  }

  if (isEditing) {
    editProduct(selectedId, nameValue, Number(priceValue), categoryValue);
    isEditing = false;
    selectedId = null;
  } else {
    addProduct({
      id: Date.now(),
      name: nameValue,
      price: Number(priceValue),
      category: categoryValue
    });
  }

  form.reset();
  showProducts();
}

function addProduct(product) {
  products.push(product);
}

function showProducts() {
  cleanHtml();

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

    listElement.dataset.id = id;

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.classList.add("edit-button");
    editButton.innerHTML = '<img src="assets/editIcon.svg" alt="Edit icon" class="edit-button-icon">';
    editButton.addEventListener("click", () => {
      isEditing = true;
      selectedId = id;
      chargeProduct(prod);
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = '<img src="assets/deleteIcon.svg" alt="Delete icon" class="delete-button-icon">';
    deleteButton.addEventListener("click", () => deleteProduct(id));

    listElement.querySelector(".container-actions").append(editButton, deleteButton);
    productList.appendChild(listElement);
  });
}

function chargeProduct(prod) {
  nameInput.value = prod.name;
  priceInput.value = prod.price;
  categoriesInput.value = prod.category;
}

function editProduct(id, name, price, category) {
  const updatedProducts = products.map(product => {
    if (product.id === id) {
      return { ...product, name, price, category };
    }
    return product;
  });

  products.length = 0;
  products.push(...updatedProducts);
}

function deleteProduct(id) {
  const remainingProducts = products.filter(product => product.id !== id);
  products.length = 0;
  products.push(...remainingProducts);
  showProducts();
}

function cleanHtml() {
  productList.innerHTML = "";
}

function handleSearch(event) {
  const searchValue = event.target.value.trim().toLowerCase();
  const productItems = productList.querySelectorAll("li");
  const isFilter = searchValue.charAt(0) === "#";

  productItems.forEach(item => {
    if (isFilter) {
      const searchedCategory = item.querySelector(".category-text");
      const productCategory = searchedCategory ? searchedCategory.textContent.toLowerCase() : "";
      item.style.display = productCategory.includes(searchValue.slice(1)) ? "" : "none";
      return;
    }

    const nameElement = item.querySelector(".name-card");
    const productName = nameElement ? nameElement.textContent.toLowerCase() : "";
    item.style.display = productName.includes(searchValue) ? "" : "none";
  });
}

