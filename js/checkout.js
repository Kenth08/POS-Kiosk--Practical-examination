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

function renderSuccessScreen() {
  const container = document.getElementById('success-content');
  if (!container) return;

  const transaction = createTransactionOnce();
  const payment = appState.payment || { method: 'cash', amountPaid: transaction.amountPaid, change: transaction.change };

  container.innerHTML = [
    '<div class="success-item"><span class="success-label">Transaction amount</span><span class="success-value">' + formatPeso(transaction.total) + '</span></div>',
    '<div class="success-item"><span class="success-label">Amount paid</span><span class="success-value">' + formatPeso(payment.amountPaid) + '</span></div>',
    '<div class="success-item"><span class="success-label">Change</span><span class="success-value">' + formatPeso(payment.change) + '</span></div>',
    '<div class="success-item"><span class="success-label">Payment method</span><span class="success-value">' + getPaymentMethodLabel(payment.method) + '</span></div>',
    '<div class="success-item"><span class="success-label">Transaction number</span><span class="success-value">' + transaction.number + '</span></div>'
  ].join('');
}

function renderReceiptScreen() {
  const container = document.getElementById('receipt-content');
  if (!container) return;

  const transaction = appState.transaction || createTransactionOnce();
  const receiptDate = new Date(transaction.date).toLocaleString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  const lineItems = transaction.items.map(function (item) {
    return '<li class="receipt-item">' +
      '<span class="receipt-item-name">' + item.name + ' (' + item.quantity + ' × ' + formatPeso(item.price) + ')</span>' +
      '<span class="receipt-item-price">' + formatPeso(item.price) + '</span>' +
      '<span class="receipt-item-subtotal">' + formatPeso(item.subtotal) + '</span>' +
      '</li>';
  }).join('');

  const paymentMethod = getPaymentMethodLabel(transaction.paymentMethod);

  container.innerHTML = [
    '<div class="receipt-header">',
    '<h2>Payment Successful</h2>',
    '<div class="success-item"><span class="success-label">Receipt #</span><span class="success-value">' + transaction.number + '</span></div>',
    '<div class="success-item"><span class="success-label">Date</span><span class="success-value">' + receiptDate + '</span></div>',
    '</div>',
    '<ul class="receipt-items">' + lineItems + '</ul>',
    '<div class="receipt-total-row"><span>Total</span><strong>' + formatPeso(transaction.total) + '</strong></div>',
    '<div class="receipt-total-row"><span>Method</span><span>' + paymentMethod + '</span></div>',
    '<div class="receipt-total-row"><span>Amount paid</span><span>' + formatPeso(transaction.amountPaid) + '</span></div>',
    '<div class="receipt-total-row"><span>Change</span><span>' + formatPeso(transaction.change) + '</span></div>'
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
