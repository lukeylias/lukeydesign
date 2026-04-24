# Plan: Replace placeholder content with real portfolio content

## Objective
Replace all placeholder content across the portfolio site with real case studies, projects, tools, and bio content — without changing layout or structure.

## Context
- React + Vite portfolio site with content driven by data files in `src/data/`
- Components: Sidebar (hardcoded), Section (prose/grid), ContentGrid, GridItem, Modal
- Modal currently renders `headline`, `body`, one `image`, then hardcoded placeholder text — needs minimal update to support rich `modalContent` arrays
- About section renders as single `<p>` — needs minimal update to support multi-line content
- Case study images live in the old repo at `/Users/luke.ylias/Documents/GitHub/Personal/lukeysite/assets/` and need copying into this repo
- No spec file; working from Luke's detailed content brief in conversation

## Out of scope
- Thumbnail images on grid cards (added later)
- Layout, styling, or structural changes to components
- New components or routes

## Execution mode
Critical: no

## Phases

### Phase 1: Setup — copy images and update Modal/Section to support rich content
**Goal:** Images available in repo; Modal can render `modalContent` arrays; About section can render multi-line content
**Files:** `public/images/`, `src/components/Modal/Modal.jsx`, `src/components/Section/Section.jsx`
**Steps:**
- Copy case study and project images from lukeysite/assets into `public/images/` (only the files referenced in the content brief)
- Update Modal.jsx to render `item.modalContent` (array of `{ type: 'text', value }` and `{ type: 'image', src, alt }` blocks) instead of hardcoded placeholder paragraphs. Fall back to current behaviour if `modalContent` is absent
- Update Section.jsx prose rendering to support an array of strings (render each as its own `<p>`) instead of a single content string
**Done when:** Images exist in `public/images/`; Modal renders rich content arrays; About section renders multiple paragraphs
**Re-plan if:** Modal or Section structure is more complex than expected and requires broader component changes

### Phase 2: Sidebar and About
**Goal:** Sidebar shows real tagline with no bio; About section shows real content
**Files:** `src/components/Sidebar/Sidebar.jsx`, `src/data/about.js`
**Steps:**
- Change sidebar tagline from "Design & technology" to "Design, code & AI"
- Remove the `<p className="sidebar__bio">` element entirely
- Replace `about.js` content with array of five lines: role, approach, philosophy, tools, location
**Done when:** Sidebar renders "Design, code & AI" with no bio paragraph; About section renders five content lines

### Phase 3: Work section
**Goal:** Six real case studies replace 15 placeholder items
**Files:** `src/data/work.js`
**Steps:**
- Replace all 15 items with 6 case studies: IWHI Funnel Redesign, Offer Management, Experimentation at nib, Accessibility at nib, Secure Messaging, Stacks Design System
- Each item gets `slug`, `headline`, `body` (card summary), and `modalContent` array with interleaved text and image blocks using `/images/filename` paths
- Set `defaultVisible` to 6
**Done when:** Work grid shows 6 cards with correct titles and summaries; modals render full content with interleaved images

### Phase 4: Stack section
**Goal:** Seven real tools replace 15 placeholder items
**Files:** `src/data/stack.js`
**Steps:**
- Replace all 15 items with 7 tools in order: Magic Patterns, Pi, OpenCode, Claude, Granola, Wispr Flow, Figma
- Each item gets `slug`, `headline`, `body` (card write-up), and `modalContent` with the full description
- Remove placeholder images from cards (no thumbnails yet)
- Set `defaultVisible` to 7
**Done when:** Stack grid shows 7 tool cards with correct content; modals render write-ups

### Phase 5: Main Feed section
**Goal:** Three real side projects replace 25 placeholder items
**Files:** `src/data/mainFeed.js`
**Steps:**
- Replace all 25 items with 3 projects: Sa11y, a11ycat, Figma Plugins
- Each item gets `slug`, `headline`, `body` (card summary), and `modalContent` with full write-up, links, and interleaved images where specified
- Remove placeholder images from cards (no thumbnails yet)
- Set `defaultVisible` to 3
**Done when:** Main Feed grid shows 3 project cards with correct content; modals render full write-ups with images and links

## Completion log
- Phase 1 done: 12 images copied to public/images/, Modal.jsx updated to render modalContent arrays, Section.jsx updated to render content arrays
- Phase 2 done: Sidebar tagline changed to "Design, code & AI", bio removed, about.js updated with 5 content lines
- Phase 3 done: work.js replaced with 6 case studies with full modalContent including interleaved images
- Phase 4 done: stack.js replaced with 7 tools
- Phase 5 done: mainFeed.js replaced with 3 side projects. Build passes.

## Assumptions and risks
- Image filenames in lukeysite/assets match exactly what's referenced in the content brief (verified by listing the directory)
- Minimal Modal/Section changes won't break existing rendering for items without `modalContent`
- No build or routing changes needed — Vite serves `public/` as static assets at root
