// Unit tests for shared helpers. Run with: npm test
const test = require('node:test');
const assert = require('node:assert');
const { formatPeso } = require('../js/utils.js');
const { PRODUCTS } = require('../js/products.js');

test('formatPeso converts centavos to a peso string', function () {
  assert.strictEqual(formatPeso(17500), '₱175.00');
  assert.strictEqual(formatPeso(4500), '₱45.00');
  assert.strictEqual(formatPeso(0), '₱0.00');
});

test('formatPeso adds a thousands separator', function () {
  assert.strictEqual(formatPeso(100000), '₱1,000.00');
});

test('catalog has at least six products, each with a name and a valid price', function () {
  assert.ok(PRODUCTS.length >= 6);
  PRODUCTS.forEach(function (product) {
    assert.ok(product.name.length > 0);
    assert.ok(Number.isInteger(product.price) && product.price > 0);
  });
});
