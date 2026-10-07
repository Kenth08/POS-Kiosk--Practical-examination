// Unit tests for the category filter (Member A). Run with: npm test
const test = require('node:test');
const assert = require('node:assert');
const { getCategories, filterByCategory } = require('../js/utils.js');
const { PRODUCTS } = require('../js/products.js');

test('getCategories lists "All" first, then each category once', function () {
  assert.deepStrictEqual(getCategories(PRODUCTS), ['All', 'Drinks', 'Food', 'Snacks']);
});

test('filterByCategory("All") returns every product', function () {
  assert.strictEqual(filterByCategory(PRODUCTS, 'All').length, PRODUCTS.length);
});

test('filterByCategory returns only products in that category', function () {
  const drinks = filterByCategory(PRODUCTS, 'Drinks').map(function (p) { return p.name; });
  assert.deepStrictEqual(drinks, ['Coffee', 'Soft Drink', 'Bottled Water']);
});

test('every product has a description for its card', function () {
  PRODUCTS.forEach(function (product) {
    assert.ok(product.description && product.description.length > 0, product.name);
  });
});
