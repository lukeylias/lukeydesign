# Design QA — DM Sans and supporting-page hierarchy

## Source visual truth

- Landing page: `http://127.0.0.1:5173/#/`
- Source screenshot: `/private/tmp/lukeydesign-dm-sans-home.png`
- Desktop source pixels: 1416 × 2528 at device density 1.
- The existing Work list defines the required row geometry and hover bounds.
- The landing hero defines the restrained title scale and hierarchy for supporting routes.

## Implementation evidence

- Notes page: `http://127.0.0.1:5173/#/notes`
- About page: `http://127.0.0.1:5173/#/about`
- Note detail: `http://127.0.0.1:5173/#/blog/giving-my-agent-a-voice`
- Desktop screenshots:
  - `/private/tmp/lukeydesign-dm-sans-notes.png` — 1431 × 1324 pixels.
  - `/private/tmp/lukeydesign-dm-sans-about.png` — 1431 × 1324 pixels.
  - `/private/tmp/lukeydesign-dm-sans-note-detail.png` — 1416 × 1605 pixels.
- Mobile screenshots:
  - `/private/tmp/lukeydesign-dm-sans-home-mobile.png` — 375 × 2632 pixels.
  - `/private/tmp/lukeydesign-dm-sans-notes-mobile.png` — 375 × 950 pixels.
- CSS viewports: 1431 × 1324 desktop and 390 × 844 mobile.
- State: light mode, route-entry animation complete, device density 1.

## Full-view comparison evidence

- DM Sans is loaded from local `@fontsource` files at weights 400, 500, and 700, then applied through the existing global font tokens.
- The Notes landing section and Notes index use the same row component as Work.
- Notes, About, and note-detail titles now resolve to the landing hero scale: 28px desktop and 23px mobile.
- Supporting text keeps its previous size and weight so hierarchy remains clear without restoring oversized display headings.

## Focused comparison evidence

- Fonts and typography: the rendered body reports `"DM Sans"` first in the stack. Landing, Notes, About, and note-detail titles all use weight 700, 28px size, 42.56px line height on desktop. Notes uses 23px / 34.5px on mobile.
- Spacing and layout rhythm: desktop Work and Notes headings begin at x=292px; both item labels begin at x=292px; both hover surfaces begin at x=276px. The Notes hover surface is 864px wide around the 832px content container, matching the Work list’s 16px outer extension.
- Mobile alignment: the Notes section heading and row text both begin at x=18px. The row hover surface begins at x=2px and spans 371px without horizontal overflow.
- Colors and visual tokens: the existing light palette, blue interactive state, neutral hover surface, 20px radius, and motion tokens remain unchanged.
- Image and icon fidelity: existing portrait, project imagery, moustache mark, and arrow assets are unchanged.
- Copy and content: no wording was added, removed, or rewritten.

## Findings

- No actionable P0, P1, or P2 differences remain.
- No P3 follow-up is required for this pass.

## Interaction and technical verification

- Work and Notes row geometry matches at desktop and mobile sizes.
- Work → Notes navigation works.
- Opening “Giving my agent a voice” from Notes reaches the existing note detail.
- Browser console errors: none.
- `npm run lint`: passed.
- `npm run build`: passed.
- `git diff --check`: passed.

## Comparison history

- Earlier finding: Notes removed the Work row’s negative outer gutter, shifting its labels 16px inward and shortening the hover surface.
- Fix: removed the Notes-only width and margin override so the shared Work geometry is authoritative.
- Post-fix evidence: Work and Notes labels share the same x-position, while both hover surfaces extend 16px beyond the content edge.
- Earlier finding: Notes, About, and note-detail titles used 34–48px display sizing.
- Fix: moved those route titles to the landing hero’s 24–28px responsive scale and 23px mobile size.
- Post-fix evidence: all supporting-route titles resolve to 28px desktop and 23px mobile with no overflow.

## Final result

passed
