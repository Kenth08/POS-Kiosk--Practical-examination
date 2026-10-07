# Requirements Analysis — Touchscreen POS Kiosk System

IT415 – Application Development and Emerging Technologies · Practical Examination

## 1. Problem

A small campus food and merchandise outlet currently relies on a cashier who manually
encodes orders and computes totals. The outlet wants a touchscreen self-service kiosk
where customers order and pay on their own.

## 2. Target users

| User | Needs |
|---|---|
| Customer (primary) | Order quickly by tapping, see totals automatically, pay with Cash / QR / Card, get a receipt |
| Store staff (secondary) | Accurate totals and a transaction reference for each sale |

Cashier/Admin login is an optional enhancement and is **not** in scope.

## 3. Required transaction flow

1. Item Selection — tap products and adjust quantities
2. Order / Payment Summary — review the complete order
3. Payment Method — Cash, QR Payment, or Credit/Debit Card
4. Payment Processing — validate and complete the selected payment
5. Payment Successful — confirmation and transaction number
6. Receipt — display the completed transaction
7. New Transaction — reset and return to Item Selection

## 4. Inputs and outputs

| Inputs | Outputs |
|---|---|
| Tap product card | Cart line (name, unit price, quantity, subtotal) |
| + / − / remove buttons | Updated subtotal and total |
| Back / Continue buttons | Order summary |
| Payment method button | Payment screen for that method |
| Cash amount (on-screen keypad / quick amounts) | Change, or a validation message |
| QR "Confirm Payment" / Card "Process Payment" | Processing state, Payment Successful |
| View Receipt / New Transaction | Receipt; empty Item Selection screen |

## 5. Business rules and calculations

- `Subtotal = Unit Price × Quantity`
- `Total = sum of all subtotals`
- `Change = Amount Paid − Total` (Cash only)
- QR and Card: amount paid = total, change = ₱0.00
- Quantity can never be negative.
- Cash that is blank, non-numeric, negative, or below the total is rejected; the customer
  stays on the payment screen with a clear message (e.g. "Insufficient payment. Please enter at least ₱140.00").
- Exact cash payment is valid and gives ₱0.00 change.
- An incomplete or invalid payment never produces a success screen or receipt.
- Each completed transaction gets a unique reference number.
- New Transaction clears cart, payment, receipt and total.

## 6. Required functions (from exam, page 5)

1. Display at least six selectable products
2. Select products by clicking/tapping
3. Quantity adjustment
4. Removal of products
5. Automatic item subtotals
6. Automatic transaction total
7. Order Summary
8. Return and modify the order
9. At least three payment method buttons
10. Process Cash payment
11. Validate insufficient Cash payment
12. Calculate correct change
13. Simulate QR payment
14. Simulate Credit/Debit Card payment
15. Payment Successful confirmation
16. Generate and display a transaction number
17. Digital receipt
18. Start a new transaction
19. Properly reset the application
20. Meaningful user feedback

## 7. Touchscreen constraints

Large buttons and readable text, clear item cards, enough spacing, simple navigation,
clear Back and Continue controls, minimal typing (product names are never typed;
cash is entered with an on-screen keypad), no tiny links or desktop-only interactions.

## 8. Technology and data storage choices

| Choice | Decision | Reason |
|---|---|---|
| Application type | Web app (HTML, CSS, plain JavaScript) | Runs in any browser or full-screen on a touch monitor; no install or build step; easy for every member to read and explain |
| Product data | Hard-coded list in `js/products.js` | Allowed by the exam; six products do not need a database |
| Transaction state | In-memory `appState` object (`js/state.js`) | One transaction at a time; cleared on New Transaction |
| Transaction counter | Browser `localStorage` | Keeps transaction numbers unique even after a page reload |
| Money | Integer centavos (e.g. 4500 = ₱45.00) | Avoids floating-point errors such as 0.1 + 0.2 = 0.30000000000000004 |
| Testing | Node.js built-in test runner (`npm test`) | Verifies calculation logic without extra libraries |
| Version control | Git + GitHub (shared repo, feature branches, pull requests) | Required by the exam |

## 9. Feature ownership

| Area | Owner | Files |
|---|---|---|
| Project setup / shared skeleton | Repo owner | `index.html`, `css/styles.css`, `js/products.js`, `js/utils.js`, `js/state.js`, `js/ui.js`, `js/app.js` |
| Item Selection and cart | Member A | `js/selection.js` |
| Order Summary, Payment Method, Cash | Member B | `js/payment.js` |
| QR, Card, Success, Receipt, Reset | Member C | `js/checkout.js` |

Member names and branches are recorded in [MEMBER_REGISTER.md](MEMBER_REGISTER.md).
