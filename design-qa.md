# Design QA — Mobile row padding and menu dismissal

## Source visual truth

- Existing mobile portfolio capture: `/private/tmp/lukeydesign-dm-sans-home-mobile.png`
- Source pixels: 375 × 2632 at device density 1.
- The existing site defines the visual language: DM Sans typography, off-white background, black text, blue active state, restrained borders, portrait mark, and route copy.
- The user brief requires two independent spacing layers: a 16px outer site gutter and retained internal padding inside interactive list rows.
- Menu destinations must dismiss the overlay elegantly before the next route appears.

## Implementation evidence

- Local route: `http://127.0.0.1:5173/#/`
- Closed and open mobile screenshots from the prior pass remain at `/private/tmp/lukeydesign-mobile-responsive-closed-viewport.jpg` and `/private/tmp/lukeydesign-mobile-menu-final.jpg`.
- The current QA session compared closed, fully open, and 80ms exit-animation states together at 375 × 844 rendered pixels.
- CSS viewport: 390 × 844; document client width: 375px in the normal page state and 390px while page scrolling is locked.
- State: light mode, mobile breakpoint, route-entry, menu-entry, and menu-exit animations exercised.

## Full-view comparison evidence

- The mobile header retains the portrait mark and replaces the three inline links with one “Menu” control.
- Opening the control presents a full-screen navigation layer using the existing background, typography, border, accent, and spacing tokens.
- Selecting a destination fades and lifts the navigation labels away, then reveals the next route after the 260ms exit completes.
- The underlying landing-page hierarchy, imagery, copy, and section rhythm are unchanged.
- Work, Notes, and About remain the only primary navigation destinations.

## Focused comparison evidence

- Fonts and typography: DM Sans remains unchanged. The menu trigger and close control use the existing compact navigation scale; overlay destinations use a larger 30–40px route-selection scale with the same weight and letter-spacing language.
- Spacing and layout rhythm: the site shell, Work rows, Notes rows, and Side Project rows maintain 16px left and right clearance at 320px, 390px, and 700px viewports. Every interactive row also keeps 16px left and right internal padding with a 16px radius.
- Alignment: row labels and their related section headings resolve to x=32px — 16px site gutter plus 16px internal inset — at all three tested mobile widths.
- Colors and visual tokens: no new palette values were introduced. The active destination uses the existing blue accent; dividers use the existing border token.
- Image quality and asset fidelity: the existing transparent portrait logo is reused at 48px with no replacement or resampling in CSS.
- Copy and content: navigation labels remain exactly “Work”, “Notes”, and “About”. No portfolio content was changed.

## Interaction and accessibility evidence

- The desktop navigation is hidden at widths up to 700px and returns at 701px.
- The menu opens from a native button with `aria-expanded` and `aria-controls`.
- The overlay is announced as an `aria-modal` dialog with its own navigation label.
- Focus moves to Close on open and is contained by the existing focus-trap hook.
- Close, Escape, and destination selection all use the same 260ms dismissal sequence.
- Selecting Notes leaves the current `#/` route in place during the visible exit state, then closes the overlay, unlocks scrolling, and navigates to `#/notes`.
- Reduced-motion users skip the exit delay and route immediately.
- Both `html` and `body` are scroll-locked while the overlay is open.
- No horizontal overflow appears at 320px, 390px, 700px, or 701px.
- Browser console errors and warnings: none.

## Findings

- No actionable P0, P1, or P2 differences remain.
- P3: the focused Close outline is intentionally visible in the open-menu screenshot as keyboard-focus feedback.

## Comparison history

- Earlier finding: solving the outer gutter removed the interactive rows’ internal horizontal padding, so hover surfaces looked cramped.
- Fix: retained the 16px shell gutter, restored 16px padding inside Work, Notes, and Side Project rows, and inset the corresponding headings to the same content line.
- Post-fix evidence: shell and row bounds measure 16px from both client edges; row padding measures 16px on both sides; labels and headings align at x=32px at 320px, 390px, and 700px.
- Earlier finding: destination selection removed the menu before its exit motion could be perceived.
- Fix: keep the dialog mounted and scroll-locked while its overlay and labels animate out, then update the hash after 260ms.
- Post-fix evidence: at 80ms the route remains `#/`, the overlay remains mounted with the closing class, and its computed opacity is mid-transition; after completion the route is `#/notes` and the overlay is absent.
- Earlier finding: locking only `body` left the document scrollbar visible behind the fixed overlay.
- Fix: lock both `html` and `body` while the menu is open.
- Post-fix evidence: the final overlay spans the full 390px client width, maintains 16px inner gutters, and shows no underlying document scrollbar.

## Technical verification

- `npm run lint`: passed.
- `npm run build`: passed.
- `git diff --check`: passed.

## Final result

passed
