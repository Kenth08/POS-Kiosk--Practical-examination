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
