# AI-Assisted Development Log

Every time AI helps with the project, add an entry. Record it right after the AI use.

**AI tool used:** Claude (Claude Code, Anthropic)

Entry template:

```
## AI-<number> — <short title>
- Date:
- Member responsible:
- Type: requirements / generation / debugging / refactoring / documentation
- Problem / context:
- Prompt used:
- AI response (summary):
- Code or files produced:
- Our evaluation (correct? matches assignment? too complex?):
- What we changed and why:
- Verification / test results:
```

---

## AI-1 — Requirements analysis and project roadmap
- Date: 2026-10-07
- Member responsible: Repollo (M2)
- Type: requirements
- Problem / context: We needed to understand the full exam (exam PDF, sample UI, acceptance
  checklist, instructor development-process checklist) and plan the work for 3 members.
- Prompt used: A long instruction asking the AI to analyze the assignment, list all requirements,
  inputs/outputs, technology, risks, a roadmap, a 3-member task division, and a mapping to the
  instructor checklist — then stop and wait for approval before coding. The exam files were attached.
- AI response (summary): Listed the 7-step flow, 20 required functions, 15 instructor tests,
  calculation and validation rules. Recommended HTML/CSS/plain JS with hard-coded products,
  localStorage only for the transaction counter, and centavo-based money. Proposed an 11-task
  roadmap and a split by transaction flow (A: selection/cart, B: summary/method/cash,
  C: QR/card/success/receipt/reset).
- Code or files produced: none (planning only); later written up as `docs/REQUIREMENTS.md`.
- Our evaluation: _(member to fill: did the plan match the exam? anything missing or unnecessary?)_
- What we changed and why: _(member to fill)_
- Verification / test results: Cross-checked the requirement list against exam pages 1–8 and the
  Acceptance Checklist. _(member to confirm)_

## AI-2 — Project skeleton (Task 1)
- Date: 2026-10-07
- Member responsible: Repollo (M2)
- Type: generation
- Problem / context: All three members need a shared structure before building features in
  parallel, so that each member edits only their own file and merge conflicts are avoided.
- Prompt used: "Approved" (continuing the roadmap) — AI was asked to perform Task 1: repository
  setup and project skeleton.
- AI response (summary): Created `index.html` with all 8 screens as hidden sections, shared
  `state.js` (one `appState` object), `ui.js` (`showScreen`, `updateStepper`, `showToast`),
  `products.js` (6 products in centavos), `utils.js` (`formatPeso`), base kiosk CSS, empty
  feature files per member, Node tests, and docs.
- Code or files produced: see Task 1 commit / PR.
- Our evaluation: The AI added a separate `ui.js` that was not in the original roadmap (roadmap
  only listed `state.js`). This keeps state (data) separate from screen helpers (DOM), which is
  a cleaner separation. _(member to add own evaluation)_
- Issue found during verification: the AI's first `package.json` test script was
  `node --test tests/`. Running `npm test` failed with
  `Error: Cannot find module '...\tests'` — on Node.js v24, a folder path given to
  `node --test` is treated as a single file to run, not a folder to search.
  Fix: changed the script to `node --test "tests/**/*.test.js"` (a file pattern).
  Re-run result: 3 tests pass, 0 fail.
- Issue found during browser testing at a narrow (phone/tablet) width:
  (1) the header step labels wrapped ("1" above "Order") and overflowed sideways;
  (2) a long toast message was squeezed into a narrow blob because the toast width was
  limited to half the screen. Fix: `white-space: nowrap` on steps and `flex-wrap: wrap`
  on the stepper for small screens; `width: max-content; max-width: calc(100% - 32px)`
  on the toast. Re-checked: no horizontal scrolling, toast readable.
- What we changed and why: _(member to fill after review)_
- Verification / test results: _(record results from docs/TEST_LOG.md)_

## AI-3 — Item Selection screen and cart (Task 3)
- Date: 2026-10-07
- Member responsible: Repollo (M2) — Member A, branch `feature/item-selection`
- Type: generation
- Problem / context: Build Screen 1: six tappable product cards, a cart with + / − / remove,
  automatic subtotals and total, feedback messages, and a Proceed to Payment button.
- Prompt used: "A, and you pick" (chose role A and let the AI pick the branch name), then
  "continue the project" — AI was asked to perform Task 3 from the roadmap.
- AI response (summary): Built it in two stages.
  Stage 1 (interface): card grid and cart panel markup/CSS; `renderProducts()` and `renderCart()`.
  Stage 2 (logic): `addToCart()`, `changeQuantity()`, `removeFromCart()`, `refreshSelection()`,
  event delegation in `initSelection()`; pure functions `calculateSubtotal()`,
  `calculateTotal()`, `countItems()` in `utils.js` with 6 unit tests.
- Code or files produced: `index.html` (selection section), `css/styles.css`, `js/selection.js`,
  `js/utils.js`, `js/app.js`, `tests/cart.test.js`. Commits `296355d`, `86c3496`.
- Our evaluation:
  - Matches exam: ≥6 products with name + price, tap to add, quantity controls, removal,
    automatic subtotal/total, cart beside products, Proceed button.
  - Design decision: pressing − at quantity 1 removes the item (instead of leaving a 0 line),
    so quantity can never be 0 or negative.
  - Added a 99-per-item limit with "Invalid quantity" feedback (the exam lists
    "Invalid quantity" as an example message). Inventory/stock is NOT implemented (optional).
  - Product categories filter from the sample UI was left out — optional, not required.
  - Known limitation: on phone-width screens the cart is below the products (scroll down).
    The kiosk target is a large touch screen, where the cart is beside the products.
  - _(member to add own evaluation)_
- What we changed and why: _(member to fill after review)_
- Verification / test results: `npm test` 9 pass, 0 fail. Browser click-tests of instructor
  tests 1–4 and 6 all matched expected values (see TEST_LOG.md).

## AI-4 — Debugging: keyboard focus lost after cart redraw (Task 6)
- Date: 2026-10-07
- Member responsible: Repollo (M2) — Member A, branch `feature/item-selection`
- Type: debugging
- Problem / context: Testing pass on the Item Selection screen at kiosk size (1024×768).
- Prompt used: "continue" — AI was asked to perform Task 6 (test pass + fix real bugs) for Member A.
- Error found (reproduced): Focus a product card or the + button and press Enter. The action
  works, but `document.activeElement` becomes `BODY`, so pressing Enter again does nothing and the
  user must Tab through the page again. Measured result before fix:
  `focusAfterPlus: "BODY"`, `focusAfterCardTap: "BODY"`.
- Cause: `refreshSelection()` rebuilds all cards and cart buttons with `innerHTML`, so the focused
  button is deleted and replaced by a new, unfocused copy.
- AI response / fix: Before redrawing, `getFocusedButtonSelector()` records the focused button as a
  selector (product id + action); after redrawing, `restoreFocus()` focuses the new copy.
- Our evaluation: Small, contained fix (two helper functions) instead of rewriting rendering to
  update elements in place, which would be more complex. When an item is removed, its buttons no
  longer exist, so focus returns to the page — acceptable.
- Problem during verification: the first re-test still showed `BODY`. Cause: the browser was using a
  cached old copy of `selection.js` (`typeof getFocusedButtonSelector` was `undefined`). After a hard
  reload the new code loaded. Lesson: hard-refresh (Ctrl+F5) after changing JS files.
- Verification / test results: After fix — card tap keeps focus on the card (Enter again → qty 2);
  + keeps focus on + (Enter again → qty 4). Regression: instructor tests 2–6 still give
  ₱175 / ₱220 / ₱175 / ₱140, Proceed and Back preserve the cart; `npm test` 9 pass, 0 fail.
- Other checks in this pass with no bug found: all 6 products in cart at 1024×768 (total ₱290.00
  correct; cart list scrolls; Proceed stays visible).
- What we changed and why: _(member to fill after review)_

## AI-5 — Refactoring: cart rendering and duplicated quantity check (Task 7)
- Date: 2026-10-07
- Member responsible: Repollo (M2) — Member A, branch `feature/item-selection`
- Type: refactoring
- Problem / context: Code review of `js/selection.js` after the feature and bug fix were done.
- Prompt used: "next" — AI was asked to perform Task 7 (refactoring review) for Member A.
- Original code (problems):
  1. `renderProducts()` / `renderCart()` built HTML with long chains such as
     `'<span class="product-name">' + product.name + '</span>' +` — hard to read and easy to break.
  2. The 99-per-item limit and its "Invalid quantity" message were written twice
     (in `addToCart()` and in `changeQuantity()`).
- AI response / improvement:
  1. New `productCardHTML(product)` and `cartItemHTML(item)` using template literals
     (`` `<span class="product-name">${product.name}</span>` ``); `renderProducts()` became one line.
  2. `addToCart()` now calls `changeQuantity(productId, 1)` for items already in the cart;
     `changeQuantity()` returns `true`/`false` so `addToCart()` knows whether to show "Product added".
- Our evaluation: Readability gain is clear. The second change adds a return value to
  `changeQuantity()`, which is slightly more to explain, but removes duplicated validation.
  We did NOT change the redraw-everything approach — it is simple and fast enough for 6 products.
- Behavior verification:
  - Before refactoring, saved the exact rendered HTML for 3 states (empty cart; ₱175 order;
    item at 99 with rejected tap). After refactoring, all 3 matched (ignoring whitespace between
    tags): `identical: [true, true, true]`.
  - Instructor tests 2–6 still ₱175 / ₱220 / ₱175 / ₱140; − at 1 removes; focus fix still works.
  - `npm test`: 9 pass, 0 fail.
- What we changed and why: _(member to fill after review)_

## AI-6 — UI redesign from a reference design (Item Selection)
- Date: 2026-10-07
- Member responsible: Repollo (M2) — Member A, branch `feature/item-selection`
- Type: generation (UI/styling)
- Problem / context: The group chose a final visual style: a reference image of a restaurant POS
  dashboard ("POSPRO": white cards, orange accent, food photos, order panel with thumbnails,
  order summary).
- Prompt used: "this is the final UI for this project make this as professional designer or
  programmer" (with the reference image attached).
- AI response (summary): Proposed copying the visual style only, and flagged parts of the reference
  that conflict with the exam. Asked two questions (image source, scope).
- Our decisions:
  - Images: AI offered free Unsplash photos (picked 6, checked license, avoided brand logos) and
    asked permission before downloading. **We declined** and kept the hard-coded emoji icons —
    no external files, nothing to license or credit, works offline.
  - Scope: kept kiosk-only. **Not copied:** cashier sidebar (Dashboard/Transactions/Inventory),
    customer name and table inputs (exam requires minimal typing), service fee and discount
    (would change totals — instructor tests expect ₱175 / ₱220 / ₱140), `$` currency.
  - Category tabs from the reference were not added (optional enhancement, not chosen).
- Code or files produced: `css/styles.css` (new tokens and styles for header, cards, order panel),
  `index.html` (Order Summary block), `js/selection.js` (category line on cards, thumbnail in cart
  lines, Items count in summary).
- Our evaluation: Colors/tokens changed in the shared stylesheet, so Members B and C get the same
  look automatically if they reuse `.btn`, `.btn-primary`, and the CSS variables.
  The cart line now looks up the product icon from `PRODUCTS` instead of storing it in the cart,
  so the shared cart format `{ productId, name, price, quantity }` did not change.
- Verification / test results: Full-resolution screenshots at 1280×800, 1024×768 and 390×844
  (saved in `docs/evidence/`). Functional regression: instructor tests 1–6, − at 1, focus fix,
  99 limit all unchanged; `npm test` 9 pass, 0 fail.
- What we changed and why: _(member to fill after review)_

## AI-7 — Order summary and cash payment (Member B)
> Written by Pacia (M1) on `feature/payment-cash` as "AI-3". Renumbered to AI-7 when
> `main` was merged into `feature/item-selection`, because both branches had used AI-3.
> Content unchanged.
- Date: 2026-10-07
- Member responsible: Member B
- Type: generation
- Problem / context: Implement the assigned Order Summary, Payment Method, and Cash Payment
  screens; follow requirements section 5 and use centavos for money.
- Prompt used: "You're Member B: Order Summary, Payment Method, Cash Payment. Clone the repo, then
  create your branch: git switch -c feature/payment-cash → git push -u origin feature/payment-cash
  Only edit js/payment.js, your 3 sections in index.html (summary, method, cash), and add
  calculateChange() to js/utils.js with a test. Commit small steps with clear messages. When done,
  open a PR into main and request my review. Don't merge until I approve. Record every AI prompt you
  use in docs/AI_LOG.md (prompt, answer, what you changed, how you tested). Read docs/REQUIREMENTS.md
  section 5 for the cash rules."
- AI response (summary): Inspected the clean main checkout and section 5, created the feature
  branch, and implemented the summary, payment methods, keypad/quick amounts, cash validation,
  centavo-based change calculation, and tests.
- Code or files produced: `index.html`, `js/payment.js`, `js/utils.js`, `tests/utils.test.js`.
- Our evaluation: Uses the existing app state and screen helpers; invalid or insufficient cash
  stays on the payment screen, and exact payment is accepted.
- What we changed and why: Added the order review table and navigation, payment method choices,
  on-screen cash keypad and quick amounts, validation messages, and change handoff through
  `appState.payment` so Member C's success screen can consume a valid payment.
- Verification / test results: `node --test tests/utils.test.js` passed (5 tests); `node --check`
  passed for `js/payment.js` and `js/utils.js`; editor diagnostics found no errors. Browser flow
  check confirmed ₱100 against a ₱140 total stays on cash with an insufficient-payment message,
  and exact payment advances with `change: 0`.

## AI-8 — Shared design applied to Member B's screens
- Date: 2026-10-07
- Member responsible: Repollo (M2) — owner of the shared stylesheet and UI redesign (AI-6)
- Type: generation (styling)
- Problem / context: After merging Member B's screens, the Summary, Payment Method and Cash screens
  worked correctly but had no layout styling (plain table, tiny input, keypad on one row, error
  not red). The group wanted the whole app to look professional and consistent.
- Prompt used: "its all okay but the ui is so not professional"
- AI response (summary): Added CSS for the three screens that targets Member B's existing ids and
  data attributes, so Member B's `payment.js` and HTML did not change (keeps authorship clear).
  Payment tiles get their icon and description from CSS `::before` / `::after`.
- Our evaluation: CSS-only approach avoids editing another member's files. Trade-off: the tile
  descriptions live in CSS, so screen readers may not read them; the button labels (Cash /
  QR Payment / Credit / Debit Card) are still read correctly.
  The earlier review request to Member B about styling is now covered by this change.
- Verification / test results: Integration flow re-run in headless Edge — summary ₱140, Back keeps
  cart, ₱100 rejected, blank rejected, ₱200 → change ₱60; no JS errors; `npm test` 11 pass.
  Screenshots saved in `docs/evidence/` (summary-screen, payment-method-screen, cash-insufficient).
- What we changed and why: _(member to fill after review)_

## AI-9 — Menu-style Item Selection from a second UI reference
- Date: 2026-10-07
- Member responsible: Repollo (M2) — Member A, branch `feature/item-selection`
- Type: generation (UI + category filter feature)
- Problem / context: The group picked a new reference: a food-ordering app layout (hero banner,
  round category buttons, "Popular Items" cards with description and orange "+", flash-offer
  banner, bottom navigation).
- Prompt used: "before all that can you complete first the ui? make sure you copy this ui just
  remove that is not important make it professionally" (reference image attached).
- AI response (summary): Kept hero banner, category buttons (made them a working filter — an
  optional enhancement in the exam), card layout with descriptions and "+" hint, and kept the
  order panel beside the products (required by the exam). Removed favourite hearts, 20% flash offer,
  bottom navigation, and Order Now / View All buttons. Images stay emoji (group decision, AI-6).
- Code or files produced: `index.html` (hero, category bar, heading), `css/styles.css`,
  `js/selection.js` (`categoryChipHTML`, `renderCategories`, `selectCategory`, new card markup),
  `js/utils.js` (`getCategories`, `filterByCategory`), `js/products.js` (descriptions),
  `tests/catalog.test.js` (4 tests).
- Our evaluation:
  - Flash offer removed on purpose: a 20% discount would change totals and fail instructor tests.
  - The round "+" on each card is not a separate button (a button cannot contain a button); the
    whole card adds the item, so touch targets stay large.
  - `activeCategory` is kept in `selection.js`, not `appState`, because it is a screen setting,
    not part of the transaction.
- Verification / test results: `npm test` 15 pass. Headless-Edge check: Drinks → Coffee, Soft Drink,
  Bottled Water; Snacks → Cookies, Chocolate; cart and ₱175 total unchanged while filtering; adding
  while filtered works; instructor tests 2–6 still ₱175 / ₱220 / ₱175 / ₱140; summary matches; Back
  keeps cart; no page errors. Screenshots in `docs/evidence/`.
- What we changed and why: _(member to fill after review)_

## AI-10 — Card +/− buttons and order list visibility (user feedback)
- Date: 2026-10-07
- Member responsible: Repollo (M2) — Member A, branch `feature/item-selection`
- Type: generation + bug fix (usability)
- Problem / context (found by the member while testing, screenshot at 1920×1080):
  1. Tapping anywhere on a product card added it — easy to add by accident.
  2. With several products in the order, the order panel only showed ~3 lines; the others were
     hidden (each line was ~160px tall).
- Prompt used: "in the pick an item not just click the item just the plus icon and also add a minus
  icon and in the right side if the user pick many product or food the other pick product are not
  seen"
- AI response (summary): Cards became non-clickable containers with a real "+" button; items in the
  cart show "− qty +" on the card. Cards and order lines now share `handleItemAction()` /
  `onItemButtonClick()` (one place that maps add / increase / decrease / remove to cart functions).
  Order lines redesigned as compact two-row lines (~87px). Added `scrollCartItemIntoView()` and
  `updateCartScrollHint()` (top/bottom fade when lines are hidden).
- Our evaluation:
  - Exam says products must be selectable by tapping — still true: the customer taps the "+".
    The "+" is 48×48px, a comfortable touch size.
  - The quantity badge on cards was removed because the card now shows the quantity between − and +.
  - Focus restore needed a change: after tapping "+", that button is replaced by "− 1 +", so the
    exact button no longer exists. It now tries the same action first, then the card's "+".
- Verification / test results (headless Edge):
  - Tapping the card body or name adds nothing; "+" adds; card shows "− 1 +".
  - Instructor tests 2–4 via card buttons: ₱175 / ₱220 / ₱175; card "−" at 1 removes the item and
    the card goes back to a single "+".
  - Order list "+ / − / ×" still work; focus stays on the card after adding (Enter again → qty 2).
  - All six products added: at 1920×1080 all 6 lines visible (line height 87px), Proceed visible;
    at 1280×800 the list scrolls to the newest line and shows the top fade.
  - Summary shows 6 rows, total ₱270.00. `npm test` 15 pass. No page errors.
- What we changed and why: _(member to fill after review)_
