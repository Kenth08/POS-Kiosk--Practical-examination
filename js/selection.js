// Screen 1 — Item Selection and cart.
// Owner: Member A
// Responsibilities: product cards, add item, + / − quantity, remove item,
// subtotal and total, "Product added" feedback, Proceed to Payment.

const MAX_QUANTITY = 99; // upper limit per item so a stuck tap cannot run away

// ---------- Cart actions (change appState.cart, then redraw) ----------

// Returns the cart line for a product, or undefined if it is not in the cart.
function findCartItem(productId) {
  return appState.cart.find(function (item) {
    return item.productId === productId;
  });
}

// Tapping a product card: add it, or add one more if already in the cart.
function addToCart(productId) {
  const product = PRODUCTS.find(function (p) { return p.id === productId; });
  if (!product) {
    showToast('Invalid product', 'error');
    return;
  }

  if (findCartItem(productId)) {
    // Already in the cart: reuse the + logic so the quantity limit is checked in one place.
    const added = changeQuantity(productId, 1);
    if (!added) return;
  } else {
    appState.cart.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
    refreshSelection();
  }

  showToast('Product added — ' + product.name);
}

// + / − buttons. delta is +1 or -1.
// Going below 1 removes the item, so quantity can never become 0 or negative.
// Returns true if the cart changed, false if the change was rejected.
function changeQuantity(productId, delta) {
  const item = findCartItem(productId);
  if (!item) return false;

  const newQuantity = item.quantity + delta;
  if (newQuantity < 1) {
    removeFromCart(productId);
    return true;
  }
  if (newQuantity > MAX_QUANTITY) {
    showToast('Invalid quantity — maximum is ' + MAX_QUANTITY, 'error');
    return false;
  }

  item.quantity = newQuantity;
  refreshSelection();
  return true;
}

// 🗑 button (or − at quantity 1): take the item out of the cart.
function removeFromCart(productId) {
  const item = findCartItem(productId);
  if (!item) return;

  appState.cart = appState.cart.filter(function (line) {
    return line.productId !== productId;
  });

  showToast('Removed — ' + item.name);
  refreshSelection();
}

// ---------- Drawing the screen ----------

// HTML for one large tappable product card. A badge shows the quantity
// already in the cart. (Product data is hard-coded and trusted, so innerHTML is safe here.)
function productCardHTML(product) {
  const cartItem = findCartItem(product.id);
  const badge = cartItem ? `<span class="product-badge">${cartItem.quantity}</span>` : '';

  return `
    <button type="button" class="product-card${cartItem ? ' in-cart' : ''}" data-product-id="${product.id}">
      ${badge}
      <span class="product-icon" aria-hidden="true">${product.icon}</span>
      <span class="product-info">
        <span class="product-name">${product.name}</span>
        <span class="product-price">${formatPeso(product.price)}</span>
      </span>
    </button>`;
}

// HTML for one cart line: name, unit price, subtotal, and − / + / remove buttons.
function cartItemHTML(item) {
  return `
    <li class="cart-item" data-product-id="${item.productId}">
      <div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatPeso(item.price)} each</div>
      </div>
      <div class="cart-item-subtotal">${formatPeso(calculateSubtotal(item.price, item.quantity))}</div>
      <div class="qty-controls">
        <button type="button" class="btn-icon btn-minus" data-action="decrease" aria-label="Decrease ${item.name}">−</button>
        <span class="qty-value">${item.quantity}</span>
        <button type="button" class="btn-icon btn-plus" data-action="increase" aria-label="Increase ${item.name}">+</button>
        <button type="button" class="btn-icon btn-remove" data-action="remove" aria-label="Remove ${item.name}">🗑</button>
      </div>
    </li>`;
}

// Draws all product cards.
function renderProducts() {
  document.getElementById('product-grid').innerHTML = PRODUCTS.map(productCardHTML).join('');
}

// Draws the cart lines, item count, and total, and enables/disables Proceed.
function renderCart() {
  const list = document.getElementById('cart-items');

  if (appState.cart.length === 0) {
    list.innerHTML = '<li class="cart-empty">Your order is empty.<br>Tap a product to add it.</li>';
  } else {
    list.innerHTML = appState.cart.map(cartItemHTML).join('');
  }

  const itemCount = countItems(appState.cart);
  document.getElementById('cart-count').textContent = itemCount + (itemCount === 1 ? ' item' : ' items');
  document.getElementById('cart-total').textContent = formatPeso(calculateTotal(appState.cart));
  document.getElementById('btn-proceed').disabled = appState.cart.length === 0;
}

// Redraws everything on the Item Selection screen.
// Also used by other screens after the cart changes (e.g. New Transaction reset).
// Redrawing replaces the buttons, so the focused button is remembered and
// re-focused afterwards (otherwise keyboard users lose their place).
function refreshSelection() {
  const focusSelector = getFocusedButtonSelector();
  renderProducts();
  renderCart();
  restoreFocus(focusSelector);
}

// Describes the focused card / cart button as a CSS selector, or null.
function getFocusedButtonSelector() {
  const focused = document.activeElement;
  if (!focused || !focused.closest) return null;

  const card = focused.closest('.product-card');
  if (card) {
    return '.product-card[data-product-id="' + card.dataset.productId + '"]';
  }

  const cartButton = focused.closest('.cart-item button[data-action]');
  if (cartButton) {
    const productId = cartButton.closest('.cart-item').dataset.productId;
    return '.cart-item[data-product-id="' + productId + '"] [data-action="' + cartButton.dataset.action + '"]';
  }

  return null;
}

// Focuses the new copy of the button. If the item was removed, there is
// nothing to focus, so nothing happens.
function restoreFocus(selector) {
  if (!selector) return;
  const element = document.querySelector(selector);
  if (element) element.focus();
}

// ---------- Button handling ----------

// Called once at startup by app.js.
// One click listener per area ("event delegation"), because the cards and
// cart lines are re-created every time the screen is redrawn.
function initSelection() {
  document.getElementById('product-grid').addEventListener('click', function (event) {
    const card = event.target.closest('.product-card');
    if (card) addToCart(card.dataset.productId);
  });

  document.getElementById('cart-items').addEventListener('click', function (event) {
    const button = event.target.closest('button[data-action]');
    if (!button) return;

    const productId = button.closest('.cart-item').dataset.productId;
    if (button.dataset.action === 'increase') changeQuantity(productId, 1);
    if (button.dataset.action === 'decrease') changeQuantity(productId, -1);
    if (button.dataset.action === 'remove') removeFromCart(productId);
  });

  document.getElementById('btn-proceed').addEventListener('click', function () {
    if (appState.cart.length === 0) {
      showToast('Your order is empty. Please add a product first.', 'error');
      return;
    }
    showScreen('summary');
  });

  refreshSelection();
}
