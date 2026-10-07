// Screens 3b–5 — QR and Card simulation, Payment Successful, Receipt, New Transaction.
// Owner: Member C
// Responsibilities: QR confirm, card "Processing payment…", unique transaction
// number, success screen, receipt, full reset back to Item Selection.

const CARD_PROCESSING_DELAY_MS = 2000;
let cardProcessingTimer = null;

function getCurrentYearNumber() {
  return new Date().getFullYear();
}

function getStoredTransactionCounter() {
  if (typeof window === 'undefined' || !window.localStorage) return 0;
  const rawValue = Number(window.localStorage.getItem('pos_txn_counter') || '0');
  return Number.isSafeInteger(rawValue) && rawValue >= 0 ? rawValue : 0;
}

function saveTransactionCounter(value) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  window.localStorage.setItem('pos_txn_counter', String(value));
}

function generateTransactionNumber() {
  const nextCounter = getStoredTransactionCounter() + 1;
  saveTransactionCounter(nextCounter);
  return formatTransactionNumber(getCurrentYearNumber(), nextCounter);
}

function getPaymentMethodLabel(method) {
  const labels = {
    cash: 'Cash',
    qr: 'QR Payment',
    card: 'Credit/Debit Card',
  };
  return labels[method] || 'Unknown';
}

function createTransactionOnce() {
  if (appState.transaction) return appState.transaction;

  const total = calculateTotal(appState.cart);
  const payment = appState.payment || {
    method: 'cash',
    amountPaid: total,
    change: 0,
  };

  appState.transaction = {
    number: generateTransactionNumber(),
    date: new Date().toISOString(),
    items: appState.cart.map(function (item) {
      return {
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: calculateSubtotal(item.price, item.quantity),
      };
    }),
    total: total,
    paymentMethod: payment.method,
    amountPaid: payment.amountPaid,
    change: payment.change,
  };

  return appState.transaction;
}

function renderPaymentTotalsForCheckout() {
  const total = calculateTotal(appState.cart);
  const totalText = formatPeso(total);

  const qrTotal = document.getElementById('qr-total');
  const cardTotal = document.getElementById('card-total');
  if (qrTotal) qrTotal.textContent = 'Total due: ' + totalText;
  if (cardTotal) cardTotal.textContent = 'Total due: ' + totalText;
}

// Date and time shown on the success screen and the receipt, e.g. "Oct 7, 2026, 8:14 PM".
function formatReceiptDate(isoDate) {
  return new Date(isoDate).toLocaleString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

// Payment rows (display only — values come from the saved transaction).
// Every method shows Amount paid + Change (the exam requires both on the receipt;
// QR and Card change is ₱0.00). Card also shows its approval status.
function getPaymentDetailRows(transaction) {
  const rows = [
    ['Amount paid', formatPeso(transaction.amountPaid)],
    ['Change', formatPeso(transaction.change)],
  ];
  if (transaction.paymentMethod === 'card') {
    rows.push(['Card status', 'Approved']);
  }
  return rows;
}

// One "label ........ value" line used on both screens.
function detailRowHTML(label, value, extraClass) {
  return '<div class="detail-row' + (extraClass ? ' ' + extraClass : '') + '">' +
    '<span class="detail-label">' + label + '</span>' +
    '<span class="detail-value">' + value + '</span>' +
    '</div>';
}

function renderSuccessScreen() {
  const container = document.getElementById('success-content');
  if (!container) return;

  const transaction = createTransactionOnce();

  container.innerHTML = [
    '<div class="success-amount">',
    '<span class="success-amount-label">Total paid</span>',
    '<strong class="success-amount-value">' + formatPeso(transaction.total) + '</strong>',
    '</div>',
    '<div class="success-details">',
    detailRowHTML('Transaction #', transaction.number),
    detailRowHTML('Date &amp; time', formatReceiptDate(transaction.date)),
    detailRowHTML('Payment method', getPaymentMethodLabel(transaction.paymentMethod)),
    getPaymentDetailRows(transaction).map(function (row) {
      return detailRowHTML(row[0], row[1]);
    }).join(''),
    '</div>'
  ].join('');
}

function renderReceiptScreen() {
  const container = document.getElementById('receipt-content');
  if (!container) return;

  const transaction = appState.transaction || createTransactionOnce();
  const itemCount = countItems(transaction.items);

  // Each line: name and subtotal on top, "Qty 2 × ₱45.00" underneath.
  const lineItems = transaction.items.map(function (item) {
    return '<li class="receipt-item">' +
      '<div class="receipt-item-main">' +
      '<span class="receipt-item-name">' + item.name + '</span>' +
      '<span class="receipt-item-subtotal">' + formatPeso(item.subtotal) + '</span>' +
      '</div>' +
      '<span class="receipt-item-meta">Qty ' + item.quantity + ' × ' + formatPeso(item.price) + '</span>' +
      '</li>';
  }).join('');

  const paymentRows = getPaymentDetailRows(transaction).map(function (row) {
    return detailRowHTML(row[0], row[1]);
  }).join('');

  container.innerHTML = [
    '<header class="receipt-brand">',
    '<img src="images/favicon.svg" alt="" width="44" height="44">',
    '<div><strong>Campus Store</strong><span>Self-Service Kiosk</span></div>',
    '</header>',
    '<div class="receipt-section receipt-meta">',
    '<h2 class="receipt-heading">Receipt</h2>',
    detailRowHTML('Transaction #', transaction.number),
    detailRowHTML('Date &amp; time', formatReceiptDate(transaction.date)),
    '</div>',
    '<div class="receipt-section">',
    '<div class="receipt-columns"><span>Item</span><span>Amount</span></div>',
    '<ul class="receipt-items">' + lineItems + '</ul>',
    '</div>',
    '<div class="receipt-section">',
    detailRowHTML('Subtotal (' + itemCount + (itemCount === 1 ? ' item' : ' items') + ')', formatPeso(transaction.total)),
    detailRowHTML('Total', formatPeso(transaction.total), 'receipt-total'),
    '</div>',
    '<div class="receipt-section">',
    detailRowHTML('Payment method', getPaymentMethodLabel(transaction.paymentMethod)),
    paymentRows,
    '</div>',
    '<footer class="receipt-footer">',
    '<span class="receipt-paid-badge">✓ Payment Successful</span>',
    '<p>Thank you for shopping with Campus Store!</p>',
    '</footer>'
  ].join('');
}

function resetTransaction() {
  appState.cart = [];
  appState.payment = null;
  appState.transaction = null;
  refreshSelection();
  showScreen('selection');
  showToast('New transaction started — previous order cleared');
}

function startCardProcessing() {
  const button = document.getElementById('card-process');
  const status = document.getElementById('card-status');
  if (!button || !status) return;

  button.disabled = true;
  button.textContent = 'Processing payment…';
  status.textContent = 'Processing payment…';

  clearTimeout(cardProcessingTimer);
  cardProcessingTimer = setTimeout(function () {
    const total = calculateTotal(appState.cart);
    appState.payment = {
      method: 'card',
      amountPaid: total,
      change: 0,
    };

    button.disabled = false;
    button.textContent = 'Process Payment';
    status.textContent = '';
    cardProcessingTimer = null;
    showScreen('success');
  }, CARD_PROCESSING_DELAY_MS);
}

function cancelCardProcessing() {
  if (cardProcessingTimer) {
    clearTimeout(cardProcessingTimer);
    cardProcessingTimer = null;
  }

  const button = document.getElementById('card-process');
  const status = document.getElementById('card-status');
  if (button) {
    button.disabled = false;
    button.textContent = 'Process Payment';
  }
  if (status) status.textContent = '';
}

function initCheckout() {
  const qrScreen = document.getElementById('screen-qr');
  const cardScreen = document.getElementById('screen-card');
  const successScreen = document.getElementById('screen-success');
  const receiptScreen = document.getElementById('screen-receipt');

  [
    [qrScreen, renderPaymentTotalsForCheckout],
    [cardScreen, renderPaymentTotalsForCheckout],
    [successScreen, renderSuccessScreen],
    [receiptScreen, renderReceiptScreen],
  ].forEach(function ([screen, renderer]) {
    if (!screen) return;
    new MutationObserver(function () {
      if (screen.classList.contains('active')) renderer();
    }).observe(screen, { attributes: true, attributeFilter: ['class'] });
  });

  document.getElementById('qr-confirm').addEventListener('click', function () {
    const total = calculateTotal(appState.cart);
    appState.payment = {
      method: 'qr',
      amountPaid: total,
      change: 0,
    };
    renderSuccessScreen();
    showScreen('success');
  });

  document.getElementById('qr-back').addEventListener('click', function () {
    showScreen('method');
  });

  document.getElementById('card-process').addEventListener('click', function () {
    startCardProcessing();
  });

  document.getElementById('card-back').addEventListener('click', function () {
    cancelCardProcessing();
    showScreen('method');
  });

  document.getElementById('success-receipt').addEventListener('click', function () {
    renderReceiptScreen();
    showScreen('receipt');
  });

  document.getElementById('new-transaction').addEventListener('click', function () {
    resetTransaction();
  });
}

document.addEventListener('DOMContentLoaded', initCheckout);
