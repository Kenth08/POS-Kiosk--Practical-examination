// Shared application state for ONE transaction.
// Every screen reads from and writes to this object, so all screens
// always show the same order and total.
const appState = {
  // Items in the current order: [{ productId, name, price, quantity }]
  // (price in centavos). Managed by Member A (selection.js).
  cart: [],

  // Payment details once a method is chosen/completed:
  // { method, amountPaid, change }. Managed by Members B and C.
  payment: null,

  // The completed transaction shown on the success/receipt screens.
  // Managed by Member C (checkout.js).
  transaction: null,
};
