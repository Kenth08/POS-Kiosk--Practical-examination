// Screen 1 — Item Selection and cart.
// Owner: Member A
// Responsibilities: product cards, add item, + / − quantity, remove item,
// subtotal and total, "Product added" feedback, Proceed to Payment.

const MAX_QUANTITY = 99; // upper limit per item so a stuck tap cannot run away

// Icon shown in each round category button.
const CATEGORY_ICONS = { All: '🍽️', Drinks: '🥤', Food: '🥪', Snacks: '🍪' };

// Which category is shown. Screen-only setting, so it lives here, not in appState.
let activeCategory = 'All';

// ---------- Cart actions (change appState.cart, then redraw) ----------

// Returns the cart line for a product, or undefined if it is not in the cart.
function findCartItem(productId) {
  return appState.cart.find(function (item) {
    return item.productId === productId;
  });
}

// Card "+" button: add the product, or add one more if already in the cart.
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
  scrollCartItemIntoView(productId);
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

// × button (or − at quantity 1): take the item out of the cart.
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

// HTML for one product card. Only the buttons add or remove items (tapping the
// card itself does nothing), so a customer cannot add something by accident.
// Not in the cart: one "+" button. In the cart: "− quantity +".
// (Product data is hard-coded and trusted, so innerHTML is safe here.)
function productCardHTML(product) {
  const cartItem = findCartItem(product.id);

  const controls = cartItem
    ? `<div class="card-qty">
         <button type="button" class="card-btn card-minus" data-action="decrease" aria-label="Remove one ${product.name}">−</button>
         <span class="card-qty-value" aria-label="${cartItem.quantity} in order">${cartItem.quantity}</span>
         <button type="button" class="card-btn card-plus" data-action="increase" aria-label="Add one more ${product.name}">+</button>
       </div>`
    : `<button type="button" class="card-btn card-plus" data-action="add" aria-label="Add ${product.name}, ${formatPeso(product.price)}">+</button>`;

  return `
    <div class="product-card${cartItem ? ' in-cart' : ''}" data-product-id="${product.id}">
      <span class="product-icon" aria-hidden="true">${product.icon}</span>
      <span class="product-name">${product.name}</span>
      <span class="product-description">${product.description}</span>
      <div class="product-footer">
        <span class="product-price">${formatPeso(product.price)}</span>
        ${controls}
      </div>
    </div>`;
}

// HTML for one round category button (All / Drinks / Food / Snacks).
function categoryChipHTML(category) {
  const isActive = category === activeCategory;
  return `
    <button type="button" class="category-chip${isActive ? ' active' : ''}" data-category="${category}"
      aria-pressed="${isActive}">
      <span class="category-icon" aria-hidden="true">${CATEGORY_ICONS[category] || '🛒'}</span>
      <span class="category-label">${category}</span>
    </button>`;
}

// HTML for one compact cart line:
//   [icon] Name · ₱45.00 each        ₱90.00
//   [icon] − 2 +                        ×
function cartItemHTML(item) {
  const product = PRODUCTS.find(function (p) { return p.id === item.productId; });

  return `
    <li class="cart-item" data-product-id="${item.productId}">
      <span class="cart-thumb" aria-hidden="true">${product ? product.icon : ''}</span>
      <div class="cart-item-info">
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-price">${formatPeso(item.price)} each</span>
      </div>
      <div class="cart-item-subtotal">${formatPeso(calculateSubtotal(item.price, item.quantity))}</div>
      <div class="qty-controls">
        <button type="button" class="btn-icon btn-minus" data-action="decrease" aria-label="Decrease ${item.name}">−</button>
        <span class="qty-value">${item.quantity}</span>
        <button type="button" class="btn-icon btn-plus" data-action="increase" aria-label="Increase ${item.name}">+</button>
      </div>
      <button type="button" class="btn-icon btn-remove" data-action="remove" aria-label="Remove ${item.name}">×</button>
    </li>`;
}

// Draws the category buttons.
function renderCategories() {
  document.getElementById('category-bar').innerHTML =
    getCategories(PRODUCTS).map(categoryChipHTML).join('');
}

// Draws the product cards for the selected category.
function renderProducts() {
  const visibleProducts = filterByCategory(PRODUCTS, activeCategory);
  document.getElementById('product-grid').innerHTML = visibleProducts.map(productCardHTML).join('');
  document.getElementById('product-heading').textContent =
    activeCategory === 'All' ? 'All Items' : activeCategory;
  document.getElementById('product-count').textContent =
    visibleProducts.length + (visibleProducts.length === 1 ? ' item' : ' items');
}

// Category button: only changes which products are shown — the cart is not touched.
function selectCategory(category) {
  activeCategory = category;
  refreshSelection();
}

// Draws the cart lines, item count, and total, and enables/disables Proceed.
function renderCart() {
  const list = document.getElementById('cart-items');

  if (appState.cart.length === 0) {
    list.innerHTML = '<li class="cart-empty">Your order is empty.<br>Tap <strong>+</strong> on a product to add it.</li>';
  } else {
    list.innerHTML = appState.cart.map(cartItemHTML).join('');
  }

  const itemCount = countItems(appState.cart);
  document.getElementById('cart-count').textContent = itemCount + (itemCount === 1 ? ' item' : ' items');
  document.getElementById('summary-items').textContent = itemCount;
  document.getElementById('cart-total').textContent = formatPeso(calculateTotal(appState.cart));
  document.getElementById('btn-proceed').disabled = appState.cart.length === 0;
  updateCartScrollHint();
}

// Scrolls the order list so the line for this product is visible
// (otherwise a newly added item could be hidden below the visible area).
function scrollCartItemIntoView(productId) {
  const line = document.querySelector('.cart-item[data-product-id="' + productId + '"]');
  if (line) line.scrollIntoView({ block: 'nearest' });
  updateCartScrollHint();
}

// Adds a fade at the top / bottom of the order list while lines are hidden
// above / below, so the customer knows to scroll.
function updateCartScrollHint() {
  const list = document.getElementById('cart-items');
  const hiddenAbove = list.scrollTop > 2;
  const hiddenBelow = list.scrollTop + list.clientHeight < list.scrollHeight - 2;
  list.classList.toggle('more-above', hiddenAbove);
  list.classList.toggle('more-below', hiddenBelow);
}

// Redraws everything on the Item Selection screen.
// Also used by other screens after the cart changes (e.g. New Transaction reset).
// Redrawing replaces the buttons, so the focused button is remembered and
// re-focused afterwards (otherwise keyboard users lose their place).
function refreshSelection() {
  const focusSelectors = getFocusedButtonSelectors();
  renderCategories();
  renderProducts();
  renderCart();
  restoreFocus(focusSelectors);
}

// Describes the focused button as a list of CSS selectors to try, best match first.
// Card buttons change after a tap ("+" becomes "− 2 +", or back), so for those
// the card's own "+" is the fallback.
function getFocusedButtonSelectors() {
  const focused = document.activeElement;
  if (!focused || !focused.closest) return [];

  const chip = focused.closest('.category-chip');
  if (chip) {
    return ['.category-chip[data-category="' + chip.dataset.category + '"]'];
  }

  const actionButton = focused.closest('button[data-action]');
  const container = actionButton && actionButton.closest('[data-product-id]');
  if (container) {
    const area = container.classList.contains('cart-item') ? '.cart-item' : '.product-card';
    const base = area + '[data-product-id="' + container.dataset.productId + '"] ';
    return [
      base + '[data-action="' + actionButton.dataset.action + '"]',
      base + '[data-action="increase"]',
      base + '[data-action="add"]',
    ];
  }

  return [];
}

// Focuses the first selector that still exists. If the item was removed from the
// order list, nothing matches, so nothing happens.
function restoreFocus(selectors) {
  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element) {
      element.focus();
      return;
    }
  }
}

// One place that turns a button's data-action into a cart change.
// Used by both the product cards and the order list.
function handleItemAction(productId, action) {
  if (action === 'add') addToCart(productId);
  if (action === 'increase') changeQuantity(productId, 1);
  if (action === 'decrease') changeQuantity(productId, -1);
  if (action === 'remove') removeFromCart(productId);
}

// Click handler shared by the product grid and the order list ("event delegation":
// one listener per area, because the buttons are re-created on every redraw).
function onItemButtonClick(event) {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const container = button.closest('[data-product-id]');
  handleItemAction(container.dataset.productId, button.dataset.action);
}

// ---------- Button handling ----------

// Called once at startup by app.js.
function initSelection() {
  document.getElementById('product-grid').addEventListener('click', onItemButtonClick);
  document.getElementById('cart-items').addEventListener('click', onItemButtonClick);
  document.getElementById('cart-items').addEventListener('scroll', updateCartScrollHint);
  window.addEventListener('resize', updateCartScrollHint);

  document.getElementById('category-bar').addEventListener('click', function (event) {
    const chip = event.target.closest('.category-chip');
    if (chip) selectCategory(chip.dataset.category);
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
