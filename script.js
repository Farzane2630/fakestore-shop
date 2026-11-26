const API_URL = "https://fakestoreapi.com/products";

const list = document.getElementById("product-grid");
const statusEl = document.getElementById("status");

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

fetchProducts().then((products) => {
  console.log(`Loaded ${products.length} products`);
});
