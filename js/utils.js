// Shared helper functions. These are "pure" functions: no screen or DOM access,
// so they can be tested in Node (see tests/utils.test.js).
// Each member adds their own calculation helpers here (e.g. subtotal, change).

// Converts centavos (whole number) to a peso string: 17500 -> "₱175.00"
function formatPeso(centavos) {
  const pesos = centavos / 100;
  return '₱' + pesos.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Subtotal = Unit Price × Quantity (both in centavos / whole numbers).
function calculateSubtotal(price, quantity) {
  return price * quantity;
}

// Total Amount = sum of all item subtotals in the cart.
function calculateTotal(cart) {
  return cart.reduce(function (sum, item) {
    return sum + calculateSubtotal(item.price, item.quantity);
  }, 0);
}

// Total number of pieces in the cart (Coffee × 2 + Sandwich × 1 = 3 items).
function countItems(cart) {
  return cart.reduce(function (sum, item) {
    return sum + item.quantity;
  }, 0);
}

// Unique category names in catalog order, with "All" first: ['All', 'Drinks', 'Food', 'Snacks']
function getCategories(products) {
  const categories = ['All'];
  products.forEach(function (product) {
    if (!categories.includes(product.category)) categories.push(product.category);
  });
  return categories;
}

// Products in one category ("All" returns every product). Only changes what is shown —
// it never touches the cart.
function filterByCategory(products, category) {
  if (category === 'All') return products;
  return products.filter(function (product) {
    return product.category === category;
  });
}

// Returns change in centavos, or null when either amount is invalid or underpaid.
function calculateChange(amountPaid, total) {
  if (!Number.isSafeInteger(amountPaid) || !Number.isSafeInteger(total) ||
      amountPaid < 0 || total < 0 || amountPaid < total) {
    return null;
  }

  return amountPaid - total;
}

// Lets Node tests load this file; ignored in the browser.
if (typeof module !== 'undefined') {
  module.exports = {
    formatPeso, calculateSubtotal, calculateTotal, countItems,
    getCategories, filterByCategory, calculateChange,
  };
}
