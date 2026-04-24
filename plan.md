# Plan: React Migration of V2 Portfolio

## Objective
Rebuild the existing HTML/CSS/JS portfolio site in React (Vite) with full visual and functional parity.

## Context
- Source of truth: `/GitHub/Personal/Lukeysite/` — `index.html`, `v2.css`, `v2.js`
- The site is a single-page portfolio with 4 sections (About, Main Feed, Work, Stack), a sticky sidebar, masonry-style 5-column card grids, Win98-themed modals, and a media viewer lightbox
- CSS uses CSS custom properties, multi-column layout (not CSS Grid), and responsive breakpoints at 1024/768/720/480px
- JS handles: mobile hamburger menu, modal open/close with `<dialog>`, media viewer as a second `<dialog>` layer, hash-based URL routing (`#/section/slug`), ESC key layering (media viewer → modal → mobile menu)
- Content is currently hardcoded HTML. No CMS or markdown pipeline.
- The chatbot (`chatbot.html`) is a separate page with its own CSS/JS — out of scope for this migration but should be linkable

## Out of scope
- Media handling inside modals (images, GIFs, embedded video, lightbox expansion) — plan for it, don't build it
- App/tool iframes in modals
- "Chat with me" feature
- Animations and sound design
- GitHub Pages deployment
- Chatbot page migration

## Conventions
- **File naming:** PascalCase directories and filenames for components (`Sidebar/Sidebar.jsx`), camelCase for hooks (`useModal.js`) and data files (`content.js`)
- **Browser support:** Modern browsers only (Chrome, Firefox, Safari, Edge). No `<dialog>` polyfill.
- **Accessibility:** All `<dialog>` modals use native `role="dialog"` and `aria-labelledby` pointing to their title element. Screen readers should announce modal open/close. `alt` text required on all images.
- **Testing:** No tests in initial build. Hash routing logic and ESC layering are candidates for unit tests in a follow-up pass.

## Phase dependencies
```
Phase 1 → Phase 2 → Phase 3 → Phase 4
                         ↓
                      Phase 5
```
Phase 4 (Media Viewer) depends on Phase 3 (Modal) for stacking tests. Phase 5 (Show More) depends on Phase 3 for deep-link expansion.

## Execution mode
Critical: yes — Luke wants to review the plan before any building starts.

## Phases

### Phase 1: Scaffold & Static Shell
**Goal:** Vite + React project with routing, global styles, and the two-panel layout rendering.

**Files:**
- `package.json`, `vite.config.js`, `index.html`
- `src/main.jsx`, `src/App.jsx`
- `src/styles/tokens.css` (design tokens extracted from v2.css)
- `src/styles/reset.css`
- `src/styles/layout.css`
- `src/components/Sidebar/Sidebar.jsx`, `Sidebar.css`
- `src/components/MobileNav/MobileNav.jsx`, `MobileNav.css`
- `src/hooks/useFocusTrap.js` — lightweight custom focus trap for mobile nav overlay

**Steps:**
- `npm create vite@latest . -- --template react` in the lukeydesign directory
- Install no extra dependencies (react-router not needed — hash routing is manual)
- Extract CSS custom properties from v2.css `:root` block into `tokens.css`
- Port reset rules into `reset.css`
- Build `App.jsx` as the `site-layout` flex container: `<Sidebar>` + `<main>` slot
- Build `Sidebar` component: name, tagline, bio, nav links (hash anchors), external links
- Build `useFocusTrap` hook: traps Tab/Shift+Tab within a container ref, returns focus to trigger element on deactivation. No external dependency.
- Build `MobileNav` component: fixed header bar + overlay with same nav links, hamburger toggle with open/close state. Uses `useFocusTrap` when overlay is open.
- All sidebar nav links use `#about`, `#main-feed`, `#work`, `#stack` anchors. Chatbot link is a plain `<a>` to external URL.
- Responsive: sidebar hidden at ≤768px, mobile nav shown
- Check v2.js for scroll-spy / active nav link highlighting — if present, implement `useActiveSection` hook using `IntersectionObserver` to highlight the current section's nav link

**Done when:**
- `npm run dev` renders the sidebar + empty main area
- Mobile nav opens/closes with hamburger, traps focus, closes on ESC
- All CSS tokens match v2.css values exactly
- Responsive breakpoints match (5→3→2→1 columns variable set, sidebar hide at 768px)

**Re-plan if:** Vite template has changed significantly, or React 19 has breaking changes with `<dialog>` ref timing

**Review:** Luke checks layout matches the HTML version visually at desktop and mobile widths.

---

### Phase 2: Content Data & Section Rendering
**Goal:** Define the data model for all content and render the four sections with their card grids.

**Files:**
- `src/data/mainFeed.js`, `src/data/work.js`, `src/data/stack.js`, `src/data/about.js` — card data split by section
- `src/data/index.js` — re-exports all sections as a unified array
- `src/components/Section/Section.jsx`, `Section.css`
- `src/components/ContentGrid/ContentGrid.jsx`, `ContentGrid.css`
- `src/components/GridItem/GridItem.jsx`, `GridItem.css`

**Steps:**
- Define data shape: `{ sections: [{ id, label, type, items: [{ slug, headline, body, image? }] }] }`. The About section is special (no grid, just prose). Slugs must be unique within their section — lookups are keyed by `sectionId + slug`.
- Card `body` fields contain HTML strings rendered via `dangerouslySetInnerHTML` to preserve existing rich content (links, bold, lists). Sanitisation is not needed since all content is first-party.
- Extract all 25 Main Feed cards, 15 Work cards, and 15 Stack cards from `index.html` into per-section data files
- Copy static image assets from the source site to `public/images/` and reference via absolute paths (`/images/...`) in data files
- Build `Section` component: renders label, divider, and conditionally either `<AboutContent />` (prose from `about.js`) or a `<ContentGrid />` based on `section.type`
- Build `ContentGrid` using CSS multi-column layout (matching `columns: var(--grid-columns)`) — NOT CSS Grid, to match existing masonry behaviour
- Build `GridItem`: headline link, body paragraph, optional image. Headline click and image click are wired to callbacks (no-op for now)
- Render all four sections in `App.jsx` main area with proper `id` attributes for anchor navigation

**Done when:**
- All cards render in the correct sections with correct content
- Multi-column layout matches the HTML version (5 cols desktop, 3/2/1 responsive)
- Scroll-to-section works via sidebar anchor links
- Cards are visually identical to the HTML version

**Re-plan if:** Multi-column CSS behaves differently in React (unlikely but check)

**Review:** Side-by-side visual comparison of card grids at multiple breakpoints.

---

### Phase 3: Modal System
**Goal:** Win98-styled modal opens from card headline click, updates URL hash, closes via button/backdrop/ESC, supports browser back.

**Files:**
- `src/components/Modal/Modal.jsx`, `Modal.css`
- `src/hooks/useModal.js` — modal state + hash sync logic
- `src/hooks/useHashRouter.js` — reads/writes `#/section/slug` hashes

**Steps:**
- Build `useHashRouter` hook: parses `location.hash` into `{ section, slug }`, listens to `popstate`, provides `setHash(section, slug)` and `clearHash()`. Note: `history.pushState` does **not** fire `hashchange` — only `popstate` fires on browser back/forward. Opening a modal calls `pushState` and sets state directly; `popstate` listener handles back navigation only.
- Build `useModal` hook: manages `isOpen`, `activeItem`, `triggerRef` state. On open: stores ref to triggering element, pushes hash via `history.pushState`, sets state directly. On close: clears hash. On `popstate`: syncs state from hash.
- Build `Modal` component using `<dialog>` element with `.showModal()` / `.close()`. Win98 title bar with close button. Scrollable body. Renders card content (headline as h2, body, image placeholder).
- Wire headline clicks in `GridItem` to open modal with that item's data
- Handle `cancel` event on dialog to prevent default and use custom close logic
- Handle backdrop click (click on `<dialog>` element itself)
- `body.modal-open` class to prevent scroll
- On page load: if hash matches `#/section/slug`, find the item in data (lookup by `sectionId + slug`) and open modal immediately. If no matching item is found, clear the hash and log a console warning.
- Scroll position: save `window.scrollY` before adding `body.modal-open`, restore on modal close. On deep-link load, scroll to the item's section before opening the modal.
- Port all modal CSS from v2.css (Win98 chrome, titlebar, button styles, responsive fullscreen at ≤720px)

**Done when:**
- Clicking a card headline opens the modal with correct content and title
- URL updates to `#/main-feed/on-designing-with-constraints` format
- Browser back closes the modal and restores URL
- Direct navigation to a hash URL opens the correct modal on page load
- ESC closes the modal
- Backdrop click closes the modal
- Modal goes fullscreen at ≤720px
- Focus returns to the triggering card on close. On deep-link load (no trigger element), focus moves to the card element itself after modal close.

**Re-plan if:** `<dialog>` in React has known issues with `.showModal()` timing or ref management

**Review:** Test all close methods (button, ESC, backdrop, back), deep-link loading, and focus management.

---

### Phase 4: Media Viewer
**Goal:** Second `<dialog>` layer for the media viewer. Opens from card/modal images with actual image display, layers correctly with ESC priority over modal. Video/GIF/embed support is out of scope — images only for now.

**Files:**
- `src/components/MediaViewer/MediaViewer.jsx`, `MediaViewer.css`
- `src/hooks/useMediaViewer.js`
- `src/hooks/useEscapeLayer.js` — centralised ESC key handler with a layer stack

**Steps:**
- Build `useMediaViewer` hook: `isOpen`, `src`, `alt` state, `open(src, alt)` and `close()` methods
- Build `MediaViewer` component: `<dialog>` with Win98 title bar, image display, close button, backdrop click
- Wire image clicks in `GridItem` to open media viewer directly (not the modal)
- Wire image clicks inside `Modal` body to open media viewer on top of modal
- Build `useEscapeLayer` hook: maintains a stack of `{ id, onEscape }` layers via React context. Components call `pushLayer(id, callback)` on mount/open and `popLayer(id)` on close. A single global `keydown` listener calls the topmost layer's callback. This replaces ad-hoc ESC listeners in modal, media viewer, and mobile nav.
- Retrofit `useEscapeLayer` into Modal (Phase 3) and MobileNav (Phase 1) — they currently handle ESC independently.
- Port media viewer CSS from v2.css (responsive fullscreen at ≤720px, fit-content sizing)
- Media viewer displays actual card images (not placeholders) — video/GIF/embed pipeline is out of scope

**Done when:**
- Clicking a card image opens the media viewer
- Clicking an image inside an open modal opens the media viewer on top
- ESC closes media viewer first, then modal on second ESC
- Backdrop click closes media viewer
- Close button works
- Media viewer is responsive (fullscreen on mobile)

**Re-plan if:** Stacking two `<dialog>` elements with `.showModal()` causes z-index or focus issues in React

**Review:** Test the ESC layering: open card → open image in modal → ESC closes viewer → ESC closes modal.

---

### Phase 5: Show More Behaviour
**Goal:** Truncate grids to N visible items with a fade effect and "Show more" expansion, matching the HTML version's behaviour.

**Files:**
- `src/components/ContentGrid/ContentGrid.jsx` (update)
- `src/components/ContentGrid/ContentGrid.css` (update)
- `src/hooks/useBreakpoint.js` — tracks current breakpoint via `matchMedia` listeners

**Steps:**
- Truncation is **item-count based**, not row-based — masonry columns have variable-height items so "rows" are meaningless. Default visible counts: Main Feed: 20, Work: 10, Stack: 10. These approximate the desired visible area but hide by item index using `display: none`, matching the HTML version's approach.
- Build `useBreakpoint` hook: listens to `matchMedia` for each breakpoint (1024/768/480px), returns current breakpoint name. Used to recalculate visible item count on resize (e.g., fewer items shown at smaller column counts to maintain similar visual density).
- Add `is-truncated` state to `ContentGrid`: items beyond the visible count get `display: none`. Apply a fade gradient over the grid container via a positioned pseudo-element on a wrapper with `overflow: hidden` and a measured `max-height` (use a ref to measure the rendered height of visible items).
- Add a "Show more" button below the grid that removes truncation and reveals all items
- Smooth height animation on expansion using CSS `max-height` transition from measured height to `none`
- When a modal deep-link targets a hidden card, auto-expand that section first (matching v2.js behaviour)

**Done when:**
- Sections show the correct number of items by default
- Fade gradient appears over the bottom of the truncated grid
- "Show more" reveals remaining cards with smooth animation
- Deep-linking to a hidden card auto-expands and opens the modal
- Breakpoint changes recalculate visible count and re-truncate appropriately

**Re-plan if:** The fade gradient approach (measured `max-height` + pseudo-element) proves unreliable across browsers or causes layout thrashing on resize.

**Review:** Check truncation at all breakpoints, verify deep-link expansion works.

---

## Assumptions and risks

1. **`<dialog>` in React** — `.showModal()` needs to be called via refs after render. Should work fine but needs careful `useEffect` timing.
2. **Two stacked `<dialog>`s** — Both using `.showModal()` means the second gets a new backdrop layer. Browser handles z-index automatically. Tested in modern browsers but worth verifying.
3. **Multi-column truncation** — The existing site uses `display: none` on overflow items, which works with CSS columns. Truncation is item-count based (not row-based) since masonry items have variable heights. The fade gradient requires measuring rendered height of visible items via refs.
4. **No router library** — Hash routing is simple enough to handle with `hashchange`/`popstate` + `history.pushState`. Adding react-router would be overkill and add complexity for this use case.
5. **CSS approach** — Port v2.css as component-scoped CSS files (co-located with components). No CSS modules, no Tailwind, no CSS-in-JS. Plain CSS with the same class names where practical, adapted to component boundaries. Global tokens and reset stay global.
6. **Error handling** — Invalid deep-link hashes (no matching section/slug) clear the hash and log a console warning. No user-facing error UI.
7. **Image assets** — Static images live in `public/images/` and are referenced via absolute paths. No build-time image processing.
