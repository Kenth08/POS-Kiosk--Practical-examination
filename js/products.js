// Product catalog (hard-coded — allowed by the exam; no database needed for a small menu).
// Prices are stored in CENTAVOS (whole numbers) to avoid decimal rounding errors.
// Example: 4500 centavos = ₱45.00
const PRODUCTS = [
  { id: 'coffee',    name: 'Coffee',        price: 4500, category: 'Drinks', icon: '☕', description: 'Freshly brewed hot coffee' },
  { id: 'sandwich',  name: 'Sandwich',      price: 5000, category: 'Food',   icon: '🥪', description: 'Ham and cheese on soft bread' },
  { id: 'softdrink', name: 'Soft Drink',    price: 3500, category: 'Drinks', icon: '🥤', description: 'Ice-cold carbonated drink' },
  { id: 'cookies',   name: 'Cookies',       price: 2500, category: 'Snacks', icon: '🍪', description: 'Chocolate chip, baked daily' },
  { id: 'water',     name: 'Bottled Water', price: 2000, category: 'Drinks', icon: '💧', description: '500 mL purified water' },
  { id: 'chocolate', name: 'Chocolate',     price: 2500, category: 'Snacks', icon: '🍫', description: 'Rich milk chocolate bar' },
  { id: 'milktea',   name: 'Milk Tea',      price: 6000, category: 'Drinks', icon: '🧋', description: 'Classic milk tea with pearls' },
  { id: 'freshmilk', name: 'Fresh Milk',    price: 3000, category: 'Drinks', icon: '🥛', description: 'Chilled fresh milk, 250 mL' },
  { id: 'juicebox',  name: 'Juice Box',     price: 3000, category: 'Drinks', icon: '🧃', description: 'Mango juice drink, 200 mL' },
  { id: 'burger',    name: 'Burger',        price: 7500, category: 'Food',   icon: '🍔', description: 'Beef patty with cheese and lettuce' },
  { id: 'hotdog',    name: 'Hotdog',        price: 5500, category: 'Food',   icon: '🌭', description: 'Jumbo hotdog in a soft bun' },
  { id: 'spaghetti', name: 'Spaghetti',     price: 6500, category: 'Food',   icon: '🍝', description: 'Sweet-style spaghetti with sauce' },
  { id: 'pizza',     name: 'Pizza Slice',   price: 6000, category: 'Food',   icon: '🍕', description: 'Cheesy pepperoni pizza slice' },
  { id: 'donut',     name: 'Donut',         price: 3000, category: 'Snacks', icon: '🍩', description: 'Glazed donut with sprinkles' },
  { id: 'popcorn',   name: 'Popcorn',       price: 4000, category: 'Snacks', icon: '🍿', description: 'Butter popcorn, regular size' },
  { id: 'cupcake',   name: 'Cupcake',       price: 3500, category: 'Snacks', icon: '🧁', description: 'Vanilla cupcake with frosting' },
];

// Lets Node tests load this file; ignored in the browser.
if (typeof module !== 'undefined') {
  module.exports = { PRODUCTS };
}
