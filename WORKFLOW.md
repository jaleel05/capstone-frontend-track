# WORKFLOW.md — AI-Assisted Workflow Drill: Settings Form

## Setup

Both rounds targeted the same feature — a user settings form (name, email, phone, notification toggle) with validation — built in the `capstone-frontend-track` repo. Round 1 used a single vague prompt in a fresh Antigravity Agent session (`round1-vague` branch). Round 2 used a precise, constraint-driven prompt with file references, an explicit example behavior, and a verification step, in a separate fresh session (`round2-precise` branch). Diff: `git diff origin/round1-vague origin/round2-precise --stat` → **23 files changed, 3422 insertions(+), 698 deletions(-)**.

## Round 1 (vague prompt: "make a settings form with validation")

The AI produced `index.html`, `index.js`, `index.css` — plain vanilla JS, ~280 lines of CSS and ~100 lines of JS. It **ignored the existing project stack entirely**: the repo is Vite + React + TypeScript per `CLAUDE.md`, but nothing in the prompt said so, and the AI didn't check. Validation was hand-rolled string checks inside DOM event listeners rather than a schema-based approach, even though `zod` and `react-hook-form` were already installed as devDependencies. No tests were written. No accessibility attributes (`aria-describedby`, label associations) were present beyond a bare `<label for>`. There was nothing to verify against — I accepted the output as instructed, and only found these issues on inspection afterward.

## Round 2 (precise prompt: file path, stack reference, react-hook-form + zod constraint, accessibility requirement, example behavior, verification step)

Output: `src/components/SettingsForm.tsx` (103 lines) + `src/components/SettingsForm.test.tsx` (84 lines), using `react-hook-form` + `zod`, with `aria-describedby` wired to inline error messages and proper `<label htmlFor>` associations. The AI wrote 5 tests (render, empty-name error, invalid-email error, submit-disabled-when-invalid, `onSave` called with correct data on valid submit) and ran them itself — all 5 passed, verified independently by me re-running `npm run test`.

**AI mistake caught in round 2:** despite the precise prompt only asking for a new component + tests, the agent deleted `CLAUDE.md` and `LICENSE` from the branch in the same commit (`23 files changed` included `delete mode 100644 CLAUDE.md`). This wasn't requested or mentioned in its summary — I only caught it by reading the commit stat output, not from the agent's own report. Fixed with `git checkout main -- CLAUDE.md LICENSE` and a follow-up commit.

## Correctness

Round 1 had no automated way to check correctness — I'd have had to manually open `index.html` and click through edge cases myself. Round 2 shipped its own test suite that exercises the exact edge cases specified (invalid email, empty required field), and I could re-run it independently rather than trust the agent's claim.

## Accessibility

Round 1: no `aria-describedby`, error text not programmatically linked to inputs. Round 2: explicit requirement produced correct linkage — verifiable in the diff, not just visually.

## Edge cases

Round 1 didn't handle a submit-while-invalid state (button was always clickable). Round 2's test suite explicitly asserts the submit button is disabled when the form is invalid.

## Review effort

Round 1 took less time to prompt (seconds) but I'd still need to manually test every edge case by hand — that review time isn't captured by the "prompt was fast" framing. Round 2's prompt took longer to write, but the verification loop meant I spent my review time reading test output instead of manually clicking through forms, and I still caught a real bug (the deleted files) that the agent's own summary didn't mention. Net time-to-a-trustworthy-result was lower for round 2, even though round 2 "felt" slower while writing the prompt.
