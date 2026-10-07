# Touchscreen POS Kiosk System

IT415 – Application Development and Emerging Technologies · Practical Examination

A self-service touchscreen Point of Sale kiosk for a campus store. Customers tap products,
review their order, pay by Cash, QR Payment, or Credit/Debit Card, and receive a digital receipt.

> Status: in development. Sections marked _(TBD)_ are completed as features are merged.

## Technology

| Part | Choice |
|---|---|
| Front end | HTML, CSS, plain JavaScript (no framework, no build step) |
| Product data | Hard-coded in `js/products.js` |
| Storage | In-memory app state; `localStorage` for the transaction counter only |
| Tests | Node.js built-in test runner |

Reasons for these choices are in [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md#8-technology-and-data-storage-choices).

## Requirements

- A modern browser (Chrome, Edge, or Firefox)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) 18 or newer — **only** needed to run the tests

No packages need to be installed (`npm install` is not required).

## Setup and run

```bash
git clone https://github.com/Kenth08/POS-Kiosk--Practical-examination.git
cd POS-Kiosk--Practical-examination
```

Run the app: open `index.html` in a browser (double-click it). For a kiosk feel, press `F11` for full screen.

If you change a JS or CSS file and don't see the change, hard-refresh the browser with `Ctrl+F5`.

Run the tests:

```bash
npm test
```

## Project structure

```
index.html            all screens (only one is visible at a time)
css/styles.css        kiosk styling
js/products.js        product catalog
js/utils.js           pure helper functions (money formatting, calculations)
js/state.js           shared state for the current transaction
js/ui.js              showScreen(), showToast() — shared screen helpers
js/selection.js       Item Selection and cart
js/payment.js         Order Summary, Payment Method, Cash payment
js/checkout.js        QR / Card payment, Payment Successful, Receipt, New Transaction
js/app.js             startup
tests/                unit tests
docs/                 requirements, AI log, test log, member register
```

## Features

_(TBD — filled in as each feature is merged)_

## Git workflow

- `main` is the integration branch.
- Each member works on their own feature branch and opens a pull request into `main`.
- Another member reviews each pull request before it is merged.

## Group contributions

_(TBD — see [docs/MEMBER_REGISTER.md](docs/MEMBER_REGISTER.md))_

## AI-assisted development

See [docs/AI_LOG.md](docs/AI_LOG.md).
