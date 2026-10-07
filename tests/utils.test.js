// Unit tests for shared helpers. Run with: npm test
const test = require('node:test');
const assert = require('node:assert');
const { formatPeso, calculateChange } = require('../js/utils.js');
const { PRODUCTS } = require('../js/products.js');

test('formatPeso converts centavos to a peso string', function () {
  assert.strictEqual(formatPeso(17500), '₱175.00');
  assert.strictEqual(formatPeso(4500), '₱45.00');
  assert.strictEqual(formatPeso(0), '₱0.00');
});

test('formatPeso adds a thousands separator', function () {
  assert.strictEqual(formatPeso(100000), '₱1,000.00');
});

test('calculateChange returns correct change in centavos', function () {
  assert.strictEqual(calculateChange(20000, 14000), 6000);
});

test('calculateChange accepts exact payment and rejects invalid or insufficient amounts', function () {
  assert.strictEqual(calculateChange(14000, 14000), 0);
  assert.strictEqual(calculateChange(13999, 14000), null);
  assert.strictEqual(calculateChange(-1, 14000), null);
  assert.strictEqual(calculateChange(14000.5, 14000), null);
});

test('catalog has at least six products, each with a name and a valid price', function () {
  assert.ok(PRODUCTS.length >= 6);
  PRODUCTS.forEach(function (product) {
    assert.ok(product.name.length > 0);
    assert.ok(Number.isInteger(product.price) && product.price > 0);
  });
});
