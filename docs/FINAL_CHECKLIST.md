# Final Verification Checklist

Checked against the exam's instructor tests (pages 7–8) and the Acceptance Checklist.
Status: **PASS** = verified on the stated commit · **PENDING** = waiting for Member C's merge.
Re-run every row on the final `main` commit before the demonstration.

Last checked on branch `feature/item-selection` (includes merged Member B work). Final `main` commit: _(record after last merge)_

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
| 9 | Cash ₱200 for ₱140 | Change ₱60; goes to Payment Successful; exact payment gives ₱0 | PASS (Success screen content PENDING) |
| 10 | Confirmation screen | Amount, method, transaction number, View Receipt | PENDING (Member C) |
| 11 | Receipt (Cash) | Reference, items, qty, prices/subtotals, ₱140, paid ₱200, change ₱60, Cash | PENDING (Member C) |
| 12 | QR Payment | Amount, QR placeholder, confirm; receipt method = QR Payment | PENDING (Member C) |
| 13 | Card Payment | Tap/insert/swipe instruction, processing state; method = Credit/Debit Card | PENDING (Member C) |
| 14 | New Transaction | Empty cart, ₱0 total, previous details cleared | PENDING (Member C) |
| 15 | Two transactions | Different transaction references | PENDING (Member C) |

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
| QR and Card payments simulated | PENDING (Member C) |
| Payment Successful screen; unique transaction reference | PENDING (Member C) |
| View Receipt; correct details and payment method | PENDING (Member C) |
| New Transaction resets the application | PENDING (Member C) |
| Meaningful user feedback | PASS for A/B screens; C PENDING |

## Development process

| Evidence | Status |
|---|---|
| Shared repository, cloned and used locally | PASS |
| ≥ 7 real stages in history (setup, interface, core, validation, bug fix, refactor, docs) | PASS (see `git log`) |
| Feature branches per member, pushed | A and B PASS; C PENDING |
| Pull requests name source and target branch | PR #1, #2 PASS; Member A PR to open; C PENDING |
| Review **before** merge (Approve) | **Gap:** PR #1 and #2 merged without an Approve review. Member A and C PRs must be approved before merge. |
| Final demo matches final integration commit | PENDING |
| README: setup, technology, storage, contributions | PASS (Member C details to add) |
| AI prompts, responses, evaluations, modifications documented | A and B PASS; C PENDING |
