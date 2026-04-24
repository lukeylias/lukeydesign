# Plan: Windows 98 Chatbot Modal

## Objective

Add a Windows 98–themed chatbot button to the sidebar that opens a modal containing the full chatbot experience from lukeysite, rebuilt as a React component with Win98 styling.

## Context

- **Source chatbot:** `/Users/luke.ylias/Documents/GitHub/Personal/lukeysite/` — `chatbot.html`, `js/portfolio-new.js`, `portfolio-new.css`, plus image assets in `assets/`
- **Target project:** lukeydesign — React (Vite), component-per-folder pattern, existing Win98 design tokens already in `tokens.css`
- **Existing modal pattern:** `<dialog>` element with Win98 titlebar chrome — reuse the same visual language
- **Conventions:** CSS modules per component folder, hooks in `src/hooks/`, data in `src/data/`

### What carries over from the old chatbot
- SoundEngine (Web Audio API — type tick, toggle on/off, popover open/close sounds)
- Sound toggle button (top-right of chatbot modal)
- Full conversation tree (`conversationSteps` array with all content, work cards, case studies)
- Suggestion chips, composer with animated typing, typing indicator
- Lightbox for images/video within the chatbot
- "New chat" reset functionality
- `localStorage` sound preference persistence

### What is omitted
- Info button and info popover
- ASCII galaxy art / welcome animation
- The welcome `<pre>` canvas element

### What changes
- Theme: full Win98 aesthetic (raised/sunken borders, system colours, pixel fonts)
- Container: renders inside a `<dialog>` modal, not a full page
- Welcome state: simplified — just the heading text "Hey, I'm Luke. What would you like to know?" without the galaxy

## Out of scope

- Mobile nav chatbot trigger (can be added later)
- Modifying any existing components or pages
- Deploying or copying image assets (images referenced in conversation content will use paths from the old site or placeholders)

## Phases

### Phase 1: Data, hooks, and assets

**Goal:** Extract the chatbot's data, sound engine, and image assets into standalone modules ready for the component.

**Files:**
- `src/data/conversationSteps.js` (new)
- `src/hooks/useSoundEngine.js` (new)
- `src/hooks/useChatbot.js` (new)
- `public/assets/` — copy referenced images from lukeysite

**Steps:**
- Create `conversationSteps.js` exporting the full `conversationSteps` array and `initialPrompts` from `portfolio-new.js`
- Create `useSoundEngine.js` as a React hook wrapping the SoundEngine IIFE — expose `playTypeTick`, `playToggleOn`, `playToggleOff`, `playPopoverOpen`, `playPopoverClose`, `toggle`, `isEnabled` via a ref-stable object
- Keep `localStorage` sound preference logic intact
- Create `useChatbot.js` hook managing all conversation state via `useReducer` — expose `{ messages, currentPrompts, sendMessage, selectChip, resetChat, readCards }`. Actions: `APPEND_USER_MSG`, `APPEND_ASSISTANT_MSG`, `SET_TYPING`, `MARK_CARD_READ`, `RESET`. This keeps `Chatbot.jsx` focused on rendering.
- Copy image assets referenced in conversation content (`assets/me.jpg`, `assets/Offers-Landing-Page.jpg`, `assets/meatnib.jpeg`, etc.) from lukeysite into `public/assets/` so work cards render correctly from the start

**Done when:**
- All files export cleanly and can be imported without errors
- Sound engine hook can be called in a test component
- `useChatbot` returns correct initial state (welcome + initial prompts)
- Image assets are in place

**Re-plan if:**
- The conversation content has changed significantly from what was reviewed

---

### Phase 2: Chatbot component and styling

**Goal:** Build the chatbot UI as a self-contained React component with all interaction logic, styled Win98 as each element is built.

**Files:**
- `src/components/Chatbot/Chatbot.jsx` (new)
- `src/components/Chatbot/Chatbot.css` (new)

**Steps:**
- Build `Chatbot` component accepting `isOpen` and `onClose` props
- Reuse the existing `<dialog>` + titlebar pattern from `Modal.jsx` (same `showModal()`/`close()` sync, cancel-event prevention, backdrop-click handling) — do not rebuild this chrome from scratch
- Wire up `useChatbot` hook for all conversation state and `useSoundEngine` for audio
- Build and style each sub-element together (not separately):
  - **Titlebar:** navy gradient, white bold text, close button, sound toggle as a small toolbar button
  - **Welcome state:** just the heading "Hey, I'm Luke. What would you like to know?" — dismisses on first send
  - **Chat log:** Win98 sunken panel (inset border, white bg). User messages as raised panels, assistant messages as flat text or subtle sunken well
  - **Suggestion chips:** Win98 raised buttons with active/pressed states
  - **Composer:** Win98 sunken text input + raised send button, animated typing via `useEffect`/`setTimeout`
  - **Typing indicator:** dots in system colours
  - **Work cards:** Win98 raised panels, click opens case study inline with "✓ Read" badges
  - **Lightbox:** reuse existing `MediaViewer` or build a simple one scoped to the modal
  - **Scrollbars:** Win98 style where CSS allows
- Ensure responsive behaviour — full-screen on mobile, centred dialog on desktop
- ESC handling: rely on native `<dialog>` top-layer stacking — each `.showModal()` call stacks above the previous. The topmost dialog receives ESC via the `cancel` event. No custom ESC priority logic needed.

**Done when:**
- Full conversation tree is navigable from start to finish
- Typing animation plays with sound ticks
- Sound toggle works and persists across sessions
- Work cards open case studies inline with "✓ Read" badges
- "New chat" resets everything
- Modal closes on ESC and backdrop click
- All chat elements look authentically Windows 98 (raised buttons, sunken panels, navy titlebar)
- Colours use existing Win98 tokens from `tokens.css`
- Responsive at all breakpoints

**Re-plan if:**
- The existing `<dialog>` top-layer stacking doesn't handle nested modals (chatbot + lightbox) correctly — would need manual z-index management
- The Win98 tokens need significant additions (add them to `tokens.css` in this phase)

---

### Phase 3: Sidebar button and App integration

**Goal:** Add the chatbot trigger button to the sidebar and wire everything together in App.jsx.

**Files:**
- `src/components/Sidebar/Sidebar.jsx` (edit)
- `src/components/Sidebar/Sidebar.css` (edit)
- `src/App.jsx` (edit)

**Steps:**
- Add a Win98-styled button in the sidebar nav area (e.g., "💬 Chat" or a retro computer icon) — should feel like a Windows 98 desktop shortcut or Start menu item
- Add `useState` in `App.jsx` to manage chatbot open/close state
- Pass `isOpen` and `onClose` to `Chatbot` component
- Pass `onOpenChat` callback to `Sidebar`
- Add the `Chatbot` component to the App render tree
- No custom ESC handler changes needed — native `<dialog>` top-layer stacking handles priority automatically
- Remove the old `<a href="chatbot.html">Chatbot (v1)</a>` link from the sidebar

**Done when:**
- Clicking the sidebar button opens the Win98 chatbot modal
- ESC closes the topmost dialog naturally (lightbox → chatbot → modal)
- Old chatbot link is removed
- Button is visually consistent with Win98 theme

**Re-plan if:**
- MobileNav also needs a trigger (add as follow-up)

## Assumptions and risks

- **Nested dialogs:** The chatbot uses `<dialog>` and the existing Modal also uses `<dialog>`. Native `<dialog>.showModal()` stacking should handle this — each new modal sits on the top layer and receives ESC. If this doesn't work for the chatbot’s internal lightbox, fall back to manual z-index management.
- **Image assets:** The conversation content references images like `assets/me.jpg`, `assets/Offers-Landing-Page.jpg`, `assets/meatnib.jpeg`. These are copied to `public/assets/` in Phase 1 so they're available from the start.
- **Placeholder content:** Some conversation nodes (e.g., "What's your process?") have placeholder text in the source — these will be ported as-is.

## Testing

- Click the chatbot button in the sidebar — the Win98 modal opens
- The welcome heading "Hey, I'm Luke" appears (no galaxy animation)
- "Who are you?" auto-types into the composer with tick sounds
- Click send — user message appears, typing indicator shows, then assistant response appears
- Click a suggestion chip — it highlights, text types into composer
- Click a work card — case study content appears inline, card shows "✓ Read" badge
- Toggle sound off — icon changes, no more tick sounds; refresh page — sound stays off
- Toggle sound on — confirmation sound plays, ticks resume
- Click "New chat" chip — conversation resets to welcome state
- Press ESC — chatbot modal closes
- Click backdrop — chatbot modal closes
- On mobile — chatbot goes full-screen
- All chat elements look authentically Windows 98 (raised buttons, sunken panels, navy titlebar)

---

### Phase 4: Guided conversation flow (remove chips, auto-advance)

**Goal:** Replace the chip-selection model with a fully guided, linear conversation. The user never picks what to ask — the chatbot auto-fills each question in sequence, and the user just hits Send.

**Ordered prompt sequence:**
1. `"Who are you?"`
2. `"What have you shipped?"`
3. `"What's your process?"`
4. `"What are you working on?"`
5. `"What else should I know?"`
6. `"How can I contact you?"`

Export this as a new `GUIDED_SEQUENCE` array from `src/data/conversationSteps.js`.

**Flow:**
1. User opens the chatbot modal.
2. Welcome heading is visible. `"Who are you?"` animates into the textarea (existing `animateType` behaviour).
3. User presses Send. The user message appears, typing indicator shows, then the assistant response renders.
4. After a delay (~1.5–2 s), the next prompt in the sequence automatically animates into the textarea.
5. User presses Send again. Repeat until the final prompt (`"How can I contact you?"`) has been answered.
6. After the last response, the textarea stays empty — no more auto-fill. Optionally show a "New chat" button or auto-type-prompt for reset.

**Files to change:**

#### `src/data/conversationSteps.js`
- Add and export a `GUIDED_SEQUENCE` array containing the six prompts in order (listed above).

#### `src/components/Chatbot/Chatbot.jsx`
- **Add state:** `stepIndex` (number, starts at `0`) — tracks position in `GUIDED_SEQUENCE`.
- **Remove:** `chips` state, `selectedPrompt` state, `buildChips()` usage, `handleChipClick()`, and the entire `<div className="cb-chips">` block from the JSX.
- **Remove:** `askedPrompts` set and all references to it (no longer needed since flow is linear).
- **Keep:** `composerValue`, `animateType`, `isBusy`, `isTyping`, `welcomeVisible`, `lightboxSrc`, work-card click handling, sound engine, lightbox.
- **Modify `submitPrompt`:**
  - It should read the current prompt from `GUIDED_SEQUENCE[stepIndex]` rather than from `selectedPrompt`.
  - After appending the assistant response, increment `stepIndex`.
  - If the new `stepIndex` is still within bounds, set a timeout (~1.5–2 s) and then call `animateType(GUIDED_SEQUENCE[newIndex])`.
  - If the sequence is exhausted (after `"How can I contact you?"`), leave the composer empty. Optionally render a subtle "Start over" link or auto-show a restart prompt.
- **Modify `handleSubmit`:**
  - Instead of reading `selectedPrompt`, derive the current prompt from `GUIDED_SEQUENCE[stepIndex]`.
  - The Send button should be disabled when `isBusy` is true OR when `composerValue` is empty (i.e., typing animation hasn't finished yet).
- **Modify `resetConversation`:**
  - Reset `stepIndex` to `0`.
  - After the reset delay, call `animateType(GUIDED_SEQUENCE[0])`.
- **Work cards:** Work card clicks (`handleWorkCardClick`) should continue to work as they do now — they are inline expansions within the `"What have you shipped?"` response, not part of the guided sequence. No changes needed here.
- **Textarea:** Keep it `readOnly`. The user never types — they only press Send.

#### `src/components/Chatbot/Chatbot.css`
- Remove all `.cb-chips` and `.cb-chip` styles (the chip bar, selected state, restart variant, etc.).
- No other style changes expected unless you want to add a subtle "Start over" link style at the end of the conversation.

**Done when:**
- Opening the chatbot auto-types `"Who are you?"` into the composer.
- Pressing Send shows the response, then after ~1.5–2 s the next question auto-types.
- The full sequence plays through from `"Who are you?"` to `"How can I contact you?"` without the user choosing anything.
- There are no suggestion chips anywhere in the UI.
- Work card clicks still expand case studies inline.
- "New chat" (however triggered) resets to step 0 and re-animates the first prompt.
- Sound ticks still play during typing animation.

**Re-plan if:**
- The work-card sub-flow (`"What have you shipped?"` → card click → case study) needs to pause the guided sequence (currently it shouldn't, since cards are inline expansions, but verify).
