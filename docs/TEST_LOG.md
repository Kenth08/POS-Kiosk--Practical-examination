# Test Log

Record each test when it is actually run. Result: PASS / FAIL (describe the problem).

| Date | Task | Test | Expected | Result | Tested by |
|---|---|---|---|---|---|
| | Task 1 | `npm test` | 3 tests pass | | |
| | Task 1 | Open `index.html` | Header, 4 steps, Item Selection placeholder; step "1 Order" highlighted | | |
| | Task 1 | Console: `showScreen('summary')` | Review screen shows; "1 Order" done, "2 Review" highlighted | | |
| | Task 1 | Console: `showScreen('xyz')` | Error in console; current screen stays | | |
| | Task 1 | Console: `showToast('Product added')` | Dark message appears at bottom, disappears after ~2.5 s | | |
| | Task 1 | Console: `showToast('Insufficient payment', 'error')` | Red message appears | | |
| 2026-10-07 | Task 3 | `npm test` | 9 tests pass (6 new cart tests) | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Task 3 | Instructor test 1: open app | 6 cards with names + prices; Proceed disabled; total ₱0.00 | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Task 3 | Instructor test 2: Coffee ×2, Sandwich ×1, Soft Drink ×1 | Subtotals ₱90, ₱50, ₱35; total ₱175; "Product added" toast | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Task 3 | Instructor test 3: Coffee + then − | ₱135 / total ₱220, then back to ₱175 | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Task 3 | Instructor test 4: remove Soft Drink | Line disappears; total ₱140; "Removed" toast | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Task 3 | − at quantity 1 | Item removed; quantity never 0/negative | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Task 3 | + at quantity 99 | Stays 99; "Invalid quantity — maximum is 99" | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Task 3 | Proceed to Payment → then back to selection | Opens Review screen; items, quantities and badges preserved | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Task 3 | Phone width (375 px) | No sideways scrolling; cart below products | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Task 6 | All 6 products added at 1024×768 | Total ₱290.00; cart scrolls; Proceed visible | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Task 6 | Tab to + and press Enter twice | Focus stays on +; quantity rises each time | FAIL before fix (focus → BODY); PASS after fix | AI; member to re-run |
| 2026-10-07 | Task 6 | Tab to a product card and press Enter twice | Focus stays on card; quantity 2 | FAIL before fix; PASS after fix | AI; member to re-run |
| 2026-10-07 | Task 6 | Regression: instructor tests 2–6 | ₱175 / ₱220 / ₱175 / ₱140; cart kept after Back | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Task 7 | Rendered HTML before vs after refactor (3 states) | Identical | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Task 7 | Regression: instructor tests 2–6, − at 1, focus kept, 99 limit | Same results as before refactor | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Redesign | Screenshots at 1280×800, 1024×768, 390×844 | Layout fits; no sideways scroll; cart beside products on kiosk sizes | PASS (AI run) — see docs/evidence/ | AI; member to re-check |
| 2026-10-07 | Redesign | Regression: instructor tests 1–6, − at 1, focus, 99 limit | Same results as before redesign | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Integration (A+B) | After merging main: `npm test` | 11 pass (A: 9, B: 2) | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Integration (A+B) | Instructor test 5–6: Proceed → Summary → Back | Summary shows Coffee ×2 ₱90, Sandwich ×1 ₱50, total ₱140; Back keeps cart | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Integration (A+B) | Instructor test 7: Continue to payment | Method screen "Total due: ₱140.00", 3 options | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Integration (A+B) | Instructor test 8: Cash ₱100 for ₱140 | Stays on Cash; "Insufficient payment. Please enter at least ₱140.00."; no payment saved | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Integration (A+B) | Blank cash | "Enter a valid nonnegative amount." | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Integration (A+B) | Instructor test 9: Cash ₱200 for ₱140 | change 6000 centavos (₱60.00); goes to Success screen (placeholder, Member C) | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Menu UI | `npm test` | 15 pass (4 new catalog tests) | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Menu UI | Tap Drinks / Snacks / All | Drinks: Coffee, Soft Drink, Bottled Water; Snacks: Cookies, Chocolate; All: 6 | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Menu UI | Filter while Sandwich is in cart | Cart and total ₱175 unchanged | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Menu UI | Regression: instructor tests 2–6 | ₱175 / ₱220 / ₱175 / ₱140; summary matches; Back keeps cart | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Card buttons | Tap card body / product name | Nothing is added | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Card buttons | Tap "+" on Coffee | Added; card shows "− 1 +"; toast "Product added — Coffee" | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Card buttons | Card "−" at quantity 1 | Item removed; card shows "+" again | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Order list | Add all 6 products at 1920×1080 | All 6 lines visible; Proceed visible | FAIL before (only ~3 visible); PASS after | Member found; AI fixed |
| 2026-10-07 | Order list | Add all 6 products at 1280×800 | Newest line scrolled into view; fade shows hidden lines | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Final integration (`050aa5b`) | `npm test` | 16 pass (A, B, C helpers) | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Final integration (`050aa5b`) | Instructor tests 1–7 | ₱175 / ₱220 / ₱140; summary matches; Back keeps order; 3 methods | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Final integration (`050aa5b`) | Instructor test 8: Cash ₱100 for ₱140 | Rejected; stays on Cash; no transaction created | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Final integration (`050aa5b`) | Instructor tests 9–11: Cash ₱200 | Change ₱60; success shows amount/paid/change/method/TXN; receipt correct | PASS (AI run) — docs/evidence/success-cash.png, receipt-cash.png | AI; member to re-run |
| 2026-10-07 | Final integration (`050aa5b`) | Instructor test 12: QR | QR placeholder + confirm; receipt method QR Payment; change ₱0 | PASS (AI run) — docs/evidence/qr-payment.png | AI; member to re-run |
| 2026-10-07 | Final integration (`050aa5b`) | Instructor test 13: Card | Processing state, button disabled; Back cancels; method Credit/Debit Card; change ₱0 | PASS (AI run) — docs/evidence/card-processing.png | AI; member to re-run |
| 2026-10-07 | Final integration (`050aa5b`) | Instructor test 14: New Transaction | Empty cart, ₱0, payment/transaction cleared, toast | PASS (AI run) | AI; member to re-run |
| 2026-10-07 | Final integration (`050aa5b`) | Instructor test 15 + exact cash | TXN-2026-00001 to 00004 all different; exact cash gives ₱0 change | PASS (AI run) | AI; member to re-run |
