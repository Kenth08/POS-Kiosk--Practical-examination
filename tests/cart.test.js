// Unit tests for cart calculations (Member A). Run with: npm test
// Expected values come from the exam's instructor tests (pages 7–8).
const test = require('node:test');
const assert = require('node:assert');
const { calculateSubtotal, calculateTotal, countItems } = require('../js/utils.js');

// Exam example order: Coffee ₱45 × 2, Sandwich ₱50 × 1, Soft Drink ₱35 × 1
function sampleCart() {
  return [
    { productId: 'coffee',    name: 'Coffee',     price: 4500, quantity: 2 },
    { productId: 'sandwich',  name: 'Sandwich',   price: 5000, quantity: 1 },
    { productId: 'softdrink', name: 'Soft Drink', price: 3500, quantity: 1 },
  ];
}

test('subtotal = unit price × quantity', function () {
  assert.strictEqual(calculateSubtotal(4500, 2), 9000);  // ₱90.00
  assert.strictEqual(calculateSubtotal(5000, 1), 5000);  // ₱50.00
  assert.strictEqual(calculateSubtotal(3500, 0), 0);
});

test('instructor test 2: total of sample order is ₱175.00', function () {
  assert.strictEqual(calculateTotal(sampleCart()), 17500);
});

test('instructor test 3: Coffee 2 → 3 makes total ₱220.00, back to 2 restores ₱175.00', function () {
  const cart = sampleCart();
  cart[0].quantity = 3;
  assert.strictEqual(calculateSubtotal(cart[0].price, cart[0].quantity), 13500); // ₱135.00
  assert.strictEqual(calculateTotal(cart), 22000);
  cart[0].quantity = 2;
  assert.strictEqual(calculateTotal(cart), 17500);
});

test('instructor test 4: removing Soft Drink makes total ₱140.00', function () {
  const cart = sampleCart().filter(function (item) { return item.productId !== 'softdrink'; });
  assert.strictEqual(calculateTotal(cart), 14000);
});

test('empty cart has total ₱0.00 and 0 items', function () {
  assert.strictEqual(calculateTotal([]), 0);
  assert.strictEqual(countItems([]), 0);
});

test('countItems adds up quantities', function () {
  assert.strictEqual(countItems(sampleCart()), 4);
});
