// Fetch products from the backend
async function fetchProducts() {
  try {
    const response = await fetch("/api/products");
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Display products on the page
function displayProducts(products) {
  const productsContainer = document.getElementById("featured-products");
  productsContainer.innerHTML = products
    .map(
      (product) => `
        <div class="product-card">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `
    )
    .join("");

  // Add event listeners for "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", addToCart);
  });
}

// Add item to cart
function addToCart(event) {
  const productId = event.target.dataset.id;
  // Implement cart logic here (e.g., store in localStorage or send to backend)
  console.log(`Added product ${productId} to cart`);
}

// Load products when the page is ready
document.addEventListener("DOMContentLoaded", fetchProducts);
