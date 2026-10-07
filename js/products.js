// Product catalog (hard-coded — allowed by the exam; no database needed for six items).
// Prices are stored in CENTAVOS (whole numbers) to avoid decimal rounding errors.
// Example: 4500 centavos = ₱45.00
const PRODUCTS = [
  { id: 'coffee',    name: 'Coffee',        price: 4500, category: 'Drinks', icon: '☕', description: 'Freshly brewed hot coffee' },
  { id: 'sandwich',  name: 'Sandwich',      price: 5000, category: 'Food',   icon: '🥪', description: 'Ham and cheese on soft bread' },
  { id: 'softdrink', name: 'Soft Drink',    price: 3500, category: 'Drinks', icon: '🥤', description: 'Ice-cold carbonated drink' },
  { id: 'cookies',   name: 'Cookies',       price: 2500, category: 'Snacks', icon: '🍪', description: 'Chocolate chip, baked daily' },
  { id: 'water',     name: 'Bottled Water', price: 2000, category: 'Drinks', icon: '💧', description: '500 mL purified water' },
  { id: 'chocolate', name: 'Chocolate',     price: 2500, category: 'Snacks', icon: '🍫', description: 'Rich milk chocolate bar' },
];

// Lets Node tests load this file; ignored in the browser.
if (typeof module !== 'undefined') {
  module.exports = { PRODUCTS };
}
