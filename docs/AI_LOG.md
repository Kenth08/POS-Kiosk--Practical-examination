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

## AI-3 — Order summary and cash payment
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
