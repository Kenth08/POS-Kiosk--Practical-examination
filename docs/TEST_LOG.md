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
