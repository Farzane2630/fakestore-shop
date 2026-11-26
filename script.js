const API_URL = "https://fakestoreapi.com/products";

const list = document.getElementById("product-grid");
const statusEl = document.getElementById("status");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const sortSelect = document.getElementById("sort");

let allProducts = [];

async function fetchProducts() {
  statusEl.textContent = "Loading products...";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const products = await response.json();
    statusEl.textContent = "";

    products.forEach((product) => {
      const item = document.createElement("li");
      item.textContent = product.title;
      list.appendChild(item);
    });

    return products;
  } catch (error) {
    console.error(error);
    statusEl.textContent =
      "Sorry, something went wrong. Please try again later.";
    return [];
  }
}

function populateCategories(products) {
  const categories = [...new Set(products.map((product) => product.category))];

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

function render(products) {
  list.replaceChildren();

  products.forEach((product) => {
    const item = document.createElement("li");
    item.textContent = `${product.title} - $${product.price}`;
    list.appendChild(item);
  });
}

function applyFilters() {
  const search = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;
  const sort = sortSelect.value;

  // filter returns a new array, so sorting it never touches allProducts
  const result = allProducts
    .filter((product) => product.title.toLowerCase().includes(search))
    .filter((product) => category === "all" || product.category === category);

  if (sort === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  }

  render(result);
}

async function init() {
  allProducts = await fetchProducts();
  populateCategories(allProducts);
  applyFilters();
}

searchInput.addEventListener("input", applyFilters);
categorySelect.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);

init();
