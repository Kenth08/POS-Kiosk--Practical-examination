// Screen 1 — Item Selection and cart.
// Owner: Member A
// Responsibilities: product cards, add item, + / − quantity, remove item,
// subtotal and total, "Product added" feedback, Proceed to Payment.

// Returns the cart line for a product, or undefined if it is not in the cart.
function findCartItem(productId) {
  return appState.cart.find(function (item) {
    return item.productId === productId;
  });
}

// Draws one large tappable card per product. A badge shows the quantity
// already in the cart. (Product data is hard-coded and trusted, so innerHTML is safe here.)
function renderProducts() {
  const grid = document.getElementById('product-grid');

  grid.innerHTML = PRODUCTS.map(function (product) {
    const cartItem = findCartItem(product.id);
    const badge = cartItem ? '<span class="product-badge">' + cartItem.quantity + '</span>' : '';

    return (
      '<button type="button" class="product-card' + (cartItem ? ' in-cart' : '') + '" data-product-id="' + product.id + '">' +
        badge +
        '<span class="product-icon" aria-hidden="true">' + product.icon + '</span>' +
        '<span class="product-info">' +
          '<span class="product-name">' + product.name + '</span>' +
          '<span class="product-price">' + formatPeso(product.price) + '</span>' +
        '</span>' +
      '</button>'
    );
  }).join('');
}

// Draws the cart lines, item count, and total.
function renderCart() {
  const list = document.getElementById('cart-items');

  if (appState.cart.length === 0) {
    list.innerHTML =
      '<li class="cart-empty">Your order is empty.<br>Tap a product to add it.</li>';
  } else {
    list.innerHTML = appState.cart.map(function (item) {
      return (
        '<li class="cart-item">' +
          '<div>' +
            '<div class="cart-item-name">' + item.name + '</div>' +
            '<div class="cart-item-price">' + formatPeso(item.price) + ' each</div>' +
          '</div>' +
          '<div class="cart-item-subtotal">' + formatPeso(item.price * item.quantity) + '</div>' +
          '<div class="qty-controls">' +
            '<button type="button" class="btn-icon btn-minus" aria-label="Decrease ' + item.name + '">−</button>' +
            '<span class="qty-value">' + item.quantity + '</span>' +
            '<button type="button" class="btn-icon btn-plus" aria-label="Increase ' + item.name + '">+</button>' +
            '<button type="button" class="btn-icon btn-remove" aria-label="Remove ' + item.name + '">🗑</button>' +
          '</div>' +
        '</li>'
      );
    }).join('');
  }

  document.getElementById('cart-count').textContent = '0 items';
  document.getElementById('cart-total').textContent = formatPeso(0);
}

// Redraws everything on the Item Selection screen.
function refreshSelection() {
  renderProducts();
  renderCart();
}

// Called once at startup by app.js.
function initSelection() {
  refreshSelection();
}
