let cartCount = 0;

function addToCart(productId) {
  cartCount++;
  document.getElementById("cart-count").textContent = cartCount;
  alert("Producto agregado al carrito.");
}

function getStoredProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

function saveProduct(product) {
  const products = getStoredProducts();
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
}

function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  const products = getStoredProducts();
  products.forEach((product, index) => {
    const productEl = document.createElement("div");
    productEl.className = "product";

    productEl.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>$${parseFloat(product.price).toFixed(2)}</p>
      <button onclick="addToCart(${index})">Agregar al carrito</button>
    `;

    productList.appendChild(productEl);
  });
}

function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("product-name").value.trim();
  const price = document.getElementById("product-price").value;
  const image = document.getElementById("product-image").value.trim();

  if (!name || !price || !image) return alert("Completa todos los campos");

  const product = { name, price, image };
  saveProduct(product);
  renderProducts();

  document.getElementById("product-form").reset();
  alert("Producto agregado con éxito.");
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  document
    .getElementById("product-form")
    .addEventListener("submit", handleFormSubmit);
});
