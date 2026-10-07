# Demo and Explanation Guide — Member A (Repollo)

My part: **project setup** and **Item Selection + order panel**, plus the shared UI design.
Branches: `setup/project-skeleton` (PR #1), `feature/item-selection`.

## 1. What to demonstrate (≈ 2 minutes)

1. Open `index.html`. Point out: 6 products with names and prices, large buttons, no typing.
2. Tap **+** on Coffee twice, Sandwich, Soft Drink → order panel shows ₱90 / ₱50 / ₱35, **₱175.00**.
3. Coffee **+** → ₱135, total **₱220**. Coffee **−** → back to **₱175**.
4. Soft Drink **×** → total **₱140**. Show **−** at 1 removes the item (never 0 or negative).
5. Tap **Drinks** → only drinks shown, the order is unchanged. Tap **All**.
6. **Proceed to Payment** → Summary matches the order (Member B's screen). **Back** → order kept.
7. Run `npm test` → all tests pass.

## 2. How my code works

**Main idea:** the order is a list in `appState.cart`. Every button changes that list, then
`refreshSelection()` redraws the screen from the list. The screen always matches the data.

```
tap "+" → handleItemAction('coffee', 'add') → addToCart('coffee')
       → appState.cart changes → refreshSelection() → cards + order panel redrawn → toast
```

| Function (file) | What it does |
|---|---|
| `addToCart(id)` (`selection.js`) | Adds a product, or one more if it is already in the order. Shows "Product added". |
| `changeQuantity(id, ±1)` | + / − buttons. Below 1 → removes the item. Above 99 → "Invalid quantity". Returns true/false. |
| `removeFromCart(id)` | × button. Filters the item out of the list. |
| `handleItemAction(id, action)` | One place that turns a button's `data-action` (add / increase / decrease / remove) into a cart change — used by cards **and** the order panel. |
| `productCardHTML()`, `cartItemHTML()` | Build the HTML for one card / one order line (template literals). |
| `renderProducts()`, `renderCart()`, `renderCategories()` | Draw the cards, the order panel (count, total, Proceed on/off), and category buttons. |
| `selectCategory(category)` | Changes only which products are shown — never the order. |
| `getFocusedButtonSelectors()`, `restoreFocus()` | Keep keyboard focus on the same button after a redraw (bug fix, AI-4). |
| `scrollCartItemIntoView()`, `updateCartScrollHint()` | Keep a newly added line visible; fade when lines are hidden (AI-10). |
| `calculateSubtotal`, `calculateTotal`, `countItems`, `getCategories`, `filterByCategory` (`utils.js`) | Pure calculations with unit tests (`tests/cart.test.js`, `tests/catalog.test.js`). |
| `showScreen`, `showToast` (`ui.js`) | Shared helpers for all members: switch screens, show feedback. |

## 3. Likely questions and short answers

- **Why are prices in centavos (4500 instead of 45.00)?** Whole numbers avoid JavaScript decimal
  errors (e.g. 0.1 + 0.2 = 0.30000000000000004). `formatPeso()` turns 4500 into "₱45.00" for display.
- **Why does − at quantity 1 remove the item?** So quantity can never become 0 or negative, as the exam requires.
- **Why is the category in `selection.js` and not in `appState`?** It is a screen setting, not part of
  the transaction. The order (`appState.cart`) is what the other screens read.
- **What is event delegation?** One click listener on the whole grid / order list instead of one per
  button, because buttons are re-created on every redraw. The listener finds the tapped button with
  `closest('button[data-action]')`.
- **How do the other screens get the order?** They read `appState.cart` (`{ productId, name, price, quantity }`)
  and use `calculateTotal()`, so the summary and receipt always match the order panel.
- **Why hard-coded products instead of a database?** The exam allows it; six products do not need a
  database. The transaction counter uses `localStorage` so numbers stay unique after a reload.
- **How did you use AI, and did you trust it blindly?** No — see `docs/AI_LOG.md`. Examples: AI's first
  test script failed on Node 24 and was fixed (AI-2); a focus bug was found in testing and fixed (AI-4);
  the refactor was proven safe with before/after HTML snapshots (AI-5); I found that the order panel hid
  items and had it fixed (AI-10); we rejected the reference design's service fee and discount because
  they would break the required totals (AI-6, AI-9).
- **What could go wrong?** Browser cache showing old files (fix: Ctrl+F5); on small screens the order
  list scrolls (fade shows hidden lines).

## 4. Git / GitHub — what I can show

- Repository owner; added collaborators; cloned locally (`git remote -v`).
- Commits on `feature/item-selection`: interface → core logic → bug fix → refactor → redesign → docs.
- Merged `main` into my branch and resolved a conflict in `js/utils.js` (kept both members' helpers).
- PR from `feature/item-selection` → `main`, reviewed by kurtpacia-bit.
