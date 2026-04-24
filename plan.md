# Plan: Media handling system

## Objective

Build a unified media system that handles thumbnails, hero images, lightbox, embedded video, app iframes, and modal sizing across the portfolio site.

## Context

- React portfolio with Win98 aesthetic, using `<dialog>` for both modal and media viewer
- Current state: `GridItem` has an optional `item.image` field (placeholder URLs). Clicking the image opens `MediaViewer` (a second `<dialog>`). Clicking the headline opens `Modal` (first `<dialog>`). Both managed via hooks in `App.jsx`
- Centralised ESC handler already prioritises media viewer over modal
- Data lives in plain JS objects (`src/data/*.js`), no CMS
- CSS uses custom properties from `tokens.css`, Win98 box-shadow patterns throughout
- No build-time image processing currently; all images are URLs

## Out of scope

- Actual content/assets — plan uses placeholder data, real assets come later
- Image optimisation pipeline (srcset, WebP generation)
- Gallery/carousel within modals (single hero only for now)
- Drag-to-resize modal

## Execution mode

Critical: no

## Phases

### Phase 1: Data model and media type detection

**Goal:** Establish the media data shape and a utility that classifies any media entry by type.

**Files:**
- `src/data/mainFeed.js`, `src/data/work.js` — update item shapes
- `src/utils/media.js` — new file

**Steps:**
- Define the media object shape used across items: `{ type, src, alt?, poster? }` where `type` is `"image" | "gif" | "video" | "iframe"`
- For images/GIFs, `src` is the asset URL (used for thumbnail crop, hero, and lightbox — same URL, different CSS treatment)
- For video, `src` is the embed URL (YouTube/Vimeo/Loom), no thumbnail asset needed initially (poster optional)
- For iframe embeds, `src` is the app URL, rendered as interactive iframe in modal body
- Add a `thumbnail` field on each item — this is the `src` of whichever media entry should serve as the card's 250×250 crop. Defaults to the first image/gif media entry's `src` if not set explicitly
- Create `src/utils/media.js` with: `getMediaType(src)` that detects type from URL patterns (YouTube/Vimeo/Loom → video, `.gif` → gif, otherwise image), and `isLightboxable(type)` returning true for image/gif, false for video/iframe
- Update a few items in `mainFeed.js` and `work.js` with the new shape to prove the model (mix of image, gif, video, iframe types)

**Done when:** Data files have items using the new media shape; `media.js` exports working detection utilities.

**Re-plan if:** The single-`src` approach for thumbnails doesn't work because different crop sizes need different assets — would need a `thumbnail` + `full` dual-src model.

---

### Phase 2: MediaBlock component

**Goal:** A single reusable component that renders any media type appropriately in any context (card thumbnail, modal hero, modal body inline).

**Files:**
- `src/components/MediaBlock/MediaBlock.jsx` — new
- `src/components/MediaBlock/MediaBlock.css` — new

**Steps:**
- `MediaBlock` accepts: `media` (the media object), `context` (`"thumbnail" | "hero" | "body"`), `onLightbox` callback
- **Thumbnail context:** Render as 250×250 `object-fit: cover` image. Click calls `onLightbox(media)`. Videos/iframes render a static poster or placeholder icon instead
- **Hero context:** Render image/gif at full modal width, `cursor: zoom-in`, click calls `onLightbox(media)`. Videos render responsive 16:9 iframe, no lightbox. Iframes don't appear as hero
- **Body context:** Images/gifs render inline full-width with lightbox click. Videos render 16:9 iframe. Iframes render with configurable aspect ratio (default 16:9), no lightbox
- Video iframe rendering: YouTube/Vimeo/Loom URL → sanitised embed URL, wrapped in `div.media-block--video-wrapper` with `padding-bottom: 56.25%` trick
- App iframe rendering: sandboxed iframe with configurable `allow` attributes

**Done when:** `MediaBlock` renders all four types in all applicable contexts; component can be dropped into any parent.

**Re-plan if:** The three contexts diverge so much that a single component becomes unwieldy — would split into `Thumbnail`, `HeroMedia`, `InlineMedia`.

---

### Phase 3: Lightbox as overlay layer

**Goal:** Replace the current `MediaViewer` dialog-based approach with a lightbox that layers on top of the modal (not a separate dialog).

**Files:**
- `src/components/Lightbox/Lightbox.jsx` — new (replaces `MediaViewer`)
- `src/components/Lightbox/Lightbox.css` — new
- `src/hooks/useMediaViewer.js` → rename to `src/hooks/useLightbox.js`
- `src/components/MediaViewer/` — delete
- `src/App.jsx` — update

**Steps:**
- `Lightbox` is a portal-rendered fixed overlay (`position: fixed; inset: 0; z-index` above modal's dialog), not a `<dialog>`. Dark backdrop (`rgba(0,0,0,0.85)`)
- Renders the image/gif at natural size capped to `max-width: 90vw; max-height: 90vh; object-fit: contain`
- Has a Win98-styled title bar with close button (matching existing aesthetic)
- Click outside the image (on backdrop) closes lightbox
- ESC handling already exists in `App.jsx` — just update references from `mediaViewer` to `lightbox`
- Rename hook, update state shape to accept a `media` object instead of separate `src`/`alt`
- Remove `MediaViewer` component and its CSS

**Done when:** Lightbox opens over the modal without closing it; ESC closes lightbox first, then modal; clicking backdrop closes lightbox; old `MediaViewer` is fully removed.

**Re-plan if:** Stacking a non-dialog over a `<dialog>` has z-index issues across browsers — may need to render lightbox inside the dialog element itself.

---

### Phase 4: Wire GridItem and Modal to new media system

**Goal:** Connect the new components so the full interaction flow works: card thumbnail → lightbox, card headline → modal with hero → lightbox.

**Files:**
- `src/components/GridItem/GridItem.jsx`, `GridItem.css`
- `src/components/Modal/Modal.jsx`, `Modal.css`
- `src/App.jsx`

**Steps:**
- **GridItem:** Replace the raw `<img>` with `<MediaBlock media={thumbnailMedia} context="thumbnail" onLightbox={onLightbox} />`. Clicking the thumbnail opens lightbox directly. Clicking anywhere else on the card (headline) opens modal. Remove `onImageClick` prop, replace with `onLightbox`
- **Modal:** Add hero zone at top of `modal__body` — render `<MediaBlock media={heroMedia} context="hero" onLightbox={onLightbox} />` where `heroMedia` is the item's thumbnail media. Below the hero, modal body content can include additional `<MediaBlock context="body" />` entries from `item.media[]` array
- **App.jsx:** Update handler names (`onImageClick` → `onLightbox`), pass lightbox hook's `open` as the callback, thread through to GridItem and Modal
- Ensure clicking thumbnail on card opens lightbox (not modal), clicking card headline opens modal, clicking hero in modal opens lightbox

**Done when:** Full click flow works for all media types; no broken references to old `onImageClick`; video embeds play inline in modal without lightbox.

**Re-plan if:** The `<dialog>` traps focus and prevents interaction with the lightbox portal — would need to render lightbox inside the dialog.

---

### Phase 5: Modal size toggle

**Goal:** Add a default/expanded size toggle to the modal title bar.

**Files:**
- `src/components/Modal/Modal.jsx`
- `src/components/Modal/Modal.css`
- `src/hooks/useModal.js`

**Steps:**
- Add `isExpanded` boolean state to `useModal` hook, with `toggleExpanded` callback. Resets to `false` on `close()`
- Add a toggle button in `modal__controls` (before the close button). Icon: `□` for expand, or a maximize/restore glyph. Tooltip: "Expand" / "Restore"
- CSS: `.modal--default` = `max-width: 65vw` (desktop), `.modal--expanded` = `max-width: 92vw`. Both use `height: fit-content` and `max-height: 85vh` so content drives height
- Apply class to dialog element based on `isExpanded`
- Mobile breakpoint: both sizes collapse to `100vw × 100vh` (already happens)

**Done when:** Toggle button switches modal between two widths; state resets when modal closes; short content doesn't stretch to fill height.

**Re-plan if:** `width: fit-content` on dialog causes layout jumps with the hero image — may need explicit width instead.

---

## Recommendations

### Phase 3: Render lightbox inside the dialog, not as a portal

The plan flags the z-index risk but defaults to a portal approach with the dialog fallback as a "re-plan if." I'd flip that — start with rendering the lightbox inside the modal's `<dialog>` element. Native `<dialog>` with `showModal()` uses the browser's top-layer, which sits above everything including `z-index: 999999` portals. This is not a theoretical risk; it's the specified behaviour in Chrome, Safari, and Firefox. Building the portal first means hitting this wall immediately and rewriting. Rendering inside the dialog avoids the problem entirely and is simpler code (no portal, no extra z-index management). The lightbox becomes a sibling of `modal__body` inside the dialog, toggled with a class.

### Phase 2: Keep MediaBlock but plan for the split early

The "re-plan if" for Phase 2 says split into separate components if the single MediaBlock gets unwieldy. Looking at the three contexts, thumbnail and hero/body already diverge significantly (thumbnail is a fixed-size crop with no video rendering; hero/body handle iframes, aspect ratios, and different click behaviours). I'd structure MediaBlock as a thin wrapper from the start that delegates to internal sub-components (`ThumbnailMedia`, `EmbedMedia`, etc.) rather than one big switch. This avoids the rewrite trigger while keeping the single import API.

### Phase 1: Default `thumbnail` derivation should live in the utility, not in data files

The plan says `thumbnail` "defaults to the first image/gif media entry's src if not set explicitly" but doesn't say where that default is computed. Put a `getThumbnail(item)` helper in `media.js` that resolves the fallback. This keeps the data files clean (no redundant thumbnail fields on items that just use the first image) and centralises the logic.

### Phase 4: Lightbox from card thumbnail should still work without a modal open

The current flow has `onImageClick` on GridItem opening the MediaViewer independently of the modal. The plan preserves this (clicking thumbnail opens lightbox directly). But if the lightbox is rendered inside the `<dialog>` per the Phase 3 recommendation above, you'll need a lightweight standalone lightbox for the no-modal case — either a minimal dialog that only wraps the lightbox, or keep a portal specifically for this path. Worth deciding in Phase 3 rather than discovering it in Phase 4.

### Phase 5: Use `width` not `max-width` for the toggle

Switching between `max-width: 65vw` and `max-width: 92vw` means the modal's actual width depends on content. Short content in a wide modal looks odd. Use explicit `width` values so the modal is always the intended size, and let `max-width: 100%` handle small viewports.

## Assumptions and risks

- **z-index stacking:** A portal-based lightbox over a native `<dialog>` may have stacking issues. `<dialog>` uses top-layer in modern browsers. Fallback: render lightbox inside the dialog element itself
- **Single asset URL for thumbnail + hero + lightbox:** Works if images are large enough for lightbox. If we later need separate crop URLs, Phase 1's data model would need `thumbnailSrc` + `fullSrc`
- **No server-side rendering:** All components assume client-only React (current setup uses Vite + SPA)
- **Video embeds don't need thumbnails yet:** Cards with only video media will show a placeholder. Real poster images are a future concern
