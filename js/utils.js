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

// Lets Node tests load this file; ignored in the browser.
if (typeof module !== 'undefined') {
  module.exports = { formatPeso };
}
