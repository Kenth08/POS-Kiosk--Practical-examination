# Touchscreen POS Kiosk System

IT415 – Application Development and Emerging Technologies · Practical Examination

A self-service touchscreen Point of Sale kiosk for a campus store. Customers tap products,
review their order, pay by Cash, QR Payment, or Credit/Debit Card, and receive a digital receipt.

**Transaction flow:** Select Items → Review Order → Select Payment Method → Complete Payment →
Payment Successful → View Receipt → New Transaction

## Features

| Screen | Features | Member |
|---|---|---|
| Item Selection | Welcome banner; category filter (All / Drinks / Food / Snacks); six product cards with name, description, price, and large **+ / −** buttons; order panel with item lines, **+ / − / ×** controls, item subtotals, item count, and automatic total; "Product added" / "Removed" / "Invalid quantity" feedback; Proceed disabled while the order is empty | M2 Repollo (A) |
| Order Summary | Table of items, unit prices, quantities, subtotals, and total; **Back** keeps the order | M1 Pacia (B) |
| Payment Method | Three large options: Cash, QR Payment, Credit/Debit Card | M1 Pacia (B) |
| Cash Payment | On-screen keypad and quick amounts (no typing); rejects blank, invalid, and insufficient amounts with a clear message; exact payment allowed; change computed automatically | M1 Pacia (B) |
| QR / Card Payment, Payment Successful, Receipt, New Transaction | Simulated QR confirmation and card processing (Back cancels), unique transaction number (TXN-YYYY-00001, `localStorage` counter), Payment Successful details, digital receipt, full reset | M3 Guerra (C) |

**Business rules** (all money is stored as whole **centavos** to avoid decimal errors):

- Subtotal = Unit Price × Quantity
- Total = sum of all item subtotals
- Change = Amount Paid − Total (Cash). QR and Card: amount paid = total, change = ₱0.00
- Quantity can never be 0 or negative (− at 1 removes the item); maximum 99 per item

## Technology and data storage

| Part | Choice | Why |
|---|---|---|
| Front end | HTML, CSS, plain JavaScript (no framework, no build step) | Runs in any browser or full-screen on a touch monitor; easy for every member to read and explain |
| Product data | Hard-coded list in `js/products.js` | Allowed by the exam; six products do not need a database |
| Transaction data | In-memory `appState` object (`js/state.js`) | One transaction at a time; cleared by New Transaction |
| Transaction counter | Browser `localStorage` | Keeps transaction numbers unique after a page reload |
| Product images | Emoji icons (hard-coded) | No image files to download, license, or load; works offline |
| Tests | Node.js built-in test runner | Verifies the calculations without extra libraries |

More detail: [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md).

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

**Run the app:** open `index.html` in a browser (double-click it). Press `F11` for a full-screen kiosk.
VS Code users can also right-click `index.html` → **Open with Live Server**.

If you change a JS or CSS file and don't see the change, hard-refresh the browser with `Ctrl+F5`.

**Run the tests:**

```bash
npm test
```

## Project structure

```
index.html              all screens (only one is visible at a time)
css/styles.css          shared design: colors, buttons, and each screen's layout
js/products.js          product catalog (prices in centavos)
js/utils.js             pure helpers: formatPeso, subtotal/total, item count, categories, change, transaction number
js/state.js             shared state for the current transaction (cart, payment, transaction)
js/ui.js                showScreen(), showToast() — shared screen helpers
js/selection.js         Item Selection and order panel            (Member A)
js/payment.js           Order Summary, Payment Method, Cash       (Member B)
js/checkout.js          QR / Card, Success, Receipt, New Transaction (Member C)
js/app.js               startup
tests/                  unit tests (cart, catalog, utils)
docs/                   requirements, AI log, test log, member register, evidence screenshots
```

## Git workflow

- `main` is the integration branch. Nobody commits feature work directly to `main`.
- Each member works on their own feature branch and opens a pull request into `main`.
- Another member reviews and **approves** the pull request before it is merged.
- Member branches and pull requests are recorded in [docs/MEMBER_REGISTER.md](docs/MEMBER_REGISTER.md).

## Group contributions

| ID | Member | GitHub | Role | Branch |
|---|---|---|---|---|
| M1 | Pacia | kurtpacia-bit | Member B — Order Summary, Payment Method, Cash Payment | `feature/payment-cash` |
| M2 | Repollo | Kenth08 | Repository owner; project setup; Member A — Item Selection and order panel; shared UI design | `setup/project-skeleton`, `feature/item-selection` |
| M3 | Jeff Mico Guerra | jeffmico123 | Member C — QR / Card, Payment Successful, Receipt, New Transaction | `member-c-payment-flow` |

## AI-assisted development

AI (Claude) was used for planning, code generation, debugging, refactoring, and documentation.
Every use is recorded with the prompt, the AI's response, our evaluation, what we changed, and how
we tested it: [docs/AI_LOG.md](docs/AI_LOG.md). Test results: [docs/TEST_LOG.md](docs/TEST_LOG.md).
