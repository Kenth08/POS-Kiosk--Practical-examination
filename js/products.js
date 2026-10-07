// Product catalog (hard-coded — allowed by the exam; no database needed for six items).
// Prices are stored in CENTAVOS (whole numbers) to avoid decimal rounding errors.
// Example: 4500 centavos = ₱45.00
const PRODUCTS = [
  { id: 'coffee',    name: 'Coffee',        price: 4500, category: 'Drinks', icon: '☕' },
  { id: 'sandwich',  name: 'Sandwich',      price: 5000, category: 'Food',   icon: '🥪' },
  { id: 'softdrink', name: 'Soft Drink',    price: 3500, category: 'Drinks', icon: '🥤' },
  { id: 'cookies',   name: 'Cookies',       price: 2500, category: 'Snacks', icon: '🍪' },
  { id: 'water',     name: 'Bottled Water', price: 2000, category: 'Drinks', icon: '💧' },
  { id: 'chocolate', name: 'Chocolate',     price: 2500, category: 'Snacks', icon: '🍫' },
];

// Lets Node tests load this file; ignored in the browser.
if (typeof module !== 'undefined') {
  module.exports = { PRODUCTS };
}
