// Screens 2–3 — Order Summary, Payment Method, Cash Payment.
// Owner: Member B
// Responsibilities: summary table, Back (keeps cart), method buttons,
// cash keypad / quick amounts, insufficient & invalid cash validation, change.

function getOrderTotal() {
	return appState.cart.reduce(function (total, item) {
		return total + item.price * item.quantity;
	}, 0);
}

function renderOrderSummary() {
	const container = document.getElementById('summary-content');
	const continueButton = document.getElementById('summary-continue');
	container.replaceChildren();

	if (appState.cart.length === 0) {
		const emptyMessage = document.createElement('p');
		emptyMessage.textContent = 'Your order is empty. Add items before continuing.';
		container.appendChild(emptyMessage);
		continueButton.disabled = true;
		return;
	}

	const table = document.createElement('table');
	const head = table.createTHead().insertRow();
	['Item', 'Unit price', 'Quantity', 'Subtotal'].forEach(function (label) {
		const cell = document.createElement('th');
		cell.scope = 'col';
		cell.textContent = label;
		head.appendChild(cell);
	});

	const body = table.createTBody();
	appState.cart.forEach(function (item) {
		const row = body.insertRow();
		[item.name, formatPeso(item.price), String(item.quantity), formatPeso(item.price * item.quantity)]
			.forEach(function (value) {
				row.insertCell().textContent = value;
			});
	});

	const total = document.createElement('p');
	total.textContent = 'Total: ' + formatPeso(getOrderTotal());
	container.append(table, total);
	continueButton.disabled = false;
}

function renderPaymentTotals() {
	const total = formatPeso(getOrderTotal());
	document.getElementById('method-total').textContent = 'Total due: ' + total;
	document.getElementById('cash-total').textContent = 'Total due: ' + total;
}

function parseCashAmount(value) {
	const amount = value.trim();
	if (!/^\d+(?:\.\d{0,2})?$/.test(amount)) return null;

	const parts = amount.split('.');
	const pesos = Number(parts[0]);
	const centavos = Number((parts[1] || '').padEnd(2, '0'));
	const total = pesos * 100 + centavos;
	return Number.isSafeInteger(total) ? total : null;
}

function setCashError(message) {
	document.getElementById('cash-error').textContent = message;
}

function initPayment() {
	const summaryScreen = document.getElementById('screen-summary');
	new MutationObserver(function () {
		if (summaryScreen.classList.contains('active')) renderOrderSummary();
	}).observe(summaryScreen, { attributes: true, attributeFilter: ['class'] });

	document.getElementById('summary-back').addEventListener('click', function () {
		showScreen('selection');
	});
	document.getElementById('summary-continue').addEventListener('click', function () {
		if (appState.cart.length === 0) return;
		renderPaymentTotals();
		showScreen('method');
	});
	document.getElementById('method-back').addEventListener('click', function () {
		showScreen('selection');
	});
	document.getElementById('cash-back').addEventListener('click', function () {
		setCashError('');
		showScreen('method');
	});

	document.querySelectorAll('[data-payment-method]').forEach(function (button) {
		button.addEventListener('click', function () {
			const method = button.dataset.paymentMethod;
			if (method === 'cash') {
				document.getElementById('cash-amount').value = '';
				setCashError('');
				renderPaymentTotals();
				showScreen('cash');
			} else {
				showScreen(method);
			}
		});
	});

	document.querySelectorAll('[data-cash-key]').forEach(function (button) {
		button.addEventListener('click', function () {
			const input = document.getElementById('cash-amount');
			const key = button.dataset.cashKey;
			if (key === 'clear') input.value = '';
			else if (key === 'backspace') input.value = input.value.slice(0, -1);
			else if (key !== '.' || !input.value.includes('.')) input.value += key;
			setCashError('');
		});
	});

	document.querySelectorAll('[data-cash-quick]').forEach(function (button) {
		button.addEventListener('click', function () {
			const value = button.dataset.cashQuick;
			document.getElementById('cash-amount').value = value === 'exact'
				? (getOrderTotal() / 100).toFixed(2)
				: value;
			setCashError('');
		});
	});

	document.getElementById('cash-form').addEventListener('submit', function (event) {
		event.preventDefault();
		const amountPaid = parseCashAmount(document.getElementById('cash-amount').value);
		const total = getOrderTotal();
		const change = amountPaid === null ? null : calculateChange(amountPaid, total);

		if (amountPaid === null) {
			setCashError('Enter a valid nonnegative amount.');
			return;
		}
		if (change === null) {
			setCashError('Insufficient payment. Please enter at least ' + formatPeso(total) + '.');
			return;
		}

		appState.payment = { method: 'cash', amountPaid: amountPaid, change: change };
		setCashError('');
		showScreen('success');
	});
}

document.addEventListener('DOMContentLoaded', initPayment);
