# Final Verification Checklist

Checked against the exam's instructor tests (pages 7–8) and the Acceptance Checklist.
Status: **PASS** = verified on the stated commit · **GAP** = missing evidence.
Re-run every row on the final `main` commit before the demonstration.

Last checked on `main` commit **`050aa5b`** (all three members' features merged, PR #4), 2026-10-07, in headless Edge at 1280×800 plus `npm test` (16 pass).

## Instructor tests

| # | Test | Expected | Status |
|---|---|---|---|
| 1 | Startup and touch selection | ≥ 6 products with names and prices; large controls; no typing | PASS |
| 2 | Add Coffee ×2, Sandwich ×1, Soft Drink ×1 | Subtotals ₱90 / ₱50 / ₱35; total ₱175 | PASS |
| 3 | Coffee 2 → 3 → 2 | ₱135 and total ₱220, then ₱175; never negative | PASS |
| 4 | Remove Soft Drink | Total ₱140 | PASS |
| 5 | Order Summary | Coffee ₱90, Sandwich ₱50, total ₱140 — matches Item Selection | PASS |
| 6 | Back from Summary | Items and quantities preserved and editable | PASS |
| 7 | Payment Method | Cash, QR Payment, Credit/Debit Card as large options | PASS |
| 8 | Cash ₱100 for ₱140 | Rejected with clear message; stays on Cash; no receipt | PASS |
| 9 | Cash ₱200 for ₱140 | Change ₱60; goes to Payment Successful; exact payment gives ₱0 | PASS |
| 10 | Confirmation screen | Amount, method, transaction number, View Receipt | PASS — ₱140 / ₱200 / ₱60 / Cash / TXN-2026-00001 |
| 11 | Receipt (Cash) | Reference, items, qty, prices/subtotals, ₱140, paid ₱200, change ₱60, Cash | PASS |
| 12 | QR Payment | Amount, QR placeholder, confirm; receipt method = QR Payment | PASS — paid = total, change ₱0 |
| 13 | Card Payment | Tap/insert/swipe instruction, processing state; method = Credit/Debit Card | PASS — button disabled while processing; Back cancels |
| 14 | New Transaction | Empty cart, ₱0 total, previous details cleared | PASS |
| 15 | Two transactions | Different transaction references | PASS — TXN-2026-00001 to 00004 |

## Acceptance checklist (functional)

| Requirement | Status |
|---|---|
| Application runs; touchscreen-oriented UI; large item cards | PASS |
| At least six products with prices; selectable by tapping | PASS |
| Quantity increase / decrease; item removal | PASS |
| Item subtotal and total correct | PASS |
| Order Summary; user can go back and modify | PASS |
| At least three payment methods | PASS |
| Cash works; insufficient cash rejected; change correct | PASS |
| QR and Card payments simulated | PASS |
| Payment Successful screen; unique transaction reference | PASS |
| View Receipt; correct details and payment method | PASS |
| New Transaction resets the application | PASS |
| Meaningful user feedback | PASS |

## Development process

| Evidence | Status |
|---|---|
| Shared repository, cloned and used locally | PASS |
| ≥ 7 real stages in history (setup, interface, core, validation, bug fix, refactor, docs) | PASS (see `git log`) |
| Feature branches per member, pushed | PASS — `feature/item-selection`, `feature/payment-cash`, `member-c-payment-flow` |
| Pull requests name source and target branch | PASS — PR #1 to #4 |
| Review **before** merge (Approve) | **GAP** — PR #1 to #4 have no Approve review. PR #4 (Member C) was opened and merged by Kenth08. |
| Final demo matches final integration commit | Demo from `main`; app code final at `050aa5b` (later commits are docs only) |
| README: setup, technology, storage, contributions | PASS |
| AI prompts, responses, evaluations, modifications documented | A and B PASS; **GAP** — no Member C entry yet; members' own evaluation fields not filled |

Known minor issue (Member C, cosmetic): receipt lines show the unit price twice, e.g. "Coffee (2 × ₱45.00) ₱45.00 ₱90.00".
