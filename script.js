const API_URL = "https://fakestoreapi.com/products";

const list = document.getElementById("product-grid");
const statusEl = document.getElementById("status");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const sortSelect = document.getElementById("sort");

let allProducts = [];

// Product Detail Modal
const modal = document.getElementById("product-modal");
const modalClose = document.getElementById("modal-close");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalCategory = document.getElementById("modal-category");
const modalPrice = document.getElementById("modal-price");
const modalDescription = document.getElementById("modal-description");

// Add To Cart
const addToCartBtn = document.getElementById("add-to-cart");
const cartCountEl = document.getElementById("cart-count");
const cartTotalEl = document.getElementById("cart-total");
// productId -> { product, quantity }. The cart lives in memory, separate from the DOM.
const cart = new Map();
let currentProduct = null;

async function fetchProducts() {
  statusEl.textContent = "Loading products...";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const products = await response.json();
    statusEl.textContent = "";
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
    const button = document.createElement("button");

    button.type = "button";
    button.dataset.id = product.id;
    button.textContent = `${product.title} - $${product.price}`;

    item.appendChild(button);
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

function openModal(product) {
  currentProduct = product;

  modalImage.src = product.image;
  modalImage.alt = product.title;
  modalTitle.textContent = product.title;
  modalCategory.textContent = product.category;
  modalPrice.textContent = `$${product.price}`;
  modalDescription.textContent = product.description;

  modal.showModal();
}

async function init() {
  allProducts = await fetchProducts();
  populateCategories(allProducts);
  applyFilters();
}

searchInput.addEventListener("input", applyFilters);
categorySelect.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);

list.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const product = allProducts.find((p) => p.id === Number(button.dataset.id));
  if (product) openModal(product);
});

modalClose.addEventListener("click", () => modal.close());

modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.close();
});

// CART
function addToCart(product) {
  const entry = cart.get(product.id);

  if (entry) {
    entry.quantity += 1;
  } else {
    cart.set(product.id, { product, quantity: 1 });
  }

  updateCartSummary();
}

function updateCartSummary() {
  let count = 0;
  let total = 0;

  for (const { product, quantity } of cart.values()) {
    count += quantity;
    total += product.price * quantity;
  }

  cartCountEl.textContent = count;
  cartTotalEl.textContent = total.toFixed(2);
}

addToCartBtn.addEventListener("click", () => {
  if (currentProduct) addToCart(currentProduct);
});

init();
